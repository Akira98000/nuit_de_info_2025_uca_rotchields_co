import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface PlayerPosition {
    x: number;
    y: number;
    z: number;
    rotationY: number;
}

// Types de zones interactives
type ZoneType = 'google' | 'cabane' | 'school' | 'library';

interface ThreeSceneProps {
    onOpenPage?: (position: PlayerPosition, zoneType: ZoneType) => void;
    initialPosition?: PlayerPosition | null;
    isHome?: boolean;
}

// Zone interactive "Google Company"
const GOOGLE_COMPANY_ZONE = {
    minX: 7.33,
    maxX: 10.5,
    minZ: 15.50,
    maxZ: 22.90
};

// Zone interactive "Cabane"
const CABANE_ZONE = {
    minX: 6.77,
    maxX: 8.48,
    minZ: -8.45,
    maxZ: -4.62
};

// Zone interactive "School"
const SCHOOL_ZONE = {
    minX: 6.74,
    maxX: 11.5,
    minZ: 2.91,
    maxZ: 8.23
};

// Zone interactive "Library"
const LIBRARY_ZONE = {
    minX: -12.61,
    maxX: -8.01,
    minZ: 4.54,
    maxZ: 6.30
};

const ThreeScene = ({ onOpenPage, initialPosition, isHome = false }: ThreeSceneProps) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<THREE.Object3D | null>(null);
    const isInZoneRef = useRef(false);
    const isInCabaneZoneRef = useRef(false);
    const isInSchoolZoneRef = useRef(false);
    const isInLibraryZoneRef = useRef(false);
    const snackbarRef = useRef<HTMLDivElement | null>(null);
    const snackbarCabaneRef = useRef<HTMLDivElement | null>(null);
    const snackbarSchoolRef = useRef<HTMLDivElement | null>(null);
    const snackbarLibraryRef = useRef<HTMLDivElement | null>(null);
    const onOpenPageRef = useRef(onOpenPage);

    // Mettre à jour la référence quand le callback change
    useEffect(() => {
        onOpenPageRef.current = onOpenPage;
    }, [onOpenPage]);

    useEffect(() => {
        if (!mountRef.current) return;

        // Configuration de la scène
        const scene = new THREE.Scene();

        // Brouillard rose clair très prononcé
        scene.fog = new THREE.FogExp2(0xFFB6C1, 0.15); // Rose clair - très dense

        // Configuration de la caméra (near/far optimisés pour réduire le z-fighting)
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.5,  // Near plus élevé = meilleure précision du depth buffer
            500   // Far réduit = moins de calculs
        );
        camera.position.set(0, 1, 10);

        // Configuration du renderer optimisé pour la performance
        const renderer = new THREE.WebGLRenderer({
            antialias: window.devicePixelRatio < 2, // Désactive l'AA sur les écrans haute densité
            powerPreference: 'high-performance',
            stencil: false,  // Désactive le stencil buffer si non utilisé
            depth: true
        });

        // Limiter le pixel ratio pour les performances
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);

        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        mountRef.current.appendChild(renderer.domElement);

        // ============================================
        // SNACKBAR POUR LA ZONE INTERACTIVE
        // ============================================
        const snackbar = document.createElement('div');
        snackbar.style.position = 'absolute';
        snackbar.style.bottom = '30px';
        snackbar.style.left = '50%';
        snackbar.style.transform = 'translateX(-50%) translateY(100px)';
        snackbar.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        snackbar.style.color = '#ffffff';
        snackbar.style.padding = '16px 32px';
        snackbar.style.borderRadius = '12px';
        snackbar.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        snackbar.style.fontSize = '18px';
        snackbar.style.fontWeight = '500';
        snackbar.style.zIndex = '1000';
        snackbar.style.pointerEvents = 'none';
        snackbar.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
        snackbar.style.opacity = '0';
        snackbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        snackbar.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        snackbar.innerHTML = '🏢 Appuyez sur <span style="color: #FFD700; font-weight: bold;">E</span> pour entrer chez Google Company';
        mountRef.current.appendChild(snackbar);
        snackbarRef.current = snackbar;

        // ============================================
        // SNACKBAR POUR LA ZONE "CABANE"
        // ============================================
        const snackbarCabane = document.createElement('div');
        snackbarCabane.style.position = 'absolute';
        snackbarCabane.style.bottom = '30px';
        snackbarCabane.style.left = '50%';
        snackbarCabane.style.transform = 'translateX(-50%) translateY(100px)';
        snackbarCabane.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        snackbarCabane.style.color = '#ffffff';
        snackbarCabane.style.padding = '16px 32px';
        snackbarCabane.style.borderRadius = '12px';
        snackbarCabane.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        snackbarCabane.style.fontSize = '18px';
        snackbarCabane.style.fontWeight = '500';
        snackbarCabane.style.zIndex = '1000';
        snackbarCabane.style.pointerEvents = 'none';
        snackbarCabane.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
        snackbarCabane.style.opacity = '0';
        snackbarCabane.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        snackbarCabane.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        snackbarCabane.innerHTML = '🏠 Appuyez sur <span style="color: #FFD700; font-weight: bold;">E</span> pour entrer dans la Cabane';
        mountRef.current.appendChild(snackbarCabane);
        snackbarCabaneRef.current = snackbarCabane;

        // ============================================
        // SNACKBAR POUR LA ZONE "SCHOOL"
        // ============================================
        const snackbarSchool = document.createElement('div');
        snackbarSchool.style.position = 'absolute';
        snackbarSchool.style.bottom = '30px';
        snackbarSchool.style.left = '50%';
        snackbarSchool.style.transform = 'translateX(-50%) translateY(100px)';
        snackbarSchool.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        snackbarSchool.style.color = '#ffffff';
        snackbarSchool.style.padding = '16px 32px';
        snackbarSchool.style.borderRadius = '12px';
        snackbarSchool.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        snackbarSchool.style.fontSize = '18px';
        snackbarSchool.style.fontWeight = '500';
        snackbarSchool.style.zIndex = '1000';
        snackbarSchool.style.pointerEvents = 'none';
        snackbarSchool.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
        snackbarSchool.style.opacity = '0';
        snackbarSchool.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        snackbarSchool.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        snackbarSchool.innerHTML = '🏫 Appuyez sur <span style="color: #FFD700; font-weight: bold;">E</span> pour entrer à l\'École';
        mountRef.current.appendChild(snackbarSchool);
        snackbarSchoolRef.current = snackbarSchool;

        // ============================================
        // SNACKBAR POUR LA ZONE "LIBRARY"
        // ============================================
        const snackbarLibrary = document.createElement('div');
        snackbarLibrary.style.position = 'absolute';
        snackbarLibrary.style.bottom = '30px';
        snackbarLibrary.style.left = '50%';
        snackbarLibrary.style.transform = 'translateX(-50%) translateY(100px)';
        snackbarLibrary.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
        snackbarLibrary.style.color = '#ffffff';
        snackbarLibrary.style.padding = '16px 32px';
        snackbarLibrary.style.borderRadius = '12px';
        snackbarLibrary.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        snackbarLibrary.style.fontSize = '18px';
        snackbarLibrary.style.fontWeight = '500';
        snackbarLibrary.style.zIndex = '1000';
        snackbarLibrary.style.pointerEvents = 'none';
        snackbarLibrary.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
        snackbarLibrary.style.opacity = '0';
        snackbarLibrary.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        snackbarLibrary.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        snackbarLibrary.innerHTML = '📚 Appuyez sur <span style="color: #FFD700; font-weight: bold;">E</span> pour entrer à la Bibliothèque';
        mountRef.current.appendChild(snackbarLibrary);
        snackbarLibraryRef.current = snackbarLibrary;

        // Fonction pour vérifier si le joueur est dans la zone "Google Company"
        const checkGoogleCompanyZone = (position: THREE.Vector3): boolean => {
            return position.x >= GOOGLE_COMPANY_ZONE.minX &&
                position.x <= GOOGLE_COMPANY_ZONE.maxX &&
                position.z >= GOOGLE_COMPANY_ZONE.minZ &&
                position.z <= GOOGLE_COMPANY_ZONE.maxZ;
        };

        // Fonction pour vérifier si le joueur est dans la zone "Cabane"
        const checkCabaneZone = (position: THREE.Vector3): boolean => {
            return position.x >= CABANE_ZONE.minX &&
                position.x <= CABANE_ZONE.maxX &&
                position.z >= CABANE_ZONE.minZ &&
                position.z <= CABANE_ZONE.maxZ;
        };

        // Fonction pour vérifier si le joueur est dans la zone "School"
        const checkSchoolZone = (position: THREE.Vector3): boolean => {
            return position.x >= SCHOOL_ZONE.minX &&
                position.x <= SCHOOL_ZONE.maxX &&
                position.z >= SCHOOL_ZONE.minZ &&
                position.z <= SCHOOL_ZONE.maxZ;
        };

        // Fonction pour vérifier si le joueur est dans la zone "Library"
        const checkLibraryZone = (position: THREE.Vector3): boolean => {
            return position.x >= LIBRARY_ZONE.minX &&
                position.x <= LIBRARY_ZONE.maxX &&
                position.z >= LIBRARY_ZONE.minZ &&
                position.z <= LIBRARY_ZONE.maxZ;
        };

        // Fonction pour afficher/masquer la snackbar
        const updateSnackbar = (show: boolean) => {
            if (snackbar) {
                if (show) {
                    snackbar.style.transform = 'translateX(-50%) translateY(0)';
                    snackbar.style.opacity = '1';
                } else {
                    snackbar.style.transform = 'translateX(-50%) translateY(100px)';
                    snackbar.style.opacity = '0';
                }
            }
        };

        // Fonction pour afficher/masquer la snackbar Cabane
        const updateSnackbarCabane = (show: boolean) => {
            if (snackbarCabane) {
                if (show) {
                    snackbarCabane.style.transform = 'translateX(-50%) translateY(0)';
                    snackbarCabane.style.opacity = '1';
                } else {
                    snackbarCabane.style.transform = 'translateX(-50%) translateY(100px)';
                    snackbarCabane.style.opacity = '0';
                }
            }
        };

        // Fonction pour afficher/masquer la snackbar School
        const updateSnackbarSchool = (show: boolean) => {
            if (snackbarSchool) {
                if (show) {
                    snackbarSchool.style.transform = 'translateX(-50%) translateY(0)';
                    snackbarSchool.style.opacity = '1';
                } else {
                    snackbarSchool.style.transform = 'translateX(-50%) translateY(100px)';
                    snackbarSchool.style.opacity = '0';
                }
            }
        };

        // Fonction pour afficher/masquer la snackbar Library
        const updateSnackbarLibrary = (show: boolean) => {
            if (snackbarLibrary) {
                if (show) {
                    snackbarLibrary.style.transform = 'translateX(-50%) translateY(0)';
                    snackbarLibrary.style.opacity = '1';
                } else {
                    snackbarLibrary.style.transform = 'translateX(-50%) translateY(100px)';
                    snackbarLibrary.style.opacity = '0';
                }
            }
        };

        // ============================================
        // CRÉATION DU CIEL AVEC DÉGRADÉ
        // ============================================
        const createSky = () => {
            // Segments réduits (16 au lieu de 32) - suffisant pour un dôme de ciel
            const skyGeometry = new THREE.SphereGeometry(400, 16, 12);

            // Shader pour un dégradé de ciel réaliste
            const skyMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    topColor: { value: new THREE.Color(0xFFB6C1) },    // Rose clair (haut du ciel)
                    bottomColor: { value: new THREE.Color(0xFFD1DC) }, // Rose pâle (horizon)
                    sunColor: { value: new THREE.Color(0xFFFFFF) },    // Blanc pour le halo soleil
                    sunDirection: { value: new THREE.Vector3(0.5, 0.8, 0.3).normalize() },
                    offset: { value: 20 },
                    exponent: { value: 0.6 }
                },
                vertexShader: `
                    varying vec3 vWorldPosition;
                    void main() {
                        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                        vWorldPosition = worldPosition.xyz;
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform vec3 topColor;
                    uniform vec3 bottomColor;
                    uniform vec3 sunColor;
                    uniform vec3 sunDirection;
                    uniform float offset;
                    uniform float exponent;
                    varying vec3 vWorldPosition;
                    
                    void main() {
                        float h = normalize(vWorldPosition + offset).y;
                        float t = max(pow(max(h, 0.0), exponent), 0.0);
                        vec3 skyColor = mix(bottomColor, topColor, t);
                        
                        // Ajouter un halo autour du soleil
                        vec3 viewDirection = normalize(vWorldPosition);
                        float sunDot = max(dot(viewDirection, sunDirection), 0.0);
                        float sunHalo = pow(sunDot, 128.0) * 1.5;
                        float sunGlow = pow(sunDot, 8.0) * 0.3;
                        
                        skyColor += sunColor * (sunHalo + sunGlow);
                        
                        gl_FragColor = vec4(skyColor, 1.0);
                    }
                `,
                side: THREE.BackSide,
                depthWrite: false
            });

            const sky = new THREE.Mesh(skyGeometry, skyMaterial);
            return sky;
        };

        const sky = createSky();
        scene.add(sky);

        // ============================================
        // CRÉATION DU SOLEIL
        // ============================================
        const sunPosition = new THREE.Vector3(200, 300, 150);

        // Sphère du soleil (émissive) - segments réduits
        const sunGeometry = new THREE.SphereGeometry(15, 12, 8);
        const sunMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff80
        });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        sun.position.copy(sunPosition);
        sun.frustumCulled = true; // Activer le culling
        scene.add(sun);

        // Halo lumineux autour du soleil (sprite)
        const createSunGlow = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            const ctx = canvas.getContext('2d')!;

            const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
            gradient.addColorStop(0, 'rgba(255, 255, 200, 1)');
            gradient.addColorStop(0.1, 'rgba(255, 255, 150, 0.8)');
            gradient.addColorStop(0.4, 'rgba(255, 200, 100, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 150, 50, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 256, 256);

            const texture = new THREE.CanvasTexture(canvas);
            const spriteMaterial = new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                blending: THREE.AdditiveBlending
            });

            const sprite = new THREE.Sprite(spriteMaterial);
            sprite.scale.set(80, 80, 1);
            return sprite;
        };

        const sunGlow = createSunGlow();
        sunGlow.position.copy(sunPosition);
        scene.add(sunGlow);

        const hemisphereLight = new THREE.HemisphereLight(
            0x87CEEB,
            0x3d5c47,
            0.4
        );
        scene.add(hemisphereLight);
        const sunLight = new THREE.DirectionalLight(0xfffaed, 1.5);
        sunLight.position.copy(sunPosition);
        scene.add(sunLight);

        const ambientLight = new THREE.AmbientLight(0x404050, 0.3);
        scene.add(ambientLight);

        const keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false,
            KeyE: false
        };

        const moveSpeed = 0.05;
        const rotationSpeed = 0.05;

        // ============================================
        // SYSTÈME DE COLLISION
        // ============================================
        const buildingColliders: THREE.Box3[] = [];
        const playerRadius = 0.1; // Rayon de la hitbox du joueur

        renderer.domElement.tabIndex = 0;
        renderer.domElement.style.outline = 'none';
        renderer.domElement.focus();

        let player: THREE.Object3D | null = null;
        let mixer: THREE.AnimationMixer | null = null;
        let idleAction: THREE.AnimationAction | null = null;
        let runAction: THREE.AnimationAction | null = null;
        let currentAction: THREE.AnimationAction | null = null;

        const cameraOffset = new THREE.Vector3(0, 1, 2);
        const cameraLookOffset = new THREE.Vector3(0, 1, 0);
        const clock = new THREE.Clock();

        const loader = new GLTFLoader();

        // Charger la map
        loader.load(
            '/map.glb',
            (gltf) => {
                const mapMesh = gltf.scene;
                mapMesh.position.set(0, 0, 0);

                mapMesh.traverse((child) => {
                    if ((child as THREE.Mesh).isMesh) {
                        const mesh = child as THREE.Mesh;

                        mesh.frustumCulled = true;
                        mesh.matrixAutoUpdate = false;
                        mesh.updateMatrix();

                        if (mesh.geometry) {
                            mesh.geometry.computeBoundingBox();
                            mesh.geometry.computeBoundingSphere();

                            // Créer une bounding box pour les objets au-dessus de 0.1 en Y
                            const boundingBox = new THREE.Box3().setFromObject(mesh);

                            // Vérifier si l'objet est au-dessus de 0.1 en Y (bâtiment/obstacle)
                            if (boundingBox.min.y > 0.1 || boundingBox.max.y > 0.5) {
                                buildingColliders.push(boundingBox);
                            }
                        }

                        if (mesh.material) {
                            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                            materials.forEach((mat) => {
                                mat.transparent = false;
                                mat.opacity = 1;
                                mat.alphaTest = 0;
                                mat.depthWrite = true;
                                mat.precision = 'lowp';
                                mat.needsUpdate = true;
                            });
                        }
                    }
                });

                scene.add(mapMesh);
                console.log('Map chargée avec succès!');
                console.log('Nombre de colliders de bâtiments:', buildingColliders.length);
            },
            (progress) => {
                console.log('Map - Chargement:', (progress.loaded / progress.total * 100).toFixed(0) + '%');
            },
            (error) => {
                console.error('Erreur lors du chargement de la map:', error);
            }
        );

        loader.load(
            '/player2.glb',
            (gltf) => {
                player = gltf.scene;
                playerRef.current = player;

                if (initialPosition) {
                    player.position.set(initialPosition.x, initialPosition.y, initialPosition.z);
                    player.rotation.y = initialPosition.rotationY;
                } else {
                    player.position.set(0, 0, 0);
                }
                player.scale.set(0.45, 0.45, 0.45);

                gltf.scene.children.forEach((child) => {
                    child.rotation.z = -Math.PI;
                });

                player.traverse((child) => {
                    if (child.name.toLowerCase().includes('root') || child.name.toLowerCase().includes('armature')) {
                        child.rotation.x = Math.PI / 2;
                        console.log('Rootbone trouvé et rotation appliquée:', child.name);
                    }
                });

                player.traverse((child) => {
                    if ((child as THREE.Mesh).isMesh) {
                        const mesh = child as THREE.Mesh;

                        if (mesh.material) {
                            const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                            materials.forEach((mat) => {
                                mat.transparent = false;
                                mat.opacity = 1;
                                mat.alphaTest = 0;
                                mat.depthWrite = true;
                                mat.needsUpdate = true;
                            });
                        }
                    }
                });

                mixer = new THREE.AnimationMixer(player);

                gltf.animations.forEach((clip) => {
                    const clipName = clip.name.toLowerCase();

                    if (clipName.includes('idle')) {
                        idleAction = mixer!.clipAction(clip);
                        idleAction.setLoop(THREE.LoopRepeat, Infinity);
                        console.log('Animation IDLE trouvée:', clip.name);
                    }

                    if (clipName.includes('run')) {
                        runAction = mixer!.clipAction(clip);
                        runAction.setLoop(THREE.LoopRepeat, Infinity);
                        console.log('Animation RUN trouvée:', clip.name);
                    }
                });

                if (!idleAction && gltf.animations.length > 0) {
                    idleAction = mixer!.clipAction(gltf.animations[0]);
                    idleAction.setLoop(THREE.LoopRepeat, Infinity);
                    console.log('Animation par défaut (idle):', gltf.animations[0].name);
                }

                if (!runAction && gltf.animations.length > 1) {
                    runAction = mixer!.clipAction(gltf.animations[1]);
                    runAction.setLoop(THREE.LoopRepeat, Infinity);
                    console.log('Animation par défaut (run):', gltf.animations[1].name);
                }

                if (idleAction) {
                    idleAction.play();
                    currentAction = idleAction;
                }

                scene.add(player);
                console.log('Player chargé avec succès!');
            },
            (progress) => {
                console.log('Player - Chargement:', (progress.loaded / progress.total * 100).toFixed(0) + '%');
            },
            (error) => {
                console.error('Erreur lors du chargement du player:', error);
            }
        );

        const switchAnimation = (toAction: THREE.AnimationAction | null) => {
            if (!toAction || toAction === currentAction) return;

            if (currentAction) {
                currentAction.fadeOut(0.2);
            }

            toAction.reset();
            toAction.fadeIn(0.2);
            toAction.play();
            currentAction = toAction;
        };

        // Fonction pour vérifier les collisions avec les bâtiments
        const checkCollision = (newPosition: THREE.Vector3): boolean => {
            // Créer une bounding box pour le joueur à la nouvelle position
            const playerBox = new THREE.Box3(
                new THREE.Vector3(
                    newPosition.x - playerRadius,
                    newPosition.y,
                    newPosition.z - playerRadius
                ),
                new THREE.Vector3(
                    newPosition.x + playerRadius,
                    newPosition.y + 1.5, // Hauteur approximative du joueur
                    newPosition.z + playerRadius
                )
            );

            // Vérifier les collisions avec tous les bâtiments
            for (const buildingBox of buildingColliders) {
                if (playerBox.intersectsBox(buildingBox)) {
                    return true; // Collision détectée
                }
            }

            return false; // Pas de collision
        };

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.code in keys) {
                event.preventDefault();
                keys[event.code as keyof typeof keys] = true;
            }

            // Gestion de la touche E pour ouvrir la page
            if (event.code === 'KeyE' && onOpenPageRef.current && player) {
                const currentPosition: PlayerPosition = {
                    x: player.position.x,
                    y: player.position.y,
                    z: player.position.z,
                    rotationY: player.rotation.y
                };

                if (isInZoneRef.current) {
                    console.log('Touche E pressée dans la zone Google Company!');
                    onOpenPageRef.current(currentPosition, 'google');
                } else if (isInCabaneZoneRef.current) {
                    console.log('Touche E pressée dans la zone Cabane!');
                    onOpenPageRef.current(currentPosition, 'cabane');
                } else if (isInSchoolZoneRef.current) {
                    console.log('Touche E pressée dans la zone School!');
                    onOpenPageRef.current(currentPosition, 'school');
                } else if (isInLibraryZoneRef.current) {
                    console.log('Touche E pressée dans la zone Library!');
                    onOpenPageRef.current(currentPosition, 'library');
                }
            }
        };

        const onKeyUp = (event: KeyboardEvent) => {
            if (event.code in keys) {
                event.preventDefault();
                keys[event.code as keyof typeof keys] = false;
            }
        };

        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        renderer.domElement.addEventListener('keydown', onKeyDown);
        renderer.domElement.addEventListener('keyup', onKeyUp);

        renderer.domElement.addEventListener('click', () => {
            renderer.domElement.focus();
        });

        const animate = () => {
            requestAnimationFrame(animate);

            const delta = clock.getDelta();

            if (mixer) {
                mixer.update(delta);
            }

            if (player) {
                if (isHome) {
                    const time = clock.getElapsedTime() * 0.1;
                    const radius = 3;
                    const height = 3;

                    const targetPos = new THREE.Vector3(
                        Math.sin(time) * radius,
                        height,
                        Math.cos(time) * radius
                    );

                    camera.position.lerp(targetPos, 0.05);
                    camera.lookAt(30, 0, 30);

                    if (idleAction) {
                        switchAnimation(idleAction);
                    }
                } else {
                    const isMoving = keys.ArrowUp || keys.ArrowDown;

                    if (isMoving && runAction) {
                        switchAnimation(runAction);
                    } else if (!isMoving && idleAction) {
                        switchAnimation(idleAction);
                    }

                    if (keys.ArrowUp) {
                        const newPosition = player.position.clone();
                        newPosition.x -= Math.sin(player.rotation.y) * moveSpeed;
                        newPosition.z -= Math.cos(player.rotation.y) * moveSpeed;

                        // Vérifier la collision avant de déplacer
                        if (!checkCollision(newPosition)) {
                            player.position.copy(newPosition);
                        } else {
                            // Essayer de glisser le long des murs (sliding)
                            const slideX = player.position.clone();
                            slideX.x -= Math.sin(player.rotation.y) * moveSpeed;

                            const slideZ = player.position.clone();
                            slideZ.z -= Math.cos(player.rotation.y) * moveSpeed;

                            if (!checkCollision(slideX)) {
                                player.position.x = slideX.x;
                            } else if (!checkCollision(slideZ)) {
                                player.position.z = slideZ.z;
                            }
                        }
                    }
                    if (keys.ArrowDown) {
                        const newPosition = player.position.clone();
                        newPosition.x += Math.sin(player.rotation.y) * moveSpeed;
                        newPosition.z += Math.cos(player.rotation.y) * moveSpeed;

                        // Vérifier la collision avant de déplacer
                        if (!checkCollision(newPosition)) {
                            player.position.copy(newPosition);
                        } else {
                            // Essayer de glisser le long des murs (sliding)
                            const slideX = player.position.clone();
                            slideX.x += Math.sin(player.rotation.y) * moveSpeed;

                            const slideZ = player.position.clone();
                            slideZ.z += Math.cos(player.rotation.y) * moveSpeed;

                            if (!checkCollision(slideX)) {
                                player.position.x = slideX.x;
                            } else if (!checkCollision(slideZ)) {
                                player.position.z = slideZ.z;
                            }
                        }
                    }

                    if (keys.ArrowLeft) {
                        player.rotation.y += rotationSpeed;
                    }
                    if (keys.ArrowRight) {
                        player.rotation.y -= rotationSpeed;
                    }

                    const rotatedOffset = cameraOffset.clone();
                    rotatedOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), player.rotation.y);

                    // Position cible de la caméra
                    const targetCameraPos = player.position.clone().add(rotatedOffset);

                    // Interpolation douce de la caméra (lerp)
                    camera.position.lerp(targetCameraPos, 0.1);

                    // La caméra regarde le player
                    const lookAtTarget = player.position.clone().add(cameraLookOffset);
                    camera.lookAt(lookAtTarget);

                    // Vérifier si le joueur est dans la zone "Google Company"
                    const inZone = checkGoogleCompanyZone(player.position);
                    // Toujours mettre à jour la snackbar pour garantir la synchronisation
                    updateSnackbar(inZone);
                    if (inZone !== isInZoneRef.current) {
                        isInZoneRef.current = inZone;
                        console.log('Zone Google Company:', inZone ? 'ENTRÉ' : 'SORTI');
                    }

                    // Vérifier si le joueur est dans la zone "Cabane"
                    const inCabaneZone = checkCabaneZone(player.position);
                    // Toujours mettre à jour la snackbar pour garantir la synchronisation
                    updateSnackbarCabane(inCabaneZone);
                    if (inCabaneZone !== isInCabaneZoneRef.current) {
                        isInCabaneZoneRef.current = inCabaneZone;
                        console.log('Zone Cabane:', inCabaneZone ? 'ENTRÉ' : 'SORTI');
                    }

                    // Vérifier si le joueur est dans la zone "School"
                    const inSchoolZone = checkSchoolZone(player.position);
                    // Toujours mettre à jour la snackbar pour garantir la synchronisation
                    updateSnackbarSchool(inSchoolZone);
                    if (inSchoolZone !== isInSchoolZoneRef.current) {
                        isInSchoolZoneRef.current = inSchoolZone;
                        console.log('Zone School:', inSchoolZone ? 'ENTRÉ' : 'SORTI');
                    }

                    // Vérifier si le joueur est dans la zone "Library"
                    const inLibraryZone = checkLibraryZone(player.position);
                    // Toujours mettre à jour la snackbar pour garantir la synchronisation
                    updateSnackbarLibrary(inLibraryZone);
                    if (inLibraryZone !== isInLibraryZoneRef.current) {
                        isInLibraryZoneRef.current = inLibraryZone;
                        console.log('Zone Library:', inLibraryZone ? 'ENTRÉ' : 'SORTI');
                    }
                }
            }

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);
            renderer.domElement.removeEventListener('keydown', onKeyDown);
            renderer.domElement.removeEventListener('keyup', onKeyUp);

            if (mountRef.current) {
                if (renderer.domElement) {
                    mountRef.current.removeChild(renderer.domElement);
                }
                if (snackbar) {
                    mountRef.current.removeChild(snackbar);
                }
                if (snackbarCabane) {
                    mountRef.current.removeChild(snackbarCabane);
                }
                if (snackbarSchool) {
                    mountRef.current.removeChild(snackbarSchool);
                }
                if (snackbarLibrary) {
                    mountRef.current.removeChild(snackbarLibrary);
                }
            }

            renderer.dispose();
        };
    }, [initialPosition]);

    return <div ref={mountRef} style={{ width: '100%', height: '100vh', overflow: 'hidden' }} />;
};

export default ThreeScene;
export type { PlayerPosition, ZoneType };
