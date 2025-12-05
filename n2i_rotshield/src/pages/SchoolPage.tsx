import { BackButton, PageWrapper } from './PageComponents';

// ============================================
// PAGE ÉCOLE
// ============================================
const SchoolPage = ({ onBack }: { onBack: () => void }) => (
    <PageWrapper gradient="radial-gradient(ellipse at center, #1a2a3a 0%, #0a0a1a 70%)">
        <h1 style={{
            fontSize: '3rem',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #2196F3, #03A9F4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
        }}>
            🏫 L'École - Éducation Numérique
        </h1>

        <div style={{
            backgroundColor: 'rgba(33, 150, 243, 0.1)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(33, 150, 243, 0.3)',
            textAlign: 'left'
        }}>
            <h2 style={{ color: '#2196F3', marginBottom: '1rem' }}>
                📚 L'éducation au numérique
            </h2>
            <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#e0e0e0' }}>
                L'école est le lieu idéal pour apprendre les bonnes pratiques numériques. 
                Former les élèves à la souveraineté numérique, c'est leur donner les clés 
                pour devenir des citoyens numériques responsables.
            </p>
        </div>

        <div style={{
            backgroundColor: 'rgba(3, 169, 244, 0.1)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(3, 169, 244, 0.3)',
            textAlign: 'left'
        }}>
            <h2 style={{ color: '#03A9F4', marginBottom: '1rem' }}>
                🎓 Ce qu'il faut enseigner
            </h2>
            <ul style={{ lineHeight: '2', fontSize: '1.1rem', color: '#e0e0e0', paddingLeft: '1.5rem' }}>
                <li>Les droits numériques et le RGPD</li>
                <li>Le fonctionnement d'Internet</li>
                <li>Les logiciels libres et open source</li>
                <li>La cybersécurité de base</li>
                <li>L'esprit critique face aux informations</li>
            </ul>
        </div>

        <div style={{
            backgroundColor: 'rgba(33, 150, 243, 0.15)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(33, 150, 243, 0.4)',
            textAlign: 'left'
        }}>
            <h2 style={{ color: '#2196F3', marginBottom: '1rem' }}>
                🏫 Outils pour l'école
            </h2>
            <ul style={{ lineHeight: '2', fontSize: '1.1rem', color: '#e0e0e0', paddingLeft: '1.5rem' }}>
                <li><strong>Apps.education.fr</strong> - Suite collaborative de l'Éducation Nationale</li>
                <li><strong>Framasoft</strong> - Services libres et éthiques</li>
                <li><strong>La Digitale</strong> - Outils numériques responsables</li>
                <li><strong>Primtux</strong> - Linux pour l'éducation</li>
            </ul>
        </div>

        <BackButton onBack={onBack} />
    </PageWrapper>
);

export default SchoolPage;

