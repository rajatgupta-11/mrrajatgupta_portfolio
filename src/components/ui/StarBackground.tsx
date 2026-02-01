import React, { useEffect, useRef } from 'react';

export const StarBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const getIsDark = () => document.documentElement.classList.contains("dark");
        let isDark = getIsDark();
        const observer = new MutationObserver(() => {
            isDark = getIsDark();
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize);
        resize();

        // Star properties
        const stars: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];
        const starCount = 150; // Adjust for density

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2,
                speed: Math.random() * 0.2 + 0.1,
                opacity: Math.random(),
            });
        }

        // Animation Loop
        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Keep any "glow" background only in dark mode.
            if (isDark) {
                const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width);
                gradient.addColorStop(0, "rgba(20, 30, 50, 0.30)");
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, width, height);
            }

            stars.forEach((star) => {
                // Update position
                star.y -= star.speed;
                if (star.y < 0) {
                    star.y = height;
                    star.x = Math.random() * width;
                }

                // Draw Star
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                const baseOpacity = isDark ? 0.9 : 0.22;
                const starColor = isDark ? "255, 255, 255" : "0, 0, 0";
                ctx.fillStyle = `rgba(${starColor}, ${star.opacity * baseOpacity})`;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            observer.disconnect();
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ background: 'transparent' }}
        />
    );
};
