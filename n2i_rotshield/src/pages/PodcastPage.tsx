import { useState, useRef, useEffect } from 'react';
import './PodcastPage.css';

const PodcastPage = ({ onBack }: { onBack: () => void }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Transcript data
    const transcript = [
        { time: "00:00", speaker: "Hôte (Mathieu)", text: "Bonsoir à tous et bienvenue pour ce podcast spécial Nuit de l'Info, \"Fichier Ouvert\". Aujourd'hui, je suis avec un super panel de plusieurs personnes et surtout Maëla pour le sujet des femmes dans le numérique. Et effectivement, Maëla, toi, tu as participé à Numéri'Celles, qui est un événement organisé spécialement pour les femmes et mettre en avant les femmes dans le milieu du numérique. Est-ce que tu peux nous en reparler s'il te plaît ?" },
        { time: "00:25", speaker: "Maëla", text: "Alors, bonjour à tous. Oui, effectivement, j'ai participé à l'événement Numéri'Celles. En fait, c'était un événement organisé par l'université pour promouvoir les métiers du numérique auprès des jeunes filles. En gros, Numéri'Celles, c'est une association, enfin, c'est la FAGE, qui va voir les étudiantes du collège et des lycées pour les sensibiliser sur les métiers du numérique, parce que actuellement, par exemple, dans notre promotion, sur 80 élèves, on est 10 filles. Donc c'est vrai qu'on est un peu rares." },
        { time: "00:55", speaker: "Hôte (Mathieu)", text: "Donc c'est super intéressant, merci pour ton témoignage. Et donc, euh, aujourd'hui, bah, là, je vais demander à un membre du panel, euh, tu es étudiant en informatique à MIAGE en M1. Et du coup, par rapport à ce qu'elle a dit et toi ton expérience personnelle, est-ce que tu as déjà travaillé avec des femmes pendant tes études ici à MIAGE ?" },
        { time: "01:15", speaker: "Alexis", text: "Tout d'abord, bonjour. Alors, il est vrai que j'ai travaillé avec, euh, avec des femmes dans mes projets. Ça, c'est tout le temps bien passé. Elles prennent souvent les devants pour, euh, pour bien l'organiser et faire en sorte que le projet se passe bien. Et j'ai aussi remarqué que lors des cours plus jeunes, il y avait très peu de femmes, et c'est bien dommage, parce que la tech est est destinée à tout le monde." },
        { time: "01:40", speaker: "Hôte (Mathieu)", text: "Et donc, pendant ces projets, est-ce que tu as remarqué peut-être une vraie différence entre les idées apportées, euh, les moyens de conception, euh, dans les projets où il y avait pas de femmes et les projets où il y avait des femmes ?" },
        { time: "02:00", speaker: "Alexis", text: "Alors, concrètement, il y a pas vraiment de différence, c'est toujours un plaisir de travailler avec elles. Mais c'est juste la personne qui apporte de nouvelles idées, c'est pas forcément une femme, mais juste une nouvelle personne peut avoir ses propres idées, et ça n'a pas d'importance le sexe." },
        { time: "02:20", speaker: "Hôte (Mathieu)", text: "Merci, c'est franchement c'est super intéressant. Et je pense que tu as raison de de bien souligner qu'il faut arrêter de peut-être de voir de façon binaire les choses et de commencer à voir les gens comme des individus, que ce soit ni homme ni femme. Il y a personne qui est fait pour être dans la tech ou ne pas être dans la tech. C'est surtout par rapport aux préférences de chacun. Et merci de l'avoir souligné, franchement." },
        { time: "02:45", speaker: "Hôte (Mathieu)", text: "Et donc Maëla, pour revenir à toi, est-ce que tu aurais par exemple un message pour toutes les filles peut-être qui nous écoutent, qui aimeraient être dans la tech mais qui se disent : \"J'ai pas ma place, c'est un métier d'homme\" ? Est-ce que tu aurais un message peut-être à leur faire passer ?" },
        { time: "03:05", speaker: "Maëla", text: "Oui, merci Mathieu de me poser la question. Par rapport à ça, je voulais dire à toutes les femmes qui nous écoutent qu'il faut pas qu'elles se posent de questions là-dessus, parce que c'est vrai qu'elles auront peut-être moins de copines, vu qu'on est moins nombreuses, mais à part ça, il y aura aucun problème. Vous avez les mêmes capacités qu'un homme, donc ne vous posez pas de questions. L'important c'est juste d'être motivée et tout ira bien." },
        { time: "03:35", speaker: "Hôte (Mathieu)", text: "Et oui, donc du coup, moi, ça me fait penser, pour continuer sur ce sujet-là, euh, quand j'étais, du coup, j'ai commencé l'informatique au lycée, euh, puis j'ai continué ici à MIAGE, avant j'ai fait un BUT, et c'est vrai que les femmes sont souvent vraiment sous-représentées dans les classes. On parle vraiment de moins de 5 des fois. Euh, là, on est 80, euh, on est du coup 10 comme tu as dit. Vraiment, euh, je sais pas si tu as une anecdote personnelle, peut-être sur ça, sur le fait d'être vraiment peu dans des classes qui sont vraiment composées énormément d'hommes. Est-ce qu'il y a peut-être des choses qu'on ressent, des choses qu'il faudrait peut-être dépasser sur le point de vue de soi, sur la façon de voir les choses ? Est-ce que tu aurais quelque chose, une anecdote, peut-être, à nous raconter là-dessus ?" },
        { time: "04:10", speaker: "Maëla", text: "Oui, alors une anecdote. Je me rappelle de mon premier jour à la fac. Je suis rentrée dans l'amphi et j'ai vu que des garçons sur leurs PC. Et je me suis dit : \"Ouh là, mais qu'est-ce que je fais là ?\" J'ai j'ai commencé à avoir un syndrome de l'imposteur. Je me suis dit : \"Non, je vais jamais y arriver, ils sont déjà plus forts que moi\", et cetera, et cetera. Et finalement, à la fin de l'année, j'ai fini major de promo. Donc j'ai bien eu raison de m'accrocher et de dépasser les préjugés." },
        { time: "04:35", speaker: "Hôte (Mathieu)", text: "Merci, vraiment, euh, je trouve c'est super inspirant pour, euh, peut-être les filles ou même pour tout le monde qui nous écoute. Je pense aussi qu'il est important de rappeler aux équipes, euh, de mettre en avant la mixité, euh, c'est important de pas laisser les femmes seules, vraiment de leur prouver qu'elles sont vraiment au même niveau que tous leurs collègues masculins finalement. Et peut-être, avant la fin, euh, un message, euh, de notre panel, euh, quelque chose à dire sur ce, sur ce sujet avant de conclure ?" },
        { time: "04:55", speaker: "Alexis", text: "Vraiment, n'ayez pas peur, lancez-vous, tout le monde est la bienvenue. On est une grande famille et et profitez." },
        { time: "05:00", speaker: "Hôte (Mathieu)", text: "Merci, encore merci à nos deux invités, du coup, d'avoir bien voulu parler comme ça de sujets, euh, des femmes dans dans le numérique. Euh, merci de nous avoir écoutés aussi. Euh, c'est vraiment un sujet d'utilité publique. Donc ce ce ce podcast est finalement très le bienvenu." }
    ];

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const updateTime = () => setCurrentTime(audio.currentTime);
            const updateDuration = () => setDuration(audio.duration);

            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', updateDuration);

            return () => {
                audio.removeEventListener('timeupdate', updateTime);
                audio.removeEventListener('loadedmetadata', updateDuration);
            };
        }
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (audioRef.current) {
            const bar = e.currentTarget;
            const rect = bar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audioRef.current.currentTime = percent * duration;
        }
    };

    const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
        if (audioRef.current) {
            const bar = e.currentTarget;
            const rect = bar.getBoundingClientRect();
            const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            audioRef.current.volume = percent;
            setVolume(percent);
            if (percent > 0 && isMuted) {
                audioRef.current.muted = false;
                setIsMuted(false);
            }
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="podcast-page">
            {/* Hidden Audio Element */}
            <audio ref={audioRef} src="/audio/podcast.mp3" />

            {/* Discrete Back Button */}
            <button
                onClick={onBack}
                className="discrete-back-btn"
                aria-label="Retour"
            >
                ← Retour
            </button>

            {/* Main Content Area */}
            <div className="main-content">
                <div className="header-simple">
                    <h1>fichier ouvert : Les femmes dans le numérique</h1>
                    <p className="subtitle">Épisode Spécial</p>
                </div>

                <div className="transcript-full">
                    {transcript.map((line, index) => (
                        <div key={index} className={`transcript-line ${currentTime >= parseFloat(line.time.replace(':', '.')) * 60 ? 'active' : ''}`}>
                            <div className="line-meta">
                                <span className="timestamp">{line.time}</span>
                                <span className="speaker-label">{line.speaker}</span>
                            </div>
                            <p className="line-text">{line.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Spotify-style Player */}
            <div className="spotify-player">
                <div className="player-left">
                    <div className="album-art">
                        🎙️
                    </div>
                    <div className="track-info">
                        <span className="track-title">Les femmes dans le numérique</span>
                        <span className="track-artist">Résistance Numérique</span>
                    </div>
                </div>

                <div className="player-center">
                    <div className="player-controls">
                        <button className="control-btn" onClick={() => {
                            if (audioRef.current) audioRef.current.currentTime -= 15;
                        }}>
                            ⏮ 15s
                        </button>
                        <button className="play-btn" onClick={togglePlay}>
                            {isPlaying ? '⏸' : '▶'}
                        </button>
                        <button className="control-btn" onClick={() => {
                            if (audioRef.current) audioRef.current.currentTime += 15;
                        }}>
                            15s ⏭
                        </button>
                    </div>
                    <div className="progress-container">
                        <span>{formatTime(currentTime)}</span>
                        <div className="progress-bar-wrapper" onClick={handleSeek}>
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                            ></div>
                        </div>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="player-right">
                    <button
                        onClick={toggleMute}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: 0, display: 'flex' }}
                        aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted || volume === 0 ? '🔇' : '🔊'}
                    </button>
                    <div className="volume-slider" onClick={handleVolumeChange}>
                        <div
                            className="volume-fill"
                            style={{ width: `${isMuted ? 0 : volume * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PodcastPage;
