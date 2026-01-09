
import React, { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import HowToBuy from './components/HowToBuy';
import MemeGenerator from './components/MemeGenerator';
import Chart from './components/Chart';
import Footer from './components/Footer';

const StormBackground: React.FC = () => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [boltPosition, setBoltPosition] = useState(50);
  const [strikeKey, setStrikeKey] = useState(0);

  useEffect(() => {
    // Random lightning loop
    const triggerLightning = () => {
      // 1. Set position randomly
      setBoltPosition(Math.random() * 90 + 5); // 5% to 95% screen width
      
      // 2. Trigger Flash
      setIsFlashing(true);
      setStrikeKey(prev => prev + 1); // Trigger bolt animation reflow
      
      // 3. Reset Flash shortly after
      setTimeout(() => setIsFlashing(false), 150); // Flash duration

      // 4. Schedule next strike (random between 3s and 10s)
      const nextStrikeDelay = Math.random() * 7000 + 3000;
      timeoutId = setTimeout(triggerLightning, nextStrikeDelay);
    };

    let timeoutId = setTimeout(triggerLightning, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#020617]">
      {/* MIST LAYERS */}
      <div className="mist-container">
        <div className="mist"></div>
        <div className="mist"></div>
      </div>

      {/* LIGHTNING LAYERS */}
      <div className={`lightning-flash ${isFlashing ? 'active' : ''}`}></div>
      <div 
        key={strikeKey}
        className={`bolt ${isFlashing ? 'strike' : ''}`} 
        style={{ left: `${boltPosition}%` }}
      ></div>
      
      {/* Background overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/50"></div>
    </div>
  );
};

const App: React.FC = () => {
  // Scroll Reveal Logic
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15 // Trigger when 15% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optional: Stop observing once revealed
          // observer.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal, .reveal-group');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020617] overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      <StormBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <HowToBuy />
          <MemeGenerator />
          <Chart />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
