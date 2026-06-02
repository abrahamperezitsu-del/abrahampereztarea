import { useState, useEffect } from 'react';
import FeatureCard from './components/FeatureCard';
import { featuresData } from './data/featuresData';
import './App.css';

function App() {
  const [showLabel, setShowLabel] = useState(false);

  // Lógica para mostrar la etiqueta solo al llegar al final del scroll
  useEffect(() => {
    const handleScroll = () => {
      const isBottom = 
        Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      
      if (isBottom) {
        setShowLabel(true);
      } else {
        setShowLabel(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="header">
        <h1 className="logo">Mundial<span>26</span></h1>
        <nav>
          <ul>
            <li><a href="#hero">Inicio</a></li>
            <li><a href="#features">Ventajas</a></li>
            <li><a href="#steps">Pasos</a></li>
          </ul>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section id="hero" className="hero">
          <div className="hero-content">
            <h2 className="graffiti-text">¡VIVE LA PASIÓN!</h2>
              <p>Olvídate de las filas para la compra presencial. Regístrate, elige tu compra y asegura tu lugar en la historia con un solo clic.</p>
              <button className="cta-button" onClick={() => window.location.href = '../'}>
                Regístrate y Compra
              </button>
      </div>
        </section>

        {/* SECCIÓN 1: Ventajas (Uso de .map y Componente Reutilizable) */}
        <section id="features" className="features-section">
          <h2>¿Por qué comprar aquí?</h2>
          <div className="features-grid">
            {featuresData.map((feature) => (
              <FeatureCard
                key={feature.id}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            ))}
          </div>
        </section>

        {/* SECCIÓN 2: Pasos de compra */}
        <section id="steps" className="steps-section">
          <h2>Tu Camino a la Gloria</h2>
          <div className="steps-container">
            <div className="step"><span>1</span> Regístrate</div>
            <div className="step"><span>2</span> Elige tu compra</div>
            <div className="step"><span>3</span> Paga seguro</div>
            <div className="step"><span>4</span> ¡Disfruta!</div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2026 Sistema Oficial de Entradas Mundial.</p>
        
        {/* Etiqueta dinámica de scroll */}
        <div className={`bottom-label ${showLabel ? 'visible' : ''}`}>
          ¡Código de descuento "FAN26" desbloqueado! ⚽
        </div>
      </footer>
    </div>
  );
}

export default App;