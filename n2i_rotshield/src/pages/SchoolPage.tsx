import { useState, useEffect } from 'react';
import { BackButton } from './PageComponents';
import './SchoolPage.css';

interface SchoolPageProps {
    onBack: () => void;
    onVisit: () => void;
    onScore: (score: number) => void;
}

const SchoolPage = ({ onBack, onVisit, onScore }: SchoolPageProps) => {
    useEffect(() => {
        onVisit();
    }, [onVisit]);
    const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({});
    const [showScore, setShowScore] = useState(false);

    const handleAnswer = (questionId: number, answer: string) => {
        const newAnswers = { ...quizAnswers, [questionId]: answer };
        setQuizAnswers(newAnswers);

        if (Object.keys(newAnswers).length === 2) {
            setShowScore(true);
            onScore(10);
        }
    };

    return (
        <div className="school-page">
            {/* Hero Section */}
            <section className="school-hero">
                <div className="school-hero-bg" style={{ backgroundImage: 'url(/image/classroom-hero.jpg)' }}></div>
                <div className="school-hero-content">
                    <h1>L’École : Alternatives<br />Pédagogiques Libres</h1>
                    <p>Reprenez le contrôle sur votre numérique. Adoptez des outils souverains, durables et éthiques pour l'école de demain.</p>
                </div>
            </section>

            {/* Section 1 — Problem statement */}
            <section className="school-section">
                <div className="glass-card problem-grid">
                    <div className="problem-text">
                        <h2>Pourquoi résister aux Big Tech ?</h2>
                        <p>
                            La dépendance aux géants du numérique (GAFAM) menace la souveraineté de nos écoles et la vie privée de nos élèves.
                            Il est temps de changer de paradigme.
                        </p>
                        <div className="problem-stats">
                            <div className="stat-card">
                                <span className="stat-icon">🔒</span>
                                <span className="stat-label">Dépendance</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-icon">💸</span>
                                <span className="stat-label">Coûts Cachés</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-icon">🕵️</span>
                                <span className="stat-label">Surveillance</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-icon">♻️</span>
                                <span className="stat-label">Obsolescence</span>
                            </div>
                        </div>
                    </div>
                    <div className="problem-image" style={{
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)',
                        height: '100%',
                        minHeight: '400px'
                    }}>
                        <img
                            src="https://images.ft.com/v3/image/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2F48b00930-8447-4a5f-93a3-16745e762c36.jpg?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1"
                            alt="Digital Resistance"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </section>

            {/* Section 2 — Solutions libres */}
            <section className="school-section">
                <h2 className="section-title">Les Solutions Libres</h2>
                <div className="solutions-grid">
                    <div className="glass-card solution-card">
                        <div className="card-icon-wrapper">🎓</div>
                        <h3>Moodle</h3>
                        <p>LMS open-source complet pour créer des environnements d'apprentissage personnalisés.</p>
                    </div>
                    <div className="glass-card solution-card">
                        <div className="card-icon-wrapper">☁️</div>
                        <h3>Nextcloud</h3>
                        <p>Collaboration et partage de fichiers sécurisés, sous votre contrôle total.</p>
                    </div>
                    <div className="glass-card solution-card">
                        <div className="card-icon-wrapper">📝</div>
                        <h3>LibreOffice</h3>
                        <p>Suite bureautique puissante et libre, compatible avec tous les formats standards.</p>
                    </div>
                    <div className="glass-card solution-card">
                        <div className="card-icon-wrapper">🖥️</div>
                        <h3>OpenBoard</h3>
                        <p>Le tableau blanc interactif fait par des enseignants, pour des enseignants.</p>
                    </div>
                    <div className="glass-card solution-card">
                        <div className="card-icon-wrapper">💬</div>
                        <h3>Mattermost</h3>
                        <p>Communication d'équipe sécurisée, alternative souveraine à Slack et Teams.</p>
                    </div>
                </div>
            </section>

            {/* Section 3 — Résistance NIRD */}
            <section className="school-section">
                <div className="resistance-wrapper">
                    <div className="resistance-box">
                        <h2>Résistance NIRD</h2>
                        <p style={{ color: '#94a3b8', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
                            Rejoignez le mouvement pour un numérique éducatif libre et responsable.
                        </p>
                        <div className="resistance-tags">
                            <span className="tag">🛡️ Souveraineté</span>
                            <span className="tag">🌱 Écologie</span>
                            <span className="tag">🤝 Éthique</span>
                            <span className="tag">🔓 Liberté</span>
                            <span className="tag">🚀 Innovation</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4 — Quiz interactif */}
            <section className="school-section">
                <div className="glass-card quiz-container">
                    <h2 className="section-title" style={{ marginBottom: '3rem' }}>Testez vos connaissances</h2>

                    <div className="quiz-question">
                        <h3>1. Quelle suite bureautique respecte vos données ?</h3>
                        <div className="quiz-options">
                            <button
                                className={`quiz-btn ${quizAnswers[1] === 'LibreOffice' ? 'correct' : ''} ${quizAnswers[1] && quizAnswers[1] !== 'LibreOffice' ? 'disabled' : ''}`}
                                onClick={() => handleAnswer(1, 'LibreOffice')}
                                disabled={!!quizAnswers[1]}
                            >
                                <span>LibreOffice</span>
                                {quizAnswers[1] === 'LibreOffice' && <span>✅</span>}
                            </button>
                            <button
                                className={`quiz-btn ${quizAnswers[1] === 'Google Docs' ? 'incorrect' : ''} ${quizAnswers[1] && quizAnswers[1] !== 'Google Docs' ? 'disabled' : ''}`}
                                onClick={() => handleAnswer(1, 'Google Docs')}
                                disabled={!!quizAnswers[1]}
                            >
                                <span>Google Docs</span>
                                {quizAnswers[1] === 'Google Docs' && <span>❌</span>}
                            </button>
                        </div>
                    </div>

                    <div className="quiz-question">
                        <h3>2. Comment réduire l'empreinte numérique de l'école ?</h3>
                        <div className="quiz-options">
                            <button
                                className={`quiz-btn ${quizAnswers[2] === 'Installer des solutions libres' ? 'correct' : ''} ${quizAnswers[2] && quizAnswers[2] !== 'Installer des solutions libres' ? 'disabled' : ''}`}
                                onClick={() => handleAnswer(2, 'Installer des solutions libres')}
                                disabled={!!quizAnswers[2]}
                            >
                                <span>Installer des solutions libres</span>
                                {quizAnswers[2] === 'Installer des solutions libres' && <span>✅</span>}
                            </button>
                            <button
                                className={`quiz-btn ${quizAnswers[2] === 'Acheter des licences propriétaires' ? 'incorrect' : ''} ${quizAnswers[2] && quizAnswers[2] !== 'Acheter des licences propriétaires' ? 'disabled' : ''}`}
                                onClick={() => handleAnswer(2, 'Acheter des licences propriétaires')}
                                disabled={!!quizAnswers[2]}
                            >
                                <span>Acheter des licences propriétaires</span>
                                {quizAnswers[2] === 'Acheter des licences propriétaires' && <span>❌</span>}
                            </button>
                        </div>
                    </div>

                    {showScore && (
                        <div className="score-display">
                            🎉 +10 Points de Résistance !
                        </div>
                    )}
                </div>
            </section>

            {/* Section 5 — Navigation buttons */}
            <section className="school-section" style={{ paddingBottom: '8rem' }}>
                <div className="nav-grid">
                    <div className="nav-card">
                        <span>📚 Bibliothèque</span>
                    </div>
                    <div className="nav-card">
                        <span>💡 Maison des Idées</span>
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

export default SchoolPage;
