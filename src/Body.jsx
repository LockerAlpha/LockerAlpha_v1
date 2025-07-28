import React, { useState } from 'react';

function Body() {
  const [secretCode, setSecretCode] = useState('');
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [retrieveCode, setRetrieveCode] = useState('');
  const [retrievedMessage, setRetrievedMessage] = useState('');
  const [retrievedFiles, setRetrievedFiles] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!secretCode) return alert("Secret code required!");

    const formData = new FormData();
    formData.append('secretCode', secretCode);
    formData.append('message', message);
    if (files.length > 0) {
      files.forEach((f, idx) => {
        formData.append('files', f);
      });
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const xhr = new window.XMLHttpRequest();
      xhr.open('POST', 'https://locker-mnlb.onrender.com/upload');

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        setUploading(false);
        setUploadProgress(0);
        if (xhr.status === 200) {
          const result = JSON.parse(xhr.responseText);
          if (result.success) {
            alert("Saved successfully!");
            setSecretCode('');
            setMessage('');
            setFiles([]);
          } else {
            alert("Error: " + result.error);
          }
        } else {
          alert("Server error.");
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        setUploadProgress(0);
        alert("Server error.");
      };

      xhr.send(formData);
    } catch (err) {
      setUploading(false);
      setUploadProgress(0);
      console.error(err);
      alert("Server error.");
    }
  };

  const handleRetrieve = async () => {
    if (!retrieveCode) return alert("Enter secret code to retrieve");

    try {
      const response = await fetch('https://locker-mnlb.onrender.com/retrieve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secretCode: retrieveCode }),
      });

      const result = await response.json();

      if (result.error) {
        alert("Locker not found!");
        setRetrievedMessage('');
        setRetrievedFiles([]);
      } else {
        setRetrievedMessage(result.message || 'No message');
        setRetrievedFiles(result.files || []);
      }
    } catch (err) {
      console.error(err);
      alert("Could not retrieve locker.");
    }
  };

  return (
    <div className="locker-wrapper">
      {/* Save to Locker */}
      <div className="locker-box">
        <h2>🔐 Save to Locker</h2>
        <div className="form-group">
          <label>Secret Code</label>
          <input value={secretCode} onChange={(e) => setSecretCode(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Text Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Upload Files</label>
          <div
            className={`drag-drop-area${isDragging ? ' dragging' : ''}`}
            onDragOver={e => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={e => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={e => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
              }
            }}
            onClick={() => {
              document.getElementById('fileInput').click();
            }}
            style={{
              border: '2px dashed #888',
              padding: '20px',
              textAlign: 'center',
              cursor: 'pointer',
              background: isDragging ? '#f0f8ff' : '#fff',
              marginBottom: '10px',
            }}
          >
            {files.length > 0 ? (
              <div style={{textAlign: 'left'}}>
                <strong>Selected:</strong>
                <ul style={{margin: 0, paddingLeft: 20}}>
                  {files.map((f, idx) => (
                    <li key={idx}>{f.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <span>Drag & drop files here, or click to select</span>
            )}
            <input
              id="fileInput"
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={e => {
                if (e.target.files && e.target.files.length > 0) {
                  setFiles(prev => [...prev, ...Array.from(e.target.files)]);
                }
              }}
            />
          </div>
          {files.length > 0 && (
            <button type="button" style={{marginTop: 5}} onClick={() => setFiles([])}>Clear Files</button>
          )}
        </div>
        <div className="form-submit">
          {uploading && (
            <div className="upload-progress-bar-wrapper">
              <div className="upload-progress-bar" style={{ width: uploadProgress + '%' }} />
              <span className="upload-progress-label">{uploadProgress}%</span>
            </div>
          )}
          <button onClick={handleSubmit} disabled={uploading}>Submit</button>
        </div>
      </div>

      {/* Open Locker */}
      <div className="locker-box">
        <h2>🔓 Open Locker</h2>
        <div className="form-group">
          <label>Secret Code</label>
          <input value={retrieveCode} onChange={(e) => setRetrieveCode(e.target.value)} />
        </div>
        <div className="form-submit">
          <button onClick={handleRetrieve}>Retrieve</button>
        </div>

        {retrievedMessage && (
          <div className="result">
            <strong>Message:</strong>
            <p>{retrievedMessage}</p>
          </div>
        )}
        {retrievedFiles && retrievedFiles.length > 0 && (
          <div className="result">
            <strong>Files:</strong>
            <ul style={{margin: 0, paddingLeft: 20}}>
              {retrievedFiles.map((file, idx) => (
                <li key={idx}>
                  <a href={file.url} target="_blank" rel="noreferrer">
                    Download {file.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Body;