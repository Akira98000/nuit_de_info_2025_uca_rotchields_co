import { BackButton, PageWrapper } from './PageComponents';

// ============================================
// PAGE BIBLIOTHÈQUE
// ============================================
const LibraryPage = ({ onBack }: { onBack: () => void }) => (
    <PageWrapper gradient="radial-gradient(ellipse at center, #2a1a2a 0%, #0a0a1a 70%)">
        <h1 style={{
            fontSize: '3rem',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #9C27B0, #673AB7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
        }}>
            📚 La Bibliothèque - Ressources NIRD
        </h1>

        <div style={{
            backgroundColor: 'rgba(156, 39, 176, 0.1)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(156, 39, 176, 0.3)',
            textAlign: 'left'
        }}>
            <h2 style={{ color: '#9C27B0', marginBottom: '1rem' }}>
                📖 À propos de NIRD
            </h2>
            <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#e0e0e0' }}>
                NIRD (Numérique, Indépendance, Résistance, Données) est une association 
                qui lutte pour la souveraineté numérique des établissements scolaires. 
                Notre mission est de vous aider à reprendre le contrôle de vos données.
            </p>
        </div>

        <div style={{
            backgroundColor: 'rgba(103, 58, 183, 0.1)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(103, 58, 183, 0.3)',
            textAlign: 'left'
        }}>
            <h2 style={{ color: '#673AB7', marginBottom: '1rem' }}>
                📚 Ressources documentaires
            </h2>
            <ul style={{ lineHeight: '2', fontSize: '1.1rem', color: '#e0e0e0', paddingLeft: '1.5rem' }}>
                <li><strong>Guide RGPD</strong> - Comprendre la réglementation</li>
                <li><strong>Catalogue des alternatives</strong> - Solutions souveraines</li>
                <li><strong>Tutoriels</strong> - Migrer vers des outils libres</li>
                <li><strong>Études de cas</strong> - Retours d'expérience d'écoles</li>
            </ul>
        </div>

        <div style={{
            backgroundColor: 'rgba(156, 39, 176, 0.15)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(156, 39, 176, 0.4)',
            textAlign: 'left'
        }}>
            <h2 style={{ color: '#9C27B0', marginBottom: '1rem' }}>
                🔗 Liens utiles
            </h2>
            <ul style={{ lineHeight: '2', fontSize: '1.1rem', color: '#e0e0e0', paddingLeft: '1.5rem' }}>
                <li><strong>CNIL</strong> - cnil.fr</li>
                <li><strong>ANSSI</strong> - ssi.gouv.fr</li>
                <li><strong>April</strong> - april.org</li>
                <li><strong>La Quadrature du Net</strong> - laquadrature.net</li>
            </ul>
        </div>

        <BackButton onBack={onBack} />
    </PageWrapper>
);

export default LibraryPage;

