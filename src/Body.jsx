import React, { useState } from 'react';

function Body() {
  const [secretCode, setSecretCode] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const [retrieveCode, setRetrieveCode] = useState('');
  const [retrievedMessage, setRetrievedMessage] = useState('');
  const [retrievedFile, setRetrievedFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!secretCode) return alert("Secret code required!");

    const formData = new FormData();
    formData.append('secretCode', secretCode);
    formData.append('message', message);
    if (file) formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert("Saved successfully!");
        setSecretCode('');
        setMessage('');
        setFile(null);
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  const handleRetrieve = async () => {
    if (!retrieveCode) return alert("Enter secret code to retrieve");

    try {
      const response = await fetch('http://localhost:5000/retrieve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secretCode: retrieveCode }),
      });

      const result = await response.json();

      if (result.error) {
        alert("Locker not found!");
        setRetrievedMessage('');
        setRetrievedFile(null);
      } else {
        setRetrievedMessage(result.message || 'No message');
        setRetrievedFile(result.file);
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
          <label>Upload File</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="form-submit">
          <button onClick={handleSubmit}>Submit</button>
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
        {retrievedFile && (
          <div className="result">
            <strong>File:</strong>
            <a href={retrievedFile.url} target="_blank" rel="noreferrer">
              Download {retrievedFile.name}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Body;