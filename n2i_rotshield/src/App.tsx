import { useState, useEffect } from 'react';
import './App.css';

const backgroundImages = [
  '/image/image1.png',
  '/image/image2.png',
  '/image/image3.png',
  '/image/image4.png'
];

const typewriterPhrases = [
  "Donne du pouvoir numérique à ton établissement",
  "Reprends le contrôle face aux Big Tech.",
  "Construis un futur numérique souverain.",
  "Protège ton école des géants du numérique",
  "Deviens acteur de la résistance numérique."
];

function App() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = typewriterPhrases[phraseIndex];

      if (isDeleting) {
        setText(currentPhrase.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(currentPhrase.substring(0, text.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && text === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, typingSpeed]);

  return (
    <>
      {/* Background Slider */}
      <div className="background-slider">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`bg-image ${index === currentBgIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="overlay"></div>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-logo">N2I - Team Rotschields & co - UCA Nice</div>
        <div className="nav-links">
          <a href="#challenge1" className="nav-link">Challenge 1</a>
          <a href="#challenge2" className="nav-link">Challenge 2</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Village Numérique Résistant NIRD</h1>
        <div className="typewriter-container">
          <span>{text}</span>
          <span className="cursor">|</span>
        </div>
        <button className="cta-button">Entrer dans le village</button>
      </section>
    </>
  );
}

export default App;
