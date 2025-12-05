import { useState, useEffect } from 'react';
import { BackButton } from './PageComponents';
import './CabanePage.css';

interface CabanePageProps {
    onBack: () => void;
    onVisit: () => void;
    onScore: (score: number) => void;
}

const CabanePage = ({ onBack, onVisit, onScore }: CabanePageProps) => {
    useEffect(() => {
        onVisit();
    }, [onVisit]);
    // Game State
    const [gameAnswer, setGameAnswer] = useState<string | null>(null);
    const [gameScore, setGameScore] = useState(0);

    // Quiz State
    const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
    const [quizScore, setQuizScore] = useState(0);

    const handleGameChoice = (choice: string) => {
        if (gameAnswer) return; // Prevent multiple clicks
        setGameAnswer(choice);
        if (choice === 'linux') {
            setGameScore(10);
            onScore(10);
        }
    };

    const handleQuizAnswer = (questionId: number, answer: string) => {
        const newAnswers = { ...quizAnswers, [questionId]: answer };
        setQuizAnswers(newAnswers);

        // Check if correct to add score (simplified logic)
        if (questionId === 1 && answer === 'Linux') {
            setQuizScore(prev => prev + 10);
            onScore(10);
        }
        if (questionId === 2 && answer === 'Nextcloud') {
            setQuizScore(prev => prev + 10);
            onScore(10);
        }
    };

    return (
        <div className="cabane-page">
            {/* Hero Section */}
            <section className="cabane-hero">
                <div className="cabane-hero-bg" style={{ backgroundImage: 'url(/image/workshop-hero.jpg)' }}></div>
                <div className="cabane-hero-content">
                    <h1>L’Atelier<br />Actions anti-gaspillage numérique</h1>
                    <p>Apprenez à réparer, réutiliser et installer des logiciels libres pour réduire l'empreinte écologique du numérique scolaire.</p>
                </div>
            </section>

            {/* Intro Section */}
            <section className="cabane-section">
                <div className="glass-card intro-grid">
                    <div className="intro-text">
                        <h2>Pourquoi agir contre le gaspillage numérique ?</h2>
                        <p>
                            Le numérique scolaire est souvent victime d'obsolescence programmée, de mises à jour forcées et de renouvellements coûteux.
                            Résister à ce cycle, c’est choisir un modèle plus durable, économique et souverain.
                        </p>
                        <div className="resistance-tags" style={{ justifyContent: 'flex-start' }}>
                            <span className="tag">🔧 Réparabilité</span>
                            <span className="tag">♻️ Réemploi</span>
                            <span className="tag">🐧 Logiciel Libre</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solutions Section 1 */}
            <section className="cabane-section">
                <h2 className="section-title">1. Remplacer Google et Microsoft</h2>
                <div className="solutions-grid">
                    <div className="glass-card solution-card">
                        <div className="card-icon-wrapper">☁️</div>
                        <h3>Nextcloud</h3>
                        <p>Remplace Google Drive, iCloud et OneDrive. Vos données restent chez vous.</p>
                    </div>
                    <div className="glass-card solution-card">
                        <div className="card-icon-wrapper">🎓</div>
                        <h3>Moodle</h3>
                        <p>L'alternative libre à Google Classroom et Teams Éducation.</p>
                    </div>
                    <div className="glass-card solution-card">
                        <div className="card-icon-wrapper">📝</div>
                        <h3>LibreOffice</h3>
                        <p>Suite bureautique complète remplaçant Microsoft Office.</p>
                    </div>
                    <div className="glass-card solution-card">
                        <div className="card-icon-wrapper">💬</div>
                        <h3>Mattermost</h3>
                        <p>Messagerie d'équipe sécurisée pour remplacer Slack ou Teams.</p>
                    </div>
                </div>
            </section>

            {/* Solutions Section 2 */}
            <section className="cabane-section">
                <h2 className="section-title">2. Réutiliser le matériel</h2>
                <div className="glass-card" style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
                        Un ordinateur qui "rame" avec Windows peut redevenir parfaitement fonctionnel grâce à Linux et un peu de maintenance.
                    </p>
                    <div className="solutions-grid">
                        <div className="solution-card" style={{ alignItems: 'center', textAlign: 'center' }}>
                            <div className="card-icon-wrapper">🐧</div>
                            <h3>Installer Linux</h3>
                            <p>Un système léger et libre qui redonne vie aux vieux PC.</p>
                        </div>
                        <div className="solution-card" style={{ alignItems: 'center', textAlign: 'center' }}>
                            <div className="card-icon-wrapper">🧹</div>
                            <h3>Nettoyage</h3>
                            <p>Dépoussiérage et maintenance régulière pour éviter la surchauffe.</p>
                        </div>
                        <div className="solution-card" style={{ alignItems: 'center', textAlign: 'center' }}>
                            <div className="card-icon-wrapper">💾</div>
                            <h3>Upgrade</h3>
                            <p>Remplacer le disque dur par un SSD ou ajouter de la RAM.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solutions Section 3 */}
            <section className="cabane-section">
                <h2 className="section-title">3. Solution locale et souveraine</h2>
                <div className="glass-card intro-grid">
                    <div className="intro-text">
                        <h2>Hébergez vos propres services</h2>
                        <p>
                            Une école qui héberge ses propres services contrôle ses données et limite sa dépendance.
                            Cela permet aussi de mutualiser les serveurs entre établissements et de collaborer avec les collectivités.
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                            <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✅ Hébergement local Nextcloud</li>
                            <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✅ Serveur Moodle interne</li>
                            <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>✅ Partage de ressources</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Mini Game Section */}
            <section className="cabane-section">
                <div className="glass-card game-container">
                    <h2 className="section-title">Situation d'urgence !</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                        Deux salles informatiques sont en panne. Que faites-vous ?
                    </p>
                    <div className="game-options">
                        <div
                            className={`game-card ${gameAnswer === 'linux' ? 'correct' : ''} ${gameAnswer && gameAnswer !== 'linux' ? 'disabled' : ''}`}
                            onClick={() => handleGameChoice('linux')}
                        >
                            <h3>Installer Linux pour prolonger leur vie</h3>
                            {gameAnswer === 'linux' && (
                                <div style={{ marginTop: '1rem' }}>
                                    <span style={{ fontSize: '2rem', display: 'block' }}>🎉</span>
                                    <p style={{ color: 'var(--neon-green)', fontWeight: 'bold' }}>+ Durabilité, + Autonomie</p>
                                </div>
                            )}
                        </div>
                        <div
                            className={`game-card ${gameAnswer === 'buy' ? 'incorrect' : ''} ${gameAnswer && gameAnswer !== 'buy' ? 'disabled' : ''}`}
                            onClick={() => handleGameChoice('buy')}
                        >
                            <h3>Acheter 30 nouveaux PC</h3>
                            {gameAnswer === 'buy' && (
                                <div style={{ marginTop: '1rem' }}>
                                    <span style={{ fontSize: '2rem', display: 'block' }}>💸</span>
                                    <p style={{ color: '#ef4444', fontWeight: 'bold' }}>+ Coûts, + Dépendance</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Quiz Section */}
            <section className="cabane-section">
                <div className="glass-card quiz-container">
                    <h2 className="section-title">Testez votre compréhension</h2>

                    <div className="quiz-question">
                        <h3>1. Quelle solution limite l’obsolescence programmée ?</h3>
                        <div className="quiz-options">
                            <button
                                className={`quiz-btn ${quizAnswers[1] === 'Linux' ? 'correct' : ''} ${quizAnswers[1] && quizAnswers[1] !== 'Linux' ? 'disabled' : ''}`}
                                onClick={() => handleQuizAnswer(1, 'Linux')}
                                disabled={!!quizAnswers[1]}
                            >
                                <span>Linux</span>
                                {quizAnswers[1] === 'Linux' && <span>✅</span>}
                            </button>
                            <button
                                className={`quiz-btn ${quizAnswers[1] === 'Windows 11' ? 'incorrect' : ''} ${quizAnswers[1] && quizAnswers[1] !== 'Windows 11' ? 'disabled' : ''}`}
                                onClick={() => handleQuizAnswer(1, 'Windows 11')}
                                disabled={!!quizAnswers[1]}
                            >
                                <span>Windows 11</span>
                                {quizAnswers[1] === 'Windows 11' && <span>❌</span>}
                            </button>
                        </div>
                        {quizAnswers[1] === 'Linux' && (
                            <p style={{ marginTop: '1rem', color: 'var(--neon-green)' }}>👉 Linux permet de prolonger la vie des machines anciennes.</p>
                        )}
                    </div>

                    <div className="quiz-question">
                        <h3>2. Quel outil est libre ?</h3>
                        <div className="quiz-options">
                            <button
                                className={`quiz-btn ${quizAnswers[2] === 'Nextcloud' ? 'correct' : ''} ${quizAnswers[2] && quizAnswers[2] !== 'Nextcloud' ? 'disabled' : ''}`}
                                onClick={() => handleQuizAnswer(2, 'Nextcloud')}
                                disabled={!!quizAnswers[2]}
                            >
                                <span>Nextcloud</span>
                                {quizAnswers[2] === 'Nextcloud' && <span>✅</span>}
                            </button>
                            <button
                                className={`quiz-btn ${quizAnswers[2] === 'iCloud' ? 'incorrect' : ''} ${quizAnswers[2] && quizAnswers[2] !== 'iCloud' ? 'disabled' : ''}`}
                                onClick={() => handleQuizAnswer(2, 'iCloud')}
                                disabled={!!quizAnswers[2]}
                            >
                                <span>iCloud</span>
                                {quizAnswers[2] === 'iCloud' && <span>❌</span>}
                            </button>
                        </div>
                        {quizAnswers[2] === 'Nextcloud' && (
                            <p style={{ marginTop: '1rem', color: 'var(--neon-green)' }}>👉 Nextcloud est une alternative souveraine, open source et éthique.</p>
                        )}
                    </div>

                    {(gameScore > 0 || quizScore > 0) && (
                        <div className="score-display">
                            🎉 +{gameScore + quizScore} Points (Durabilité & Autonomie)
                        </div>
                    )}
                </div>
            </section>

            {/* Navigation */}
            <section className="cabane-section" style={{ paddingBottom: '8rem' }}>
                <div className="nav-grid">
                    <div className="nav-card">
                        <span>📚 Bibliothèque</span>
                    </div>
                    <div className="nav-card">
                        <span>🏫 École</span>
                    </div>
                    <div className="nav-card">
                        <span>🏢 Tour Big Data</span>
                    </div>
                </div>
            </section>

            <div style={{ position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 100 }}>
                <BackButton onBack={onBack} />
            </div>
        </div>
    );
};

export default CabanePage;
