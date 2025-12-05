import { BackButton, PageWrapper } from './PageComponents';

// ============================================
// PAGE CABANE (Vie Privée)
// ============================================
const CabanePage = ({ onBack }: { onBack: () => void }) => (
    <PageWrapper gradient="radial-gradient(ellipse at center, #2d1f1a 0%, #0a0a1a 70%)">
        <h1 style={{
            fontSize: '3rem',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #8B4513, #D2691E)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
        }}>
            🏠 La Cabane - Refuge Numérique
        </h1>

        <div style={{
            backgroundColor: 'rgba(139, 69, 19, 0.1)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(139, 69, 19, 0.3)',
            textAlign: 'left'
        }}>
            <h2 style={{ color: '#D2691E', marginBottom: '1rem' }}>
                🛡️ Protéger sa vie privée
            </h2>
            <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#e0e0e0' }}>
                La cabane représente votre espace privé numérique. Un lieu où vos données 
                vous appartiennent et où personne ne peut vous surveiller. Apprenez à 
                construire votre propre refuge numérique !
            </p>
        </div>

        <div style={{
            backgroundColor: 'rgba(210, 105, 30, 0.1)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(210, 105, 30, 0.3)',
            textAlign: 'left'
        }}>
            <h2 style={{ color: '#D2691E', marginBottom: '1rem' }}>
                🔐 Conseils de sécurité
            </h2>
            <ul style={{ lineHeight: '2', fontSize: '1.1rem', color: '#e0e0e0', paddingLeft: '1.5rem' }}>
                <li>Utilisez des mots de passe forts et uniques</li>
                <li>Activez l'authentification à deux facteurs</li>
                <li>Chiffrez vos communications (Signal, ProtonMail)</li>
                <li>Utilisez un VPN pour naviguer</li>
                <li>Mettez à jour régulièrement vos logiciels</li>
            </ul>
        </div>

        <div style={{
            backgroundColor: 'rgba(139, 69, 19, 0.15)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
            border: '1px solid rgba(139, 69, 19, 0.4)',
            textAlign: 'left'
        }}>
            <h2 style={{ color: '#D2691E', marginBottom: '1rem' }}>
                🏡 Créer son espace sécurisé
            </h2>
            <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#e0e0e0' }}>
                Comme une cabane dans la forêt, votre espace numérique doit être un refuge. 
                Hébergez vos propres services, contrôlez vos données, et ne dépendez plus 
                des géants du web.
            </p>
        </div>

        <BackButton onBack={onBack} />
    </PageWrapper>
);

export default CabanePage;

