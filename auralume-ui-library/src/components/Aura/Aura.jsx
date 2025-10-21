import React, { useEffect, useRef } from 'react';

const Aura = ({ width = 200, height = 200, className = '' }) => {
  const svgRef = useRef(null);
  const animationRef = useRef(null);
  const pathsRef = useRef([]);
  const colorTimeRef = useRef(0);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const centerX = width / 2;
    const centerY = height / 2;
    const baseRadius = Math.min(width, height) * 0.3;

    // Enhanced color palette with more vibrant transitions
    const colorSets = [
      ['#ff006e', '#8338ec', '#3a86ff'], // Pink to Purple to Blue
      ['#ff5400', '#ffbd00', '#06ffa5'], // Orange to Yellow to Green
      ['#f72585', '#4cc9f0', '#7209b7'], // Magenta to Cyan to Purple
      ['#ff9500', '#ff0054', '#0077ff'], // Orange to Red to Blue
      ['#00f5ff', '#8b5cf6', '#f59e0b'], // Cyan to Violet to Amber
      ['#ec4899', '#10b981', '#3b82f6']  // Pink to Emerald to Blue
    ];

    class Path {
      constructor(options) {
        this.pointNum = options.pointNum;
        this.radius = options.radius;
        this.cx = options.cx;
        this.cy = options.cy;
        this.parent = options.parent;
        this.points = options.points || [];
        this.pathIndex = options.pathIndex;
        this.tick = 0;
        this.animationSpeed = options.animationSpeed || 1;
        this.colorOffset = options.colorOffset || 0;
        
        this.init();
      }
      
      init() {
        if (this.points.length === 0) {
          this.points = Array.from({ length: this.pointNum }).map((p, i) => ({
            x: Math.cos((i * 360 / this.pointNum - 90) * Math.PI / 180),
            y: Math.sin((i * 360 / this.pointNum - 90) * Math.PI / 180),
            offs: Math.floor(Math.random() * (i % 18) * Math.PI),
          }));
        } else {
          this.points = this.points.map((p, i) => ({
            x: p.x,
            y: p.y,
            offs: p.offs + ((i + this.pathIndex * 25) / 180 * Math.PI),
          }));
        }
        
        this.g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        this.parent.appendChild(this.g);
      }

      // Dynamic color generation based on time and path index
      getAnimatedColors(time) {
        const colorSetIndex = Math.floor((time + this.colorOffset) / 200) % colorSets.length;
        const nextColorSetIndex = (colorSetIndex + 1) % colorSets.length;
        const progress = ((time + this.colorOffset) % 200) / 200;
        
        const currentSet = colorSets[colorSetIndex];
        const nextSet = colorSets[nextColorSetIndex];
        
        // Interpolate between color sets
        const interpolatedColors = currentSet.map((color, i) => {
          return this.interpolateColor(color, nextSet[i], progress);
        });
        
        return interpolatedColors;
      }

      // Color interpolation function
      interpolateColor(color1, color2, factor) {
        const hex1 = color1.replace('#', '');
        const hex2 = color2.replace('#', '');
        
        const r1 = parseInt(hex1.substr(0, 2), 16);
        const g1 = parseInt(hex1.substr(2, 2), 16);
        const b1 = parseInt(hex1.substr(4, 2), 16);
        
        const r2 = parseInt(hex2.substr(0, 2), 16);
        const g2 = parseInt(hex2.substr(2, 2), 16);
        const b2 = parseInt(hex2.substr(4, 2), 16);
        
        const r = Math.round(r1 + (r2 - r1) * factor);
        const g = Math.round(g1 + (g2 - g1) * factor);
        const b = Math.round(b1 + (b2 - b1) * factor);
        
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      }
      
      getPath(points, colors) {
        let curve = points.reduce((acc, p, i, a) => {
          if (i === 0) {
            acc += `M ${(p.x + a[1].x) / 2},${(p.y + a[1].y) / 2}`;
          }
          if (i > 0 && i !== a.length - 1) {
            acc += ` Q ${p.x},${p.y} ${(p.x + a[i + 1].x) / 2},${(p.y + a[i + 1].y) / 2}`;
          }
          if (i === a.length - 1) {
            acc += ` Q ${p.x},${p.y} ${(p.x + a[0].x) / 2},${(p.y + a[0].y) / 2}`;
          }
          return acc;
        }, '');
        curve += ` Q ${points[0].x},${points[0].y} ${(points[0].x + points[1].x) / 2},${(points[0].y + points[1].y) / 2}`;
        
        // Dynamic opacity based on path index and time
        const pulseEffect = 0.3 + 0.7 * (Math.sin(colorTimeRef.current / 60 + this.pathIndex) + 1) / 2;
        const opacity = Math.max(0.2, (1 - this.pathIndex * 0.15) * pulseEffect);
        
        return `<path 
          class="aura-path aura-path-${this.pathIndex}" 
          filter="url(#aura-blur-${this.pathIndex})" 
          stroke="url(#aura-gradient-${this.pathIndex})" 
          stroke-width="${Math.max(1, 4 - this.pathIndex * 0.6)}" 
          stroke-opacity="${opacity}"
          fill="none" 
          d="${curve} Z"
        />`;
      }
      
      animate(globalTime) {
        this.tick += this.animationSpeed;
        if (this.tick >= 360) this.tick = 0;
        
        const drawnPoints = this.points.map((p, i) => {
          const oscillation = 6 + 4 * Math.sin(this.tick * 2 / 180 * Math.PI + p.offs);
          const radiusMultiplier = 100 + oscillation + 10 * Math.sin(globalTime / 100 + this.pathIndex);
          return {
            x: p.x * this.radius * radiusMultiplier / 100 + this.cx,
            y: p.y * this.radius * radiusMultiplier / 100 + this.cy,
          };
        });
        
        const animatedColors = this.getAnimatedColors(globalTime);
        this.g.innerHTML = this.getPath(drawnPoints, animatedColors);
        
        // Update gradient colors
        this.updateGradient(animatedColors);
      }

      updateGradient(colors) {
        const gradient = svg.querySelector(`#aura-gradient-${this.pathIndex}`);
        if (gradient) {
          const stops = gradient.querySelectorAll('stop');
          stops.forEach((stop, i) => {
            if (colors[i]) {
              stop.setAttribute('stop-color', colors[i]);
            }
          });
        }
      }
    }

    // Clear existing paths
    pathsRef.current = [];
    svg.innerHTML = `
      <defs>
        ${Array.from({ length: 5 }, (_, i) => `
          <linearGradient id="aura-gradient-${i}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ff006e;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#8338ec;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#3a86ff;stop-opacity:1" />
          </linearGradient>
        `).join('')}
        
        <radialGradient id="aura-radial-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.1" />
          <stop offset="100%" style="stop-color:#000000;stop-opacity:0.05" />
        </radialGradient>
        
        ${Array.from({ length: 5 }, (_, i) => `
          <filter id="aura-blur-${i}" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="${i * 0.8 + 0.5}"/>
            <feColorMatrix type="saturate" values="${2 - i * 0.2}"/>
          </filter>
        `).join('')}
        
        <filter id="aura-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3"/>
          <feColorMatrix type="saturate" values="1.5"/>
        </filter>
      </defs>
      <g id="aura-container"></g>
    `;

    const container = svg.querySelector('#aura-container');

    // Create base path with more dramatic variations
    const basePath = new Path({
      pointNum: 45,
      radius: baseRadius,
      cx: centerX,
      cy: centerY,
      pathIndex: 0,
      parent: container,
      animationSpeed: 1.2,
      colorOffset: 0
    });

    pathsRef.current.push(basePath);
    const basePathPoints = basePath.points;

    // Create additional layers with different color timing
    Array.from({ length: 4 }).forEach((v, i) => {
      const path = new Path({
        pointNum: 45,
        radius: baseRadius - (i + 1) * (baseRadius * 0.12),
        cx: centerX,
        cy: centerY,
        parent: container,
        points: basePathPoints,
        pathIndex: i + 1,
        animationSpeed: 1.2 + i * 0.3,
        colorOffset: (i + 1) * 50 // Offset color timing for each layer
      });
      pathsRef.current.push(path);
    });

    const animate = () => {
      colorTimeRef.current += 2; // Increase color change speed
      pathsRef.current.forEach(path => path.animate(colorTimeRef.current));
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height]);

  return (
    <div 
      className={`aura-container ${className}`} 
      style={{ 
        width, 
        height,
        filter: 'contrast(1.2) brightness(1.1)'
      }}
    >
      <svg
        ref={svgRef}
        className="aura-svg"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
};

export default Aura;