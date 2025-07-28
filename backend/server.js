const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const PORT = 5000;

const ENCRYPTION_KEY = process.env.LOCKER_KEY || '12345678901234567890123456789012'; // 32 bytes for AES-256
const IV_LENGTH = 16;

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
  const [ivHex, encrypted] = text.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

app.use(cors({
  origin:"*",
  methods:["GET","POST"]
}));
app.use(express.json({ limit: '10gb' }));
app.use(express.urlencoded({ extended: true, limit: '10gb' }));
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// In-memory storage (key: secretCode, value: { message, files, timestamp })
const storage = {};
const FILE_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

const upload = multer({
  dest: 'uploads/', // store in uploads folder
  limits: { fileSize: 10 * 1024 * 1024 * 1024 } // 10 GB
});

// Handle submit by User 1 (multiple files)
app.post('/upload', upload.array('files'), (req, res) => {
  const { secretCode, message } = req.body;
  const files = req.files;

  if (!secretCode) {
    return res.status(400).json({ error: 'Secret code is required' });
  }

  // Encrypt message and file info
  const encryptedMessage = message ? encrypt(message) : null;
  const encryptedFiles = files && files.length > 0
    ? encrypt(JSON.stringify(files.map(f => ({ filePath: f.path, originalName: f.originalname }))))
    : encrypt(JSON.stringify([]));

  storage[secretCode] = {
    message: encryptedMessage,
    files: encryptedFiles,
    timestamp: Date.now(),
  };

  console.log(`Data saved for code: [ENCRYPTED]`);
  res.json({ success: true, message: 'Data saved successfully' });
});

// Handle retrieve by User 2
app.post('/retrieve', (req, res) => {
  const { secretCode } = req.body;

  if (!secretCode || !storage[secretCode]) {
    return res.status(404).json({ error: 'Data not found for this secret code' });
  }

  const data = storage[secretCode];

  // Decrypt message and files
  let message = '';
  let files = [];
  try {
    message = data.message ? decrypt(data.message) : '';
    files = JSON.parse(decrypt(data.files));
  } catch (e) {
    return res.status(500).json({ error: 'Failed to decrypt data.' });
  }

  res.json({
    message,
    files: files && files.length > 0 ? files.map((f, idx) => ({
      url: `https://locker-mnlb.onrender.com/download/${secretCode}/${idx}`,
      name: f.originalName
    })) : [],
  });

  // Optional: delete after first retrieval
  // delete storage[secretCode];
});

// ✅ Proper file download with correct name/extension (multiple files)
app.get('/download/:secretCode/:fileIdx', (req, res) => {
  const code = req.params.secretCode;
  const fileIdx = parseInt(req.params.fileIdx, 10);
  const data = storage[code];

  if (!data || !data.files || !data.files[fileIdx]) {
    return res.status(404).send('File not found');
  }

  const file = data.files[fileIdx];
  res.download(path.resolve(__dirname, file.filePath), file.originalName);
});

// Periodic cleanup: delete files and metadata older than 7 days
setInterval(() => {
  const now = Date.now();
  for (const [code, data] of Object.entries(storage)) {
    if (data.timestamp && now - data.timestamp > FILE_EXPIRY_MS) {
      // Decrypt files array
      let files = [];
      try {
        files = JSON.parse(decrypt(data.files));
      } catch (e) {}
      // Delete files from disk
      for (const file of files) {
        if (file.filePath) {
          fs.unlink(file.filePath, err => {});
        }
      }
      // Delete from memory
      delete storage[code];
      console.log(`Deleted expired locker: ${code}`);
    }
  }
}, 60 * 60 * 1000); // Run every hour

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
