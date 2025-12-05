import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import StarWarp from './components/StarWarp';
import Village from './pages/Village';
import ThreeScene from './components/ThreeScene';
import type { PlayerPosition, ZoneType } from './components/ThreeScene';

// Import Pages
import GooglePage from './pages/GooglePage';
import CabanePage from './pages/CabanePage';
import SchoolPage from './pages/SchoolPage';
import LibraryPage from './pages/LibraryPage';

const typewriterPhrases = [
  "Donne du pouvoir numérique à ton établissement",
  "Reprends le contrôle face aux Big Tech.",
  "Construis un futur numérique souverain.",
  "Protège ton école des géants du numérique",
  "Deviens acteur de la résistance numérique."
];

// Composant qui affiche la bonne page selon le type de zone
const ContentPage = ({
  zoneType,
  onBack,
  onVisit,
  onScore
}: {
  zoneType: ZoneType;
  onBack: () => void;
  onVisit: (zone: ZoneType) => void;
  onScore: (zone: ZoneType, score: number) => void;
}) => {
  switch (zoneType) {
    case 'google':
      return <GooglePage onBack={onBack} onVisit={() => onVisit('google')} onScore={(score) => onScore('google', score)} />;
    case 'cabane':
      return <CabanePage onBack={onBack} onVisit={() => onVisit('cabane')} onScore={(score) => onScore('cabane', score)} />;
    case 'school':
      return <SchoolPage onBack={onBack} onVisit={() => onVisit('school')} onScore={(score) => onScore('school', score)} />;
    case 'library':
      return <LibraryPage onBack={onBack} onVisit={() => onVisit('library')} onScore={(score) => onScore('library', score)} />;
    default:
      return <GooglePage onBack={onBack} onVisit={() => onVisit('google')} onScore={(score) => onScore('google', score)} />;
  }
};

function Home({ onEnterVillage }: { onEnterVillage: () => void }) {
  // Typewriter State
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

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

  return (
    <>
      <div className="home-overlay"></div>
      {/* Navbar */}
      <nav className="navbar" style={{ transition: 'opacity 0.5s' }}>
        <div className="nav-logo">Rotschield & Co</div>
        <div className="nav-links">
          <a href="#challenge1" className="nav-link">1. Les femmes dans le numérique</a>
          <a href="#challenge2" className="nav-link">2.La ligues des extensions</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" style={{ transition: 'opacity 0.5s' }}>
        <h1 className="hero-title">Village Numérique Résistant NIRD</h1>
        <div className="typewriter-container">
          <span>{text}</span>
          <span className="cursor">|</span>
        </div>
        <button className="cta-button" onClick={onEnterVillage}>Entrer dans le village</button>
      </section>

      {/* Footer */}
      <footer className="footer" style={{ transition: 'opacity 0.5s' }}>
        <div className="footer-left">Nuit de l'info 2025</div>
        <div className="footer-right">Equipe Rotschield & co - UCA Sophia Antipolis</div>
      </footer>
    </>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  // Game State
  const [isWarping, setIsWarping] = useState(false);
  const isHome = location.pathname === '/' && !isWarping;

  const [showContentPage, setShowContentPage] = useState(false);
  const [savedPosition, setSavedPosition] = useState<PlayerPosition | null>(null);
  const [currentZone, setCurrentZone] = useState<ZoneType>('google');
  const [visitedZones, setVisitedZones] = useState<Set<ZoneType>>(new Set());
  const [scores, setScores] = useState<Record<string, number>>({});

  const handleEnterVillage = () => {
    // Réinitialiser les objectifs et scores à chaque entrée dans le village
    setVisitedZones(new Set());
    setScores({});
    
    setIsWarping(true);
    setTimeout(() => {
      navigate('/village');
      setIsWarping(false);
    }, 2000);
  };

  const handleVisit = (zone: ZoneType) => {
    setVisitedZones(prev => {
      const newSet = new Set(prev);
      newSet.add(zone);
      return newSet;
    });
  };

  const handleScore = (zone: ZoneType, score: number) => {
    setScores(prev => ({
      ...prev,
      [zone]: score
    }));
  };

  // Gestion de l'ouverture de la page (stable avec useCallback)
  const handleOpenPage = useCallback((position: PlayerPosition, zoneType: ZoneType) => {
    console.log('Opening page from position:', position, 'Zone:', zoneType);
    setSavedPosition(position);
    setCurrentZone(zoneType);
    
    // 1. D'abord activer le StarWarp pour couvrir l'écran
    setIsWarping(true);

    // 2. Attendre que le StarWarp soit complètement visible (500ms de transition)
    setTimeout(() => {
      // 3. Maintenant que le StarWarp couvre l'écran, afficher la page de contenu
      setShowContentPage(true);
      
      // 4. Continuer l'animation warp un peu, puis la désactiver
      setTimeout(() => {
        setIsWarping(false);
      }, 800);
    }, 500);
  }, []);

  // Gestion du retour au village
  const handleBackToVillage = useCallback(() => {
    // 1. D'abord activer le StarWarp pour couvrir l'écran
    setIsWarping(true);
    
    // 2. Attendre que le StarWarp soit complètement visible (500ms de transition)
    //    AVANT de cacher la page de contenu
    setTimeout(() => {
      // 3. Maintenant que le StarWarp couvre l'écran, on peut cacher la page
      setShowContentPage(false);
      
      // 4. Continuer l'animation warp un peu, puis la désactiver
      setTimeout(() => {
        setIsWarping(false);
      }, 800);
    }, 500);
  }, []);

  // Écouter la touche E pour retourner au village depuis une page de contenu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'KeyE' && showContentPage && !isWarping) {
        handleBackToVillage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showContentPage, isWarping, handleBackToVillage]);

  return (
    <>
      <StarWarp isActive={isWarping} />

      {/* Scène 3D Persistante */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: showContentPage ? 'none' : 'auto'
      }}>
        <ThreeScene
          isHome={isHome}
          onOpenPage={handleOpenPage}
          initialPosition={savedPosition}
        />
      </div>

      {/* Page de contenu (Overlay) */}
      {showContentPage && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          opacity: 1, // Always visible, StarWarp covers it during transition
          animation: 'fadeIn 0.5s ease-out' // Add subtle fade in for the content itself
        }}>
          <ContentPage
            zoneType={currentZone}
            onBack={handleBackToVillage}
            onVisit={handleVisit}
            onScore={handleScore}
          />
        </div>
      )}

      <Routes>
        <Route path="/" element={
          <div style={{ opacity: isWarping ? 0 : 1, transition: 'opacity 0.5s' }}>
            <Home onEnterVillage={handleEnterVillage} />
          </div>
        } />
        <Route path="/village" element={
          <Village
            visitedZones={visitedZones}
            scores={scores}
            isWarping={isWarping}
          />
        } />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
