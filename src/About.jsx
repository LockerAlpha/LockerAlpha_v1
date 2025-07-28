import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1>About Locker</h1>
      <p>
        <strong>Locker</strong> is a privacy-focused, no-signup file sharing platform that lets you securely share files and messages using a secret code.
        All messages and file metadata are <strong>AES-256 encrypted</strong> to ensure maximum security and confidentiality.
      </p>
      <p>
        Whether you want to send confidential documents, private videos, or secret notes, Locker gives you a simple,
        fast, and secure way to do it — without logins, ads, or unnecessary complexity.
      </p>
      <p>
        We’re also planning to support larger file transfers soon — so stay tuned!
      </p>
      <p>
        Locker is built with transparency and user freedom in mind. Your privacy is your power.
      </p>
    </div>
  );
}

export default About;
