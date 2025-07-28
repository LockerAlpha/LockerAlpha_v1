import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <h1>About Locker</h1>
      <p>
        <strong>Locker</strong> is a privacy-focused, no-signup file sharing platform that lets you upload
        large files (up to <strong>10GB</strong>) and share them using a secret code. All messages and file metadata
        are <strong>AES-256 encrypted</strong> and auto-deleted after <strong>7 days</strong> — ensuring security and zero trace.
      </p>
      <p>
        Whether you want to send confidential documents, large videos, or secret notes, Locker gives you a simple,
        fast, and secure way to do it — without logins, ads, or complexity. Just upload your files, get a code,
        and share it with anyone.
      </p>
      <p>
        Locker is built with transparency and user freedom in mind. Your privacy is your power.
      </p>
    </div>
  );
}

export default About;
