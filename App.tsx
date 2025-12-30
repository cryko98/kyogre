
import React, { useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import HowToBuy from './components/HowToBuy';
import MemeGenerator from './components/MemeGenerator';
import Chart from './components/Chart';
import Footer from './components/Footer';

const FireBackground: React.FC = () => {
  // Generate 120 unique embers for maximum intensity
  const embers = useMemo(() => {
    return Array.from({ length: 120 }).map((_, i) => {
      const size = Math.random() * 6 + 1;
      const left = Math.random() * 120 - 10;
      const duration = Math.random() * 5 + 4; // Faster rising
      const delay = Math.random() * 15;
      
      // Color variations: Red, Orange, Yellow, and some White-hot sparks
      const colorRoll = Math.random();
      let color = '#ef4444'; // Red-600
      if (colorRoll > 0.85) color = '#ffffff'; // White hot
      else if (colorRoll > 0.6) color = '#fbbf24'; // Amber/Yellow
      else if (colorRoll > 0.3) color = '#f97316'; // Orange
      
      const blur = Math.random() > 0.8 ? '3px' : '0px';
      
      return (
        <div
          key={i}
          className="ember"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            backgroundColor: color,
            animation: `ember-rise ${duration}s linear infinite`,
            animationDelay: `${delay}s`,
            opacity: Math.random() * 0.9 + 0.1,
            filter: `blur(${blur}) drop-shadow(0 0 ${size * 2}px ${color})`,
          }}
        />
      );
    });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="fire-glow"></div>
      <div className="heat-distortion"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-red-950/40 via-transparent to-transparent opacity-60"></div>
      {embers}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden selection:bg-red-600 selection:text-white">
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
