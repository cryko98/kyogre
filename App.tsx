
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import HowToBuy from './components/HowToBuy';
import MemeGenerator from './components/MemeGenerator';
import Chart from './components/Chart';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-red-gradient overflow-x-hidden selection:bg-red-600 selection:text-white">
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
  );
};

export default App;
