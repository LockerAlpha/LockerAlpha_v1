// src/Donate.jsx
import React from 'react';
import './Donate.css';

function Donate() {
  return (
    <div className="donate-container">
      <h1>🙏 Donate Us</h1>
      <p className="donate-message">
        We are on a mission to help poor people by providing food, clothes, and basic needs.
        <br /><br />
        Every rupee you donate will be used to feed the hungry and support the needy across India.
      </p>

       <div className="donate-stats">
        <h3>📊 Why Your Help Matters</h3>
        <p>
          🧒 According to NITI Aayog’s Multidimensional Poverty Index (2023), over <strong>25 crore</strong> people in India were living in poverty in 2015–16.<br />
          💡 Although poverty has decreased, millions still live without regular meals and basic needs.<br />
          🌾 Many rural families earn less than ₹100 per day and can't afford 2 meals a day.
        </p>
        <p>
          Your donation directly supports people struggling with hunger and poverty.
        </p>
      </div>

      <div className="monero-section">
        <h3>Donate via Monero (XMR)</h3>
        <p>100% private and secure. We never track or store your identity.</p>
        <textarea
          className="monero-address"
          readOnly
          rows="3"
          value="46bQDdBrix8BxXV2DrueVp1sDw1KG9E45e315BYzKxgkTFq2CYNNbXyLe6XPw6Ebja6T5HC1hyuyGdCvrqzrxd3w7urA92V"
        />
        <img
          src="/images/monero.jpeg" // 👈 Place QR image in public/images folder
          alt="Monero QR Code"
          className="monero-qr"
        />
      </div>
      <div className="corruption-note">
        <h4>🛡️ Why Monero?</h4>
        <p>
           We believe transparency shouldn't mean vulnerability. In a world plagued by corruption, we choose Monero to ensure that <strong>every rupee reaches the people who need it</strong> — not the pockets of middlemen or officials.
        </p>
        <p>
            With Monero, your donation remains anonymous and untouchable by corrupt systems. Your generosity is your choice — not your risk.
        </p>
      </div>
    </div>
  );
}

export default Donate;
