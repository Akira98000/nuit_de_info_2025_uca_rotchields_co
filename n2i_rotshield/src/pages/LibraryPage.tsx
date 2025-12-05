import { useState, useEffect } from 'react';
import { BackButton } from './PageComponents';
import './LibraryPage.css';

interface LibraryPageProps {
    onBack: () => void;
    onVisit: () => void;
    onScore: (score: number) => void;
}

const LibraryPage = ({ onBack, onVisit, onScore }: LibraryPageProps) => {
    useEffect(() => {
        onVisit();
    }, [onVisit]);
    // Game State
    const [gameAnswer, setGameAnswer] = useState<string | null>(null);
    const [gameScore, setGameScore] = useState(0);

    // Quiz State
    const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
    const [quizScore, setQuizScore] = useState(0);

    const handleGameChoice = (choice: string) => {
        if (gameAnswer) return; // Prevent multiple clicks
        setGameAnswer(choice);
        if (choice === 'nextcloud') {
            setGameScore(10);
            onScore(10);
        }
    };

    const handleQuizChoice = (choice: string) => {
        if (quizAnswer) return;
        setQuizAnswer(choice);
        if (choice === 'local') {
            setQuizScore(10);
            onScore(10);
        }
    };

    return (
        <div className="library-page">
            {/* Hero Section */}
            <section className="library-hero">
                <div className="library-hero-bg" style={{ backgroundImage: 'url(/image/library-hero.jpg)' }}></div>
                <div className="library-hero-content">
                    <h1>La Bibliothèque<br />Connaissances et Ressources</h1>
                    <p>Découvrez les outils essentiels pour résister aux Big Tech et construire un numérique inclusif, responsable et durable.</p>
                </div>
            </section>

            {/* Intro Section */}
            <section className="library-section">
                <div className="glass-card intro-grid">
                    <div className="intro-text">
                        <h2>Pourquoi cette bibliothèque est essentielle ?</h2>
                        <p>
                            La Bibliothèque rassemble les ressources essentielles pour construire un numérique responsable : fiches pédagogiques, tutoriels, comparatifs, guides d’installation, modèles de courriers…
                            C’est le centre de connaissances du Village Résistant, l’endroit où chacun peut apprendre, comprendre et se former à un numérique plus éthique et plus autonome.
                        </p>
                        <p>
                            Dans un monde où les écoles sont poussées vers des solutions fermées et payantes, ces documents offrent des alternatives concrètes, accessibles à tous, pour réduire la dépendance aux géants du numérique.
                        </p>
                    </div>
                </div>
            </section>

            {/* Resources Grid */}
            <section className="library-section">
                <h2 className="section-title">Ressources Disponibles</h2>
                <div className="resources-grid">
                    <div className="glass-card resource-card">
                        <div className="card-icon-wrapper">📗</div>
                        <h3>Guide de sobriété numérique</h3>
                        <p>Comprendre comment réduire l’empreinte carbone du numérique à l’école.</p>
                    </div>
                    <div className="glass-card resource-card">
                        <div className="card-icon-wrapper">🚀</div>
                        <h3>Installer Moodle</h3>
                        <p>Tutoriel étape par étape pour mettre en place une plateforme d’apprentissage libre.</p>
                    </div>
                    <div className="glass-card resource-card">
                        <div className="card-icon-wrapper">📨</div>
                        <h3>Modèle d’email</h3>
                        <p>Un modèle prêt à l’emploi pour dialoguer avec le rectorat ou la direction.</p>
                    </div>
                    <div className="glass-card resource-card">
                        <div className="card-icon-wrapper">⚖️</div>
                        <h3>Google vs Nextcloud</h3>
                        <p>Comparatif : souveraineté, coût, données, vie privée et autonomie.</p>
                    </div>
                    <div className="glass-card resource-card">
                        <div className="card-icon-wrapper">🔧</div>
                        <h3>Le Reconditionné</h3>
                        <p>Pourquoi et comment reconditionner le matériel scolaire pour réduire l’obsolescence.</p>
                    </div>
                </div>
            </section>

            {/* Mini Game Section */}
            <section className="library-section">
                <div className="glass-card game-container">
                    <h2 className="section-title">Trouve la bonne ressource</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
                        Votre établissement veut se libérer de Google Drive. Quelle ressource allez-vous consulter ?
                    </p>
                    <div className="game-options">
                        <div
                            className={`game-card ${gameAnswer === 'nextcloud' ? 'correct' : ''} ${gameAnswer && gameAnswer !== 'nextcloud' ? 'disabled' : ''}`}
                            onClick={() => handleGameChoice('nextcloud')}
                        >
                            <h3>Installer Nextcloud en établissement</h3>
                            {gameAnswer === 'nextcloud' && <span style={{ fontSize: '2rem', display: 'block', marginTop: '1rem' }}>🎉</span>}
                        </div>
                        <div
                            className={`game-card ${gameAnswer === 'courrier' ? 'incorrect' : ''} ${gameAnswer && gameAnswer !== 'courrier' ? 'disabled' : ''}`}
                            onClick={() => handleGameChoice('courrier')}
                        >
                            <h3>Modèle de courrier pour la mairie</h3>
                            {gameAnswer === 'courrier' && <span style={{ fontSize: '2rem', display: 'block', marginTop: '1rem' }}>❌</span>}
                        </div>
                        <div
                            className={`game-card ${gameAnswer === 'moodle' ? 'incorrect' : ''} ${gameAnswer && gameAnswer !== 'moodle' ? 'disabled' : ''}`}
                            onClick={() => handleGameChoice('moodle')}
                        >
                            <h3>Guide d’initiation à Moodle</h3>
                            {gameAnswer === 'moodle' && <span style={{ fontSize: '2rem', display: 'block', marginTop: '1rem' }}>❌</span>}
                        </div>
                    </div>
                    {gameScore > 0 && (
                        <div className="score-display">
                            🎉 +10 Points NIRD gagnés !
                        </div>
                    )}
                </div>
            </section>

            {/* Quiz Section */}
            <section className="library-section">
                <div className="glass-card quiz-container">
                    <h2 className="section-title">Testez vos connaissances</h2>

                    <div className="quiz-question">
                        <h3>Quelle action réduit la consommation énergétique du numérique scolaire ?</h3>
                        <div className="quiz-options">
                            <button
                                className={`quiz-btn ${quizAnswer === 'local' ? 'correct' : ''} ${quizAnswer && quizAnswer !== 'local' ? 'disabled' : ''}`}
                                onClick={() => handleQuizChoice('local')}
                                disabled={!!quizAnswer}
                            >
                                <span>Héberger localement</span>
                                {quizAnswer === 'local' && <span>✅</span>}
                            </button>
                            <button
                                className={`quiz-btn ${quizAnswer === '4k' ? 'incorrect' : ''} ${quizAnswer && quizAnswer !== '4k' ? 'disabled' : ''}`}
                                onClick={() => handleQuizChoice('4k')}
                                disabled={!!quizAnswer}
                            >
                                <span>Activer la 4K sur tous les écrans</span>
                                {quizAnswer === '4k' && <span>❌</span>}
                            </button>
                        </div>
                        {quizAnswer === 'local' && (
                            <p style={{ marginTop: '1.5rem', color: 'var(--neon-green)', fontWeight: '500' }}>
                                Explication : Héberger localement ou sur un cloud souverain réduit la circulation de données à travers des datacenters internationaux énergivores.
                            </p>
                        )}
                    </div>

                    {quizScore > 0 && (
                        <div className="score-display">
                            🎉 +10 Responsabilité
                        </div>
                    )}
                </div>
            </section>

            <div style={{ position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 100 }}>
                <BackButton onBack={onBack} />
            </div>
        </div>
    );
};

export default LibraryPage;
