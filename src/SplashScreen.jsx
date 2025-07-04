// SplashScreen.jsx
import React, { useEffect } from 'react';
import './splash.css';

function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // Tell App to hide splash
    }, 3000); // Show splash for 2.5 seconds

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-container">
      <div className="splash-content">
        <div className="emoji">🔐</div>
        <h1 className="title">Locker</h1>
      </div>
    </div>
  );
}

export default SplashScreen;
