import { useState, useEffect, useCallback } from 'react';
import ThreeScene from '../components/ThreeScene';
import type { PlayerPosition, ZoneType } from '../components/ThreeScene';
import StarWarp from '../components/StarWarp';
import '../App.css';

// Import des pages
import GooglePage from './GooglePage';
import CabanePage from './CabanePage';
import SchoolPage from './SchoolPage';
import LibraryPage from './LibraryPage';

// Composant qui affiche la bonne page selon le type de zone
const ContentPage = ({ zoneType, onBack }: { zoneType: ZoneType; onBack: () => void }) => {
    switch (zoneType) {
        case 'google':
            return <GooglePage onBack={onBack} />;
        case 'cabane':
            return <CabanePage onBack={onBack} />;
        case 'school':
            return <SchoolPage onBack={onBack} />;
        case 'library':
            return <LibraryPage onBack={onBack} />;
        default:
            return <GooglePage onBack={onBack} />;
    }
};

const Village = () => {
    const [step, setStep] = useState(0);
    const [showScene, setShowScene] = useState(false);
    
    // État pour la page de contenu
    const [isWarping, setIsWarping] = useState(false);
    const [showContentPage, setShowContentPage] = useState(false);
    const [savedPosition, setSavedPosition] = useState<PlayerPosition | null>(null);
    const [currentZone, setCurrentZone] = useState<ZoneType>('google');

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
    const handleOpenPage = useCallback((position: PlayerPosition, zoneType: ZoneType) => {
        console.log('Opening page from position:', position, 'Zone:', zoneType);
        setSavedPosition(position);
        setCurrentZone(zoneType);
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
                    <ContentPage zoneType={currentZone} onBack={handleBackToVillage} />
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
