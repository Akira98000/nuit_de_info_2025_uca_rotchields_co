import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ZoneType } from '../components/ThreeScene';
import '../App.css';

interface VillageProps {
    visitedZones: Set<ZoneType>;
    scores: Record<string, number>;
    isWarping: boolean;
}

const Village = ({ visitedZones, scores, isWarping }: VillageProps) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [showScene, setShowScene] = useState(false);

    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
    const allZonesVisited = visitedZones.size >= 4; // google, cabane, school, library

    // Gestion du retour au home
    const handleGoHome = useCallback(() => {
        navigate('/');
    }, [navigate]);

    useEffect(() => {
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 500));
            setStep(1);
            await new Promise(r => setTimeout(r, 4000));
            setStep(2);
            await new Promise(r => setTimeout(r, 1000));
            setStep(3);
            await new Promise(r => setTimeout(r, 4000));
            setStep(4);
            await new Promise(r => setTimeout(r, 1000));
            await new Promise(r => setTimeout(r, 1000));
            setStep(5); // Controls fade in
            // Sequence stops here, waiting for user interaction
        };

        sequence();
    }, []);

    const handleStartAdventure = async () => {
        setStep(6); // Controls fade out
        await new Promise(r => setTimeout(r, 1000));
        setShowScene(true);
        setStep(7); // Scene fade in
    };

    if (!showScene) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // Transparent background to show the map behind
                backgroundColor: '#000000',
                color: 'white',
                flexDirection: 'column',
                padding: '2rem',
                textAlign: 'center',
                transition: 'opacity 1s ease-in-out',
                position: 'relative',
                zIndex: 10
            }}>
                {/* Text 1 */}
                <h1 style={{
                    fontSize: '3rem',
                    lineHeight: '1.4',
                    maxWidth: '900px',
                    opacity: step === 1 ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                    position: 'absolute',
                    pointerEvents: 'none',
                    textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                }}>
                    Vous êtes l’étudiant chargé de protéger votre école face aux Big Tech.
                </h1>

                {/* Text 2 */}
                <h1 style={{
                    fontSize: '3rem',
                    lineHeight: '1.4',
                    maxWidth: '900px',
                    opacity: step === 3 ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                    position: 'absolute',
                    pointerEvents: 'none',
                    textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                }}>
                    Votre mission : explorer le village, comprendre la démarche NIRD et renforcer l’autonomie numérique de votre établissement.
                </h1>

                {/* Controls & Rules Screen */}
                <div style={{
                    opacity: step === 5 ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2rem',
                    pointerEvents: 'none',
                    maxWidth: '800px',
                    width: '90%'
                }}>
                    <div style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid white',
                        borderRadius: '15px',
                        padding: '2rem',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        width: '100%',
                        pointerEvents: 'auto'
                    }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center' }}>Contrôles</h2>

                        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <div style={{ border: '1px solid white', padding: '0.5rem 1rem', borderRadius: '5px' }}>↑</div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <div style={{ border: '1px solid white', padding: '0.5rem 1rem', borderRadius: '5px' }}>←</div>
                                    <div style={{ border: '1px solid white', padding: '0.5rem 1rem', borderRadius: '5px' }}>↓</div>
                                    <div style={{ border: '1px solid white', padding: '0.5rem 1rem', borderRadius: '5px' }}>→</div>
                                </div>
                                <span>Se déplacer</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                                <div style={{ border: '1px solid white', padding: '0.5rem 1rem', borderRadius: '5px' }}>Souris</div>
                                <span>Regarder autour</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                                <div style={{ border: '1px solid white', padding: '0.5rem 1rem', borderRadius: '5px' }}>E</div>
                                <span>Interagir</span>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        textAlign: 'center',
                        fontSize: '1.2rem',
                        lineHeight: '1.6',
                        maxWidth: '800px',
                        textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                    }}>
                        <p>
                            Le Village Résistant vous attend.
                            Derrière chaque bâtiment se cache une vérité sur la dépendance aux géants du numérique.
                            Comprendre ces secrets, c’est déjà commencer à résister.
                            Relevez les défis de la Tour Google, apprenez dans la Bibliothèque, expérimentez dans l’École…
                            Et devenez un défenseur du numérique inclusif, responsable et durable.
                        </p>
                    </div>

                    <button
                        onClick={handleStartAdventure}
                        style={{
                            padding: '1rem 2rem',
                            fontSize: '1.2rem',
                            backgroundColor: 'white',
                            color: 'black',
                            border: 'none',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            transition: 'transform 0.2s ease, background-color 0.2s ease',
                            pointerEvents: 'auto'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.backgroundColor = '#f0f0f0';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.backgroundColor = 'white';
                        }}
                    >
                        Commencer l'aventure
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Bouton retour Home en bas à gauche */}
            {showScene && !isWarping && (
                <button
                    onClick={handleGoHome}
                    style={{
                        position: 'absolute',
                        bottom: '2rem',
                        left: '2rem',
                        padding: '12px 24px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        backdropFilter: 'blur(10px)',
                        zIndex: 50,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    }}
                >
                    Retour à l'accueil
                </button>
            )}

            {/* UI Overlay - Objectifs et Score */}
            {showScene && !isWarping && (
                <div style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: '1.5rem',
                    borderRadius: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    zIndex: 50,
                    minWidth: '250px',
                    animation: 'fadeIn 0.5s ease'
                }}>
                    <h3 style={{ margin: '0 0 1rem 0', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '0.5rem' }}>
                        Objectifs
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                        {[
                            { id: 'google', label: 'Tour Google' },
                            { id: 'library', label: 'Bibliothèque' },
                            { id: 'school', label: 'École' },
                            { id: 'cabane', label: 'Cabane' }
                        ].map(zone => (
                            <li key={zone.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', opacity: visitedZones.has(zone.id as ZoneType) ? 0.7 : 1 }}>
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    backgroundColor: visitedZones.has(zone.id as ZoneType) ? '#4ade80' : 'transparent',
                                    border: '2px solid ' + (visitedZones.has(zone.id as ZoneType) ? '#4ade80' : 'rgba(255,255,255,0.5)')
                                }} />
                                <span style={{ textDecoration: visitedZones.has(zone.id as ZoneType) ? 'line-through' : 'none' }}>
                                    {zone.label}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            <span>Score Total</span>
                            <span style={{ color: '#4ade80' }}>{totalScore} pts</span>
                        </div>
                    </div>

                    {allZonesVisited && (
                        <div style={{
                            marginTop: '1rem',
                            textAlign: 'center',
                            color: '#fbbf24',
                            fontWeight: 'bold',
                            animation: 'pulse 2s infinite'
                        }}>
                            🎉 Tous les lieux visités !
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Village;
