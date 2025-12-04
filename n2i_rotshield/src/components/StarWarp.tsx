import { useEffect, useRef } from 'react';

interface StarWarpProps {
    isActive: boolean;
}

const StarWarp = ({ isActive }: StarWarpProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let stars: { x: number; y: number; z: number; pz: number }[] = [];
        let speed = 0;
        const numStars = 800;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const initStars = () => {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width - canvas.width / 2,
                    y: Math.random() * canvas.height - canvas.height / 2,
                    z: Math.random() * canvas.width,
                    pz: Math.random() * canvas.width, // Previous Z for trail effect
                });
            }
        };

        const update = () => {
            // Accelerate if active
            if (isActive) {
                speed += 0.5; // Acceleration
            } else {
                speed = 2; // Base speed
            }

            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            for (let i = 0; i < numStars; i++) {
                const star = stars[i];

                star.z -= speed;

                if (star.z <= 0) {
                    star.x = Math.random() * canvas.width - canvas.width / 2;
                    star.y = Math.random() * canvas.height - canvas.height / 2;
                    star.z = canvas.width;
                    star.pz = canvas.width;
                }

                const x = (star.x / star.z) * canvas.width + cx;
                const y = (star.y / star.z) * canvas.height + cy;

                const px = (star.x / star.pz) * canvas.width + cx;
                const py = (star.y / star.pz) * canvas.height + cy;

                star.pz = star.z;

                if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
                    const size = (1 - star.z / canvas.width) * 3;
                    const shade = Math.floor((1 - star.z / canvas.width) * 255);

                    ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
                    ctx.beginPath();
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();

                    // Draw trail if moving fast
                    if (speed > 10) {
                        ctx.strokeStyle = `rgb(${shade}, ${shade}, ${shade})`;
                        ctx.lineWidth = size;
                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(px, py);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(update);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        initStars();
        update();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isActive]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: isActive ? 200 : -2, // Bring to front when warping
                pointerEvents: 'none',
                opacity: isActive ? 1 : 0, // Hide when not active (or keep as background if desired)
                transition: 'opacity 0.5s ease',
            }}
        />
    );
};

export default StarWarp;
