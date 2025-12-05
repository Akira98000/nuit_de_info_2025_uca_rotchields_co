import { useState, useEffect, useCallback } from 'react';
import ThreeScene from '../components/ThreeScene';
import type { PlayerPosition } from '../components/ThreeScene';
import StarWarp from '../components/StarWarp';
import '../App.css';

// Page de contenu qui s'affiche quand on appuie sur E
const ContentPage = ({ onBack }: { onBack: () => void }) => {
    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            backgroundColor: '#0a0a1a',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            position: 'relative',
            overflow: 'auto'
        }}>
            {/* Fond avec gradient */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(ellipse at center, #1a1a3a 0%, #0a0a1a 70%)',
                zIndex: 0
            }} />

            {/* Contenu */}
            <div style={{
                position: 'relative',
                zIndex: 1,
                maxWidth: '800px',
                textAlign: 'center'
            }}>
                <h1 style={{
                    fontSize: '3rem',
                    marginBottom: '2rem',
                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>
                    🏰 Bienvenue dans le Village NIRD
                </h1>

                <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginBottom: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    textAlign: 'left'
                }}>
                    <h2 style={{ color: '#FFD700', marginBottom: '1rem' }}>
                        À propos de NIRD
                    </h2>
                    <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#e0e0e0' }}>
                        NIRD (Numérique, Indépendance, Résistance, Données) est une association 
                        qui lutte pour la souveraineté numérique des établissements scolaires. 
                        Notre mission est de vous aider à reprendre le contrôle de vos données 
                        face aux géants du numérique.
                    </p>
                </div>

                <div style={{
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    borderRadius: '16px',
                    padding: '2rem',
                    marginBottom: '2rem',
                    border: '1px solid rgba(255, 215, 0, 0.2)',
                    textAlign: 'left'
                }}>
                    <h2 style={{ color: '#FFD700', marginBottom: '1rem' }}>
                        🎯 Votre Mission
                    </h2>
                    <ul style={{ lineHeight: '2', fontSize: '1.1rem', color: '#e0e0e0', paddingLeft: '1.5rem' }}>
                        <li>Explorez le village numérique</li>
                        <li>Découvrez les dangers des Big Tech</li>
                        <li>Apprenez à protéger vos données</li>
                        <li>Devenez un acteur de la résistance numérique</li>
                    </ul>
                </div>

                <button
                    onClick={onBack}
                    style={{
                        padding: '16px 48px',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        backgroundColor: '#FFD700',
                        color: '#0a0a1a',
                        border: 'none',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 20px rgba(255, 215, 0, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 6px 30px rgba(255, 215, 0, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 215, 0, 0.3)';
                    }}
                >
                    ← Retourner au village
                </button>
            </div>
        </div>
    );
};

const Village = () => {
    const [step, setStep] = useState(0);
    const [showScene, setShowScene] = useState(false);
    
    // État pour la page de contenu
    const [isWarping, setIsWarping] = useState(false);
    const [showContentPage, setShowContentPage] = useState(false);
    const [savedPosition, setSavedPosition] = useState<PlayerPosition | null>(null);

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
            setShowScene(true);
            setStep(5);
        };

        sequence();
    }, []);

    // Gestion de l'ouverture de la page (stable avec useCallback)
    const handleOpenPage = useCallback((position: PlayerPosition) => {
        console.log('Opening page from position:', position);
        setSavedPosition(position);
        setIsWarping(true);
        
        // Après l'animation de warp, afficher la page
        setTimeout(() => {
            setShowContentPage(true);
            setIsWarping(false);
        }, 2000);
    }, []);

    // Gestion du retour au village
    const handleBackToVillage = useCallback(() => {
        setIsWarping(true);
        setShowContentPage(false);
        
        // Après l'animation de warp, revenir au village
        setTimeout(() => {
            setIsWarping(false);
        }, 1500);
    }, []);

    if (!showScene) {
        return (
            <div style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#000000',
                color: 'white',
                flexDirection: 'column',
                padding: '2rem',
                textAlign: 'center',
                transition: 'opacity 1s ease-in-out'
            }}>
                {/* Text 1 */}
                <h1 style={{
                    fontSize: '3rem',
                    lineHeight: '1.4',
                    maxWidth: '900px',
                    opacity: step === 1 ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                    position: 'absolute',
                    pointerEvents: 'none'
                }}>
                    Vous allez vous incarner en tant qu'étudiant qui veut combattre les Big Data.
                </h1>

                {/* Text 2 */}
                <h1 style={{
                    fontSize: '3rem',
                    lineHeight: '1.4',
                    maxWidth: '900px',
                    opacity: step === 3 ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                    position: 'absolute',
                    pointerEvents: 'none'
                }}>
                    Votre école compte sur vous pour apprendre au maximum sur l'association NIRD.
                </h1>
            </div>
        );
    }

    return (
        <>
            {/* Animation StarWarp */}
            <StarWarp isActive={isWarping} />
            
            {/* Page de contenu */}
            {showContentPage && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 100,
                    opacity: isWarping ? 0 : 1,
                    transition: 'opacity 0.5s ease'
                }}>
                    <ContentPage onBack={handleBackToVillage} />
                </div>
            )}
            
            {/* Scène 3D */}
            <div style={{ 
                opacity: (step === 5 && !showContentPage && !isWarping) ? 1 : 0, 
                transition: 'opacity 0.5s ease-in',
                pointerEvents: showContentPage ? 'none' : 'auto'
            }}>
                <ThreeScene 
                    onOpenPage={handleOpenPage}
                    initialPosition={savedPosition}
                />
            </div>
        </>
    );
};

export default Village;
