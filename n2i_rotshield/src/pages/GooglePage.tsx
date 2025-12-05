import { BackButton, PageWrapper } from './PageComponents';

// ============================================
// PAGE GOOGLE COMPANY (Grandes Entreprises)
// ============================================
const GooglePage = ({ onBack }: { onBack: () => void }) => (
    <PageWrapper gradient="radial-gradient(ellipse at center, #1a1a3a 0%, #0a0a1a 70%)">
        <h1 style={{
            fontSize: '3rem',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
        }}>
            🏢 Google Company - Les Big Tech
        </h1>

        <div style={{
            backgroundColor: 'rgba(66, 133, 244, 0.1)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(66, 133, 244, 0.3)',
            textAlign: 'left'
        }}>
            <h2 style={{ color: '#4285F4', marginBottom: '1rem' }}>
                ⚠️ Les dangers des Big Tech
            </h2>
            <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#e0e0e0' }}>
                Les géants du numérique comme Google, Microsoft, et Amazon collectent massivement 
                vos données personnelles. Dans les écoles, l'utilisation de leurs services gratuits 
                a un prix caché : vos données et celles de vos élèves.
            </p>
        </div>

        <div style={{
            backgroundColor: 'rgba(234, 67, 53, 0.1)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(234, 67, 53, 0.3)',
            textAlign: 'left'
        }}>
            <h2 style={{ color: '#EA4335', marginBottom: '1rem' }}>
                🔍 Ce qu'ils collectent
            </h2>
            <ul style={{ lineHeight: '2', fontSize: '1.1rem', color: '#e0e0e0', paddingLeft: '1.5rem' }}>
                <li>Historique de navigation et recherches</li>
                <li>Données de localisation</li>
                <li>Contacts et communications</li>
                <li>Comportements et habitudes d'apprentissage</li>
                <li>Données biométriques (voix, visage)</li>
            </ul>
        </div>

        <div style={{
            backgroundColor: 'rgba(52, 168, 83, 0.1)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(52, 168, 83, 0.3)',
            textAlign: 'left'
        }}>
            <h2 style={{ color: '#34A853', marginBottom: '1rem' }}>
                💡 Alternatives souveraines
            </h2>
            <ul style={{ lineHeight: '2', fontSize: '1.1rem', color: '#e0e0e0', paddingLeft: '1.5rem' }}>
                <li><strong>Nextcloud</strong> - Alternative à Google Drive</li>
                <li><strong>Collabora</strong> - Alternative à Google Docs</li>
                <li><strong>Peertube</strong> - Alternative à YouTube</li>
                <li><strong>Moodle</strong> - Plateforme d'apprentissage libre</li>
            </ul>
        </div>

        <BackButton onBack={onBack} />
    </PageWrapper>
);

export default GooglePage;

