import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import StarWarp from './components/StarWarp';
import Village from './pages/Village';

// Import images
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

function Home() {
  // Background Slider State
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Typewriter State
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Transition State
  const [isWarping, setIsWarping] = useState(false);
  const navigate = useNavigate();

  // Background Slider Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Typewriter Effect
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
        setTimeout(() => setIsDeleting(true), 2000); // Pause at end
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, typingSpeed]);

  const handleEnterVillage = () => {
    setIsWarping(true);
    setTimeout(() => {
      navigate('/village');
    }, 2500); // Wait for animation to speed up
  };

  return (
    <>
      <StarWarp isActive={isWarping} />

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
      <nav className="navbar" style={{ opacity: isWarping ? 0 : 1, transition: 'opacity 0.5s' }}>
        <div className="nav-logo">Village Numérique Résistant NIRD</div>
        <div className="nav-links">
          <a href="#challenge1" className="nav-link">Les femmes dans le numérique</a>
          <a href="#challenge2" className="nav-link">La ligues des extensions</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" style={{ opacity: isWarping ? 0 : 1, transition: 'opacity 0.5s' }}>
        <h1 className="hero-title">Village Numérique Résistant NIRD</h1>
        <div className="typewriter-container">
          <span>{text}</span>
          <span className="cursor">|</span>
        </div>
        <button className="cta-button" onClick={handleEnterVillage}>Entrer dans le village</button>
      </section>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/village" element={<Village />} />
      </Routes>
    </Router>
  );
}

export default App;
