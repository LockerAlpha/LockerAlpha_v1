// src/Donate.jsx
import React from 'react';
import './Donate.css';

function Donate() {
  return (
    <div className="donate-container">
      <h1>Donate</h1>
      <p>
        If you like this project, consider donating. Your contribution will help us improve the website's security, making it more untraceable, private, and secure.
      </p>

      <div className="monero-section">
        <h3>Donate via Monero (XMR)</h3>
        <p>Private and anonymous. We don’t track or store any identities.</p>
        <textarea
          className="monero-address"
          readOnly
          rows="3"
          value="4AEbZcKcfxMBbp7N7dbKYWSZRN2rCxF2wKdRuLjqtuxkAnokCqF2vzzD9L54Emcbx5YK4BxnhugtFZ25zJMD19bmVGLNXtd"
        />
        <img
          src="/images/monero1.jpg"
          alt="Monero QR Code"
          className="monero-qr"
        />
      </div>
    </div>
  );
}

export default Donate;
