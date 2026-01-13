
import React, { useEffect, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import HowToBuy from './components/HowToBuy';
import MemeGenerator from './components/MemeGenerator';
import Chart from './components/Chart';
import Footer from './components/Footer';

const FireBackground: React.FC = () => {
  // Generate static embers
  const embers = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => {
      const size = Math.random() * 4 + 2; 
      const left = Math.random() * 100;
      const duration = Math.random() * 5 + 5; // 5s to 10s rise
      const delay = Math.random() * 10;
      
      return (
        <div
          key={i}
          className="ember"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            animationDuration: `${duration}s`,
            animationDelay: `-${delay}s`,
          }}
        />
      );
    });
  }, []);

  return (
    <div className="fire-container">
      {/* Embers */}
      {embers}

      {/* Chakra Auras */}
      <div 
        className="chakra-aura" 
        style={{ top: '20%', left: '10%', width: '40vw', height: '40vw' }}
      ></div>
      <div 
        className="chakra-aura" 
        style={{ top: '60%', left: '60%', width: '50vw', height: '50vw', animationDelay: '-2s' }}
      ></div>

      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
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
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden selection:bg-orange-500 selection:text-black">
      <FireBackground />
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
