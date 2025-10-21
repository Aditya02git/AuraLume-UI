import React, { useEffect, useRef } from 'react';
import './WaveBackground.css';
import { createNoise3D } from 'simplex-noise';

const WaveBackground = ({ 
  children, 
  colors = [330, 345, 360, 375, 390],
  className= "",
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const ntRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w, h;

    // Perlin/Simplex noise generator
    const noise3D = createNoise3D();
    const noise = {
      simplex3: (x, y, z) => noise3D(x, y, z)
    };

    const resizer = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      ctx.filter = 'blur(30px)';
    };

    resizer();
    window.addEventListener('resize', resizer);

    const drawWave = (n) => {
      ntRef.current += 0.002;
      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = 30;
        const colorIndex = i % colors.length;
        ctx.strokeStyle = `hsla(${colors[colorIndex]}, 100%, 60%, 1)`;
        for (let x = 0; x < w; x += 30) {
          const y = noise.simplex3(x / 800, 0.3 * i, ntRef.current) * 100;
          ctx.lineTo(x, y + h / 2);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      ctx.fillStyle = 'rgba(0, 12, 12, 1)';
      ctx.fillRect(0, 0, w, h);
      drawWave(colors.length);
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors]);

  return (
    <div className={`wave-background-container ${className}`}>
      <canvas ref={canvasRef} className="wave-canvas" />
      <div className="wave-content">
        {children}
      </div>
    </div>
  );
};

export default WaveBackground;