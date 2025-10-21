import React, { useEffect, useRef } from 'react';
import './NoiseBackground.css';

// Simple Perlin noise implementation
class SimplexNoise {
  constructor(seed = 0) {
    this.grad3 = [
      [1, 1, 0], [-1, 1, 0], [1, -1, 0], [-1, -1, 0],
      [1, 0, 1], [-1, 0, 1], [1, 0, -1], [-1, 0, -1],
      [0, 1, 1], [0, -1, 1], [0, 1, -1], [0, -1, -1]
    ];
    this.p = [];
    // Use seed for consistent pattern
    for (let i = 0; i < 256; i++) {
      this.p[i] = i;
    }
    // Seeded shuffle
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(((seed + i) * 9301 + 49297) % 233280 / 233280 * (i + 1));
      [this.p[i], this.p[j]] = [this.p[j], this.p[i]];
    }
    this.perm = [];
    for (let i = 0; i < 512; i++) {
      this.perm[i] = this.p[i & 255];
    }
  }

  dot(g, x, y, z) {
    return g[0] * x + g[1] * y + g[2] * z;
  }

  simplex3(xin, yin, zin) {
    const F3 = 1.0 / 3.0;
    const G3 = 1.0 / 6.0;
    
    let s = (xin + yin + zin) * F3;
    let i = Math.floor(xin + s);
    let j = Math.floor(yin + s);
    let k = Math.floor(zin + s);
    
    let t = (i + j + k) * G3;
    let X0 = i - t;
    let Y0 = j - t;
    let Z0 = k - t;
    let x0 = xin - X0;
    let y0 = yin - Y0;
    let z0 = zin - Z0;
    
    let i1, j1, k1, i2, j2, k2;
    if (x0 >= y0) {
      if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
      else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
      else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
    } else {
      if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
      else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
      else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    }
    
    let x1 = x0 - i1 + G3;
    let y1 = y0 - j1 + G3;
    let z1 = z0 - k1 + G3;
    let x2 = x0 - i2 + 2.0 * G3;
    let y2 = y0 - j2 + 2.0 * G3;
    let z2 = z0 - k2 + 2.0 * G3;
    let x3 = x0 - 1.0 + 3.0 * G3;
    let y3 = y0 - 1.0 + 3.0 * G3;
    let z3 = z0 - 1.0 + 3.0 * G3;
    
    let ii = i & 255;
    let jj = j & 255;
    let kk = k & 255;
    
    let gi0 = this.perm[ii + this.perm[jj + this.perm[kk]]] % 12;
    let gi1 = this.perm[ii + i1 + this.perm[jj + j1 + this.perm[kk + k1]]] % 12;
    let gi2 = this.perm[ii + i2 + this.perm[jj + j2 + this.perm[kk + k2]]] % 12;
    let gi3 = this.perm[ii + 1 + this.perm[jj + 1 + this.perm[kk + 1]]] % 12;
    
    let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
    let n0 = t0 < 0 ? 0.0 : Math.pow(t0, 4) * this.dot(this.grad3[gi0], x0, y0, z0);
    
    let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
    let n1 = t1 < 0 ? 0.0 : Math.pow(t1, 4) * this.dot(this.grad3[gi1], x1, y1, z1);
    
    let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
    let n2 = t2 < 0 ? 0.0 : Math.pow(t2, 4) * this.dot(this.grad3[gi2], x2, y2, z2);
    
    let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
    let n3 = t3 < 0 ? 0.0 : Math.pow(t3, 4) * this.dot(this.grad3[gi3], x3, y3, z3);
    
    return 32.0 * (n0 + n1 + n2 + n3);
  }
}

const NoiseBackground = ({ 
  children,
  speed = 0.01,
  scaleX = 100,
  scaleY = 100,
  size = 20,
  radius = 0,
  hueBase = 258,
  hueRange = 10,
  saturationBase = 68,
  saturationRange = 0,
  lightnessBase = 58,
  lightnessRange = 0,
  backgroundColor = 'hsl(258, 62%, 7%)',
  interactiveColor = 'hsl(180, 80%, 70%)',
  interactiveRadius = 150,
  interactiveIntensity = 1.5,
  className= "",
  seed = 10000
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const noise = new SimplexNoise(seed);
    
    let field = [];
    let columns = 0;
    let rows = 0;
    let noiseZ = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      columns = Math.floor(canvas.width / size) + 1;
      rows = Math.floor(canvas.height / size) + 1;
      initField();
    };

    const initField = () => {
      field = new Array(columns);
      for (let x = 0; x < columns; x++) {
        field[x] = new Array(rows);
        for (let y = 0; y < rows; y++) {
          field[x][y] = [0, 0];
        }
      }
    };

    const calculateField = () => {
      for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
          let angle = noise.simplex3(x / scaleX, y / scaleY, noiseZ) * 2;
          field[x][y][0] = angle;
        }
      }
    };

    const drawParticles = () => {
      for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
          let angle = field[x][y][0];
          const posX = x * size;
          const posY = y * size;

          // Calculate distance from mouse
          const dx = posX - mouseRef.current.x;
          const dy = posY - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Interactive effect
          let finalRadius = Math.abs(angle + radius / 10);
          let finalHue = hueBase + angle * hueRange;
          let finalSat = saturationBase + angle * saturationRange;
          let finalLight = lightnessBase + angle * lightnessRange;

          if (distance < interactiveRadius) {
            const influence = 1 - (distance / interactiveRadius);
            finalRadius *= (1 + influence * interactiveIntensity);
            
            // Parse interactive color
            const colorMatch = interactiveColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
            if (colorMatch) {
              const [, interHue, interSat, interLight] = colorMatch.map(Number);
              finalHue = finalHue * (1 - influence) + interHue * influence;
              finalSat = finalSat * (1 - influence) + interSat * influence;
              finalLight = finalLight * (1 - influence) + interLight * influence;
            }
          }

          ctx.save();
          ctx.translate(posX, posY);
          ctx.beginPath();
          ctx.arc(0, 0, finalRadius, 0, 2 * Math.PI);
          ctx.fillStyle = `hsl(${finalHue}, ${finalSat}%, ${finalLight}%)`;
          ctx.fill();
          ctx.restore();
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawParticles();
      animationRef.current = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resize();
    calculateField();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, scaleX, scaleY, size, radius, hueBase, hueRange, saturationBase, saturationRange, lightnessBase, lightnessRange, interactiveColor, interactiveRadius, interactiveIntensity, seed]);

  return (
    <div className={`noise-background-container ${className}`}>
      <canvas 
        ref={canvasRef} 
        className="noise-background-canvas"
        style={{ background: backgroundColor }}
      />
      <div className="noise-background-content">
        {children}
      </div>
    </div>
  );
};

export default NoiseBackground;