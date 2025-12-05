import { useState } from 'react';
import { BackButton } from './PageComponents';
import './GooglePage.css';

const GooglePage = ({ onBack }: { onBack: () => void }) => {
    // Game State
    const [gameAnswer, setGameAnswer] = useState<string | null>(null);
    const [showGameResult, setShowGameResult] = useState(false);

    // Quiz State
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizScore, setQuizScore] = useState(0);

    const handleGameChoice = (choice: string) => {
        if (gameAnswer) return;
        setGameAnswer(choice);
        setShowGameResult(true);
    };

    const handleQuizAnswer = (choice: string) => {
        if (quizAnswer) return;
        setQuizAnswer(choice);
        if (choice === 'hors_ue') {
            setQuizScore(20);
        }
    };

    return (
        <div className="google-page">
            {/* Hero Section */}
            <section className="google-hero">
                <div className="google-hero-bg" style={{ backgroundImage: 'url(/image/bigdata-hero.jpg)' }}></div>
                <div className="google-hero-content">
                    <h1>La Tour Big Data<br />La menace extérieure</h1>
                    <p>Comprendre les risques de la dépendance aux géants du numérique pour mieux résister.</p>
                </div>
            </section>

            {/* Intro Section */}
            <section className="google-section">
                <div className="glass-card intro-grid">
                    <div className="intro-text">
                        <h2>Les géants du numérique imposent leurs règles</h2>
                        <p>
                            Matériel rendu obsolète, collecte massive des données, écosystèmes fermés, abonnements coûteux, dépendance technique…
                            La Tour Big Data représente ce modèle.
                            Pour résister, un établissement doit comprendre ces dangers et explorer les alternatives.
                        </p>
                    </div>
                </div>
            </section>

            {/* Risk Gauges Section */}
            <section className="google-section">
                <h2 className="section-title">Niveau de Menace</h2>
                <div className="glass-card">
                    <div className="gauges-grid">
                        <div className="gauge-card">
                            <div className="gauge-header">
                                <span>Tracking des élèves</span>
                                <span style={{ color: '#ef4444' }}>90%</span>
                            </div>
                            <div className="gauge-bar-bg">
                                <div className="gauge-bar-fill" style={{ width: '90%' }}></div>
                            </div>
                        </div>
                        <div className="gauge-card">
                            <div className="gauge-header">
                                <span>Dépendance technologique</span>
                                <span style={{ color: '#ef4444' }}>85%</span>
                            </div>
                            <div className="gauge-bar-bg">
                                <div className="gauge-bar-fill" style={{ width: '85%' }}></div>
                            </div>
                        </div>
                        <div className="gauge-card">
                            <div className="gauge-header">
                                <span>Coût à long terme</span>
                                <span style={{ color: '#ef4444' }}>75%</span>
                            </div>
                            <div className="gauge-bar-bg">
                                <div className="gauge-bar-fill" style={{ width: '75%' }}></div>
                            </div>
                        </div>
                        <div className="gauge-card">
                            <div className="gauge-header">
                                <span>Données hors UE</span>
                                <span style={{ color: '#b91c1c' }}>100%</span>
                            </div>
                            <div className="gauge-bar-bg">
                                <div className="gauge-bar-fill" style={{ width: '100%' }}></div>
                            </div>
                        </div>
                        <div className="gauge-card">
                            <div className="gauge-header">
                                <span>Obsolescence forcée</span>
                                <span style={{ color: '#ef4444' }}>80%</span>
                            </div>
                            <div className="gauge-bar-bg">
                                <div className="gauge-bar-fill" style={{ width: '80%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mini Simulation Section */}
            <section className="google-section">
                <div className="glass-card game-container">
                    <h2 className="section-title">Simulation de Risque</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                        Votre établissement stocke toutes ses données sur une plateforme américaine.
                        Quel risque cela crée ?
                    </p>
                    <div className="game-options">
                        <div
                            className={`game-card ${gameAnswer === 'risk' ? 'correct' : ''} ${gameAnswer && gameAnswer !== 'risk' ? 'disabled' : ''}`}
                            onClick={() => handleGameChoice('risk')}
                        >
                            <h3>Perte de souveraineté</h3>
                            {gameAnswer === 'risk' && <span style={{ fontSize: '2rem', display: 'block', marginTop: '1rem' }}>⚠️</span>}
                        </div>
                        <div
                            className={`game-card ${gameAnswer === 'none' ? 'incorrect' : ''} ${gameAnswer && gameAnswer !== 'none' ? 'disabled' : ''}`}
                            onClick={() => handleGameChoice('none')}
                        >
                            <h3>Aucun risque</h3>
                            {gameAnswer === 'none' && <span style={{ fontSize: '2rem', display: 'block', marginTop: '1rem' }}>❌</span>}
                        </div>
                    </div>

                    {showGameResult && (
                        <div style={{ marginTop: '2rem', animation: 'popIn 0.5s ease' }}>
                            <button
                                onClick={onBack}
                                style={{
                                    padding: '1rem 2rem',
                                    fontSize: '1.1rem',
                                    background: 'var(--neon-green)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)'
                                }}
                            >
                                Voir comment réduire ces risques →
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Quiz Section */}
            <section className="google-section">
                <div className="glass-card quiz-container">
                    <h2 className="section-title">Testez vos connaissances</h2>

                    <div className="quiz-question">
                        <h3>Où partent les données stockées sur les plateformes privées ?</h3>
                        <div className="quiz-options">
                            <button
                                className={`quiz-btn ${quizAnswer === 'hors_ue' ? 'correct' : ''} ${quizAnswer && quizAnswer !== 'hors_ue' ? 'disabled' : ''}`}
                                onClick={() => handleQuizAnswer('hors_ue')}
                                disabled={!!quizAnswer}
                            >
                                <span>Souvent hors Europe</span>
                                {quizAnswer === 'hors_ue' && <span>✅</span>}
                            </button>
                            <button
                                className={`quiz-btn ${quizAnswer === 'local' ? 'incorrect' : ''} ${quizAnswer && quizAnswer !== 'local' ? 'disabled' : ''}`}
                                onClick={() => handleQuizAnswer('local')}
                                disabled={!!quizAnswer}
                            >
                                <span>Toujours chez l’établissement</span>
                                {quizAnswer === 'local' && <span>❌</span>}
                            </button>
                        </div>
                    </div>

                    {quizScore > 0 && (
                        <div className="score-display">
                            🎉 +20 Points (Responsabilité & Autonomie)
                        </div>
                    )}
                </div>
            </section>

            {/* Navigation */}
            <section className="google-section" style={{ paddingBottom: '8rem' }}>
                <div className="nav-grid">
                    <div className="nav-card">
                        <span>📚 Bibliothèque</span>
                    </div>
                    <div className="nav-card">
                        <span>🏫 École</span>
                    </div>
                    <div className="nav-card">
                        <span>🔧 Atelier</span>
                    </div>
                </div>
            </section>

            <div style={{ position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 100 }}>
                <BackButton onBack={onBack} />
            </div>
        </div>
    );
};

export default GooglePage;
