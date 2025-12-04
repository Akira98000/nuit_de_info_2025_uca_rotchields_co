import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const ThreeScene = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Configuration de la scène
        const scene = new THREE.Scene();
        
        // Brouillard orangeâtre
        scene.fog = new THREE.FogExp2(0xE8A87C, 0.008);

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
        // CRÉATION DU CIEL AVEC DÉGRADÉ
        // ============================================
        const createSky = () => {
            // Segments réduits (16 au lieu de 32) - suffisant pour un dôme de ciel
            const skyGeometry = new THREE.SphereGeometry(400, 16, 12);
            
            // Shader pour un dégradé de ciel réaliste
            const skyMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    topColor: { value: new THREE.Color(0x0077ff) },    // Bleu ciel profond
                    bottomColor: { value: new THREE.Color(0x89CFF0) }, // Bleu clair horizon
                    sunColor: { value: new THREE.Color(0xffffcc) },    // Couleur du halo soleil
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
            ArrowRight: false
        };

        const moveSpeed = 0.1;
        const rotationSpeed = 0.05;
        
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
            },
            (progress) => {
                console.log('Map - Chargement:', (progress.loaded / progress.total * 100).toFixed(0) + '%');
            },
            (error) => {
                console.error('Erreur lors du chargement de la map:', error);
            }
        );
        
        loader.load(
            '/player.glb',
            (gltf) => {
                player = gltf.scene;
                player.position.set(0, 0, 0);
                player.scale.set(0.1, 0.1, 0.1);
                
                gltf.scene.children.forEach((child) => {
                    child.rotation.z = -Math.PI; // 2x Math.PI / 2 = 180°
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
                    
                    if (clipName.includes('idle') || clipName.includes('stand') || clipName.includes('breath')) {
                        idleAction = mixer!.clipAction(clip);
                        idleAction.setLoop(THREE.LoopRepeat, Infinity);
                        console.log('Animation IDLE trouvée:', clip.name);
                    }
                    
                    if (clipName.includes('run') || clipName.includes('walk') || clipName.includes('jog')) {
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
                
                const axesHelper = new THREE.AxesHelper(5);
                player.add(axesHelper);
                
                const forwardDir = new THREE.Vector3(0, 0, -1);
                const arrowHelper = new THREE.ArrowHelper(forwardDir, new THREE.Vector3(0, 1, 0), 3, 0xff00ff, 0.5, 0.3);
                player.add(arrowHelper);
                
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

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.code in keys) {
                event.preventDefault();
                keys[event.code as keyof typeof keys] = true;
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
                const isMoving = keys.ArrowUp || keys.ArrowDown;
                
                if (isMoving && runAction) {
                    switchAnimation(runAction);
                } else if (!isMoving && idleAction) {
                    switchAnimation(idleAction);
                }
                
                if (keys.ArrowUp) {
                    player.position.x -= Math.sin(player.rotation.y) * moveSpeed;
                    player.position.z -= Math.cos(player.rotation.y) * moveSpeed;
                }
                if (keys.ArrowDown) {
                    player.position.x += Math.sin(player.rotation.y) * moveSpeed;
                    player.position.z += Math.cos(player.rotation.y) * moveSpeed;
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

            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }

            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100vh', overflow: 'hidden' }} />;
};

export default ThreeScene;
