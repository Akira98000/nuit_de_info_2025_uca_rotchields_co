import { useState, useEffect } from 'react';
import ThreeScene from '../components/ThreeScene';
import '../App.css';

const Village = () => {
    const [step, setStep] = useState(0);
    const [showScene, setShowScene] = useState(false);

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
        <div style={{ opacity: step === 5 ? 1 : 0, transition: 'opacity 2s ease-in' }}>
            <ThreeScene />
        </div>
    );
};

export default Village;
