
import React, { useEffect, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import HowToBuy from './components/HowToBuy';
import MemeGenerator from './components/MemeGenerator';
import Chart from './components/Chart';
import Footer from './components/Footer';

const CosmicBackground: React.FC = () => {
  // Generate static stars to avoid re-renders causing flickering
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => {
      const size = Math.random() * 3 + 1; // 1px to 4px
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const duration = Math.random() * 3 + 2; // 2s to 5s twinkle
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.7 + 0.3;
      // Mostly white/cyan stars
      const color = Math.random() > 0.7 ? '#22d3ee' : '#ffffff'; 

      return (
        <div
          key={i}
          className="star"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            backgroundColor: color,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            opacity: opacity
          }}
        />
      );
    });
  }, []);

  return (
    <div className="universe-container">
      {/* Stars */}
      {stars}

      {/* Blue Nebulas / Mist */}
      <div 
        className="nebula" 
        style={{ top: '10%', left: '20%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)' }}
      ></div>
      <div 
        className="nebula" 
        style={{ top: '60%', left: '60%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)', animationDelay: '-10s' }}
      ></div>
       <div 
        className="nebula" 
        style={{ top: '80%', left: '-10%', width: '30vw', height: '30vw', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)', animationDelay: '-25s' }}
      ></div>

      {/* Scanlines overlay for slight retro feel (optional, kept subtle) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
    </div>
  );
};

const App: React.FC = () => {
  // Scroll Reveal Logic
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Trigger slightly earlier
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal, .reveal-group');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020617] overflow-x-hidden selection:bg-cyan-500 selection:text-black">
      <CosmicBackground />
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
