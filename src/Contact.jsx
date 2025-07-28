import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-simple-container">
      <h2>Contact Us</h2>
      <p>
        You can reach us at: <br />
        <a href="mailto:locker0207@proton.me" className="contact-email">
          LockerAlpha@proton.me
        </a>
      </p>
    </div>
  );
}

export default Contact;
