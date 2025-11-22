import React, { useEffect, useRef } from 'react';

const MatrixRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const fontSize = 15;
        const columns = Math.floor(width / fontSize);
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

        const draw = () => {
            // Low opacity black fill for trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);

            // Bright green text
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            drops.forEach((y, index) => {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));

                ctx.fillText(text, index * fontSize, y * fontSize);

                if (y * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[index] = 0;
                }

                drops[index]++;
            });
        };

        const interval = setInterval(draw, 35);

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full z-0 opacity-80 pointer-events-none"
        />
    );
};

export default MatrixRain;
