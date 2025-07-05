const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// In-memory storage (key: secretCode, value: { message, filePath })
const storage = {};

const upload = multer({
  dest: 'uploads/', // store in uploads folder
});

// Handle submit by User 1
app.post('/upload', upload.single('file'), (req, res) => {
  const { secretCode, message } = req.body;
  const file = req.file;

  if (!secretCode) {
    return res.status(400).json({ error: 'Secret code is required' });
  }

  // Store data in memory
  storage[secretCode] = {
    message: message || null,
    filePath: file ? file.path : null,
    originalName: file ? file.originalname : null,
  };

  console.log(`Data saved for code: ${secretCode}`);
  res.json({ success: true, message: 'Data saved successfully' });
});

// Handle retrieve by User 2
app.post('/retrieve', (req, res) => {
  const { secretCode } = req.body;

  if (!secretCode || !storage[secretCode]) {
    return res.status(404).json({ error: 'Data not found for this secret code' });
  }

  const data = storage[secretCode];

  res.json({
    message: data.message,
    file: data.filePath ? {
      url: `https://locker-mnlb.onrender.com/download/${secretCode}`, // 👈 Proper download route
      name: data.originalName,
    } : null,
  });

  // Optional: delete after first retrieval
  // delete storage[secretCode];
});

// ✅ Proper file download with correct name/extension
app.get('/download/:secretCode', (req, res) => {
  const code = req.params.secretCode;
  const data = storage[code];

  if (!data || !data.filePath || !data.originalName) {
    return res.status(404).send('File not found');
  }

  res.download(path.resolve(__dirname, data.filePath), data.originalName); // 👈 Ensures correct download
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
