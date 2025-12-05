import React from 'react';

// Style commun pour le bouton retour
export const BackButton = ({ onBack }: { onBack: () => void }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
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
        <span style={{ 
            fontSize: '0.9rem', 
            color: 'rgba(255, 255, 255, 0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
        }}>
            ou appuyez sur <kbd style={{
                backgroundColor: 'rgba(255, 215, 0, 0.2)',
                color: '#FFD700',
                padding: '4px 10px',
                borderRadius: '6px',
                fontWeight: 'bold',
                border: '1px solid rgba(255, 215, 0, 0.4)'
            }}>E</kbd>
        </span>
    </div>
);

// Style de base pour toutes les pages
export const PageWrapper = ({ children, gradient }: { children: React.ReactNode; gradient: string }) => (
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
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: gradient,
            zIndex: 0
        }} />
        <div style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '800px',
            textAlign: 'center'
        }}>
            {children}
        </div>
    </div>
);

