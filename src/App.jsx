import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Body from './Body';
import About from './About';
import Contact from './Contact';
import SplashScreen from './SplashScreen';
import Donate from './Donate';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Router>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;
