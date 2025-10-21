import React, { useEffect, useRef } from 'react';
import './AuroraBackground.css';

/**
 * De Casteljau algorithm for bezier curve calculation
 */
function deCasteljau(p0x, p0y, cp0x, cp0y, cp1x, cp1y, p1x, p1y, t) {
  const Ax = p0x + t * (cp0x - p0x);
  const Ay = p0y + t * (cp0y - p0y);
  const Bx = cp0x + t * (cp1x - cp0x);
  const By = cp0y + t * (cp1y - cp0y);
  const Cx = cp1x + t * (p1x - cp1x);
  const Cy = cp1y + t * (p1y - cp1y);

  const Dx = Ax + t * (Bx - Ax);
  const Dy = Ay + t * (By - Ay);
  const Ex = Bx + t * (Cx - Bx);
  const Ey = By + t * (Cy - By);

  const Px = Dx + t * (Ex - Dx);
  const Py = Dy + t * (Ey - Dy);

  return { x: Px, y: Py };
}

// Configuration
const CONFIG = {
  CURVE_POINTS: 10,
  CURVE_POINT_X_JITTER: 1.5,
  CURVE_POINT_Y_JITTER: 3.5,
  CURVE_POINT_MAX_FLOAT_X_DIST: 270,
  CURVE_POINT_MAX_FLOAT_Y_DIST: 80,
  CURVE_POINT_MIN_FLOAT_DIST: 15,
  CURVE_POINT_MAX_FLOAT_TIME: 9000,
  CURVE_POINT_MIN_FLOAT_TIME: 3000,
  BRUSH_COUNT: 1000,
  BRUSH_WIDTH: 30,
  BRUSH_HEIGHT: 450,
  BRUSH_MIN_SCALE_Y: 0.02,
  BRUSH_MAX_SCALE_Y_VARIANCE: 0.5,
  BRUSH_MAX_ALPHA_VARIANCE: 0.7,
  BRUSH_MAX_ANIM_TIME: 7000,
  BRUSH_MIN_ANIM_TIME: 1500,
  BRUSH_MAX_Z_ANIM_TIME: 80000,
  BRUSH_MIN_Z_ANIM_TIME: 58000,
  BRUSH_ALPHA_DROPOFF: 0.07,
  MOUSE_X_OFFSET: 50,
  MOUSE_Y_OFFSET: 25,
};

class CurvePoint {
  constructor(x, y, z, cpLength, config) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.cpLength = cpLength;
    this.cpYOffset = Math.random() * cpLength - cpLength;
    this.config = config;

    this.xAnimTime =
      Math.random() * (config.CURVE_POINT_MAX_FLOAT_TIME - config.CURVE_POINT_MIN_FLOAT_TIME) +
      config.CURVE_POINT_MIN_FLOAT_TIME;
    this.xVariance = Math.max(
      Math.random() * this.z * config.CURVE_POINT_MAX_FLOAT_X_DIST,
      config.CURVE_POINT_MIN_FLOAT_DIST
    );
    this.xMin = this.x - this.xVariance / 2;
    this.xAnimOffset = Math.random() * Math.PI;

    this.yAnimTime =
      Math.random() * (config.CURVE_POINT_MAX_FLOAT_TIME - config.CURVE_POINT_MIN_FLOAT_TIME) +
      config.CURVE_POINT_MIN_FLOAT_TIME;
    this.yVariance = Math.max(
      Math.random() * this.z * config.CURVE_POINT_MAX_FLOAT_Y_DIST,
      config.CURVE_POINT_MIN_FLOAT_DIST
    );
    this.yMin = this.y - this.yVariance / 2;
    this.yAnimOffset = Math.random() * Math.PI;

    this.startTime = null;
  }

  getCps() {
    return [
      {
        x: this.x - this.cpLength,
        y: this.y - this.cpYOffset,
      },
      {
        x: this.x + this.cpLength,
        y: this.y + this.cpYOffset,
      },
    ];
  }

  updatePosition(mouseXPercentage, mouseYPercentage) {
    if (!this.startTime) this.startTime = Date.now();
    const now = Date.now();
    const deltaTime = now - this.startTime;

    this.x =
      this.xMin +
      (Math.sin((deltaTime / this.xAnimTime) * Math.PI + this.xAnimOffset) * 0.5 + 0.5) *
        this.xVariance;
    this.x += this.z * (1 - mouseXPercentage * 2) * this.config.MOUSE_X_OFFSET;

    this.y =
      this.yMin +
      (Math.sin((deltaTime / this.yAnimTime) * Math.PI + this.yAnimOffset) * 0.5 + 0.5) *
        this.yVariance;
    this.y += this.z * (1 - mouseYPercentage * 2) * this.config.MOUSE_Y_OFFSET;
  }
}

class Brush {
  constructor(curve, z, color, noScale, config) {
    this.curve = curve;
    this.z = z;
    this.alpha = z * Math.random() * 0.55 + 0.15;
    this.scaleYMod = (1 - config.BRUSH_MIN_SCALE_Y) * Math.random();
    this.scaleXMod = 0.5 * Math.random() * (2 - this.scaleYMod * 2);
    this.noScale = !!noScale;
    this.color1 = color || 'rgb(50, 170, 82)';
    this.config = config;
    this.scaleY = this.scaleYMod;

    this.alphaAnimTime =
      Math.random() * (config.BRUSH_MAX_ANIM_TIME - config.BRUSH_MIN_ANIM_TIME) +
      config.BRUSH_MIN_ANIM_TIME;
    this.alphaVariance = Math.max(Math.random() * config.BRUSH_MAX_ALPHA_VARIANCE, this.alpha);
    this.alphaMin = Math.max(this.alpha - this.alphaVariance / 2, 0);
    this.alphaAnimOffset = Math.random() * Math.PI;

    this.scaleYAnimTime =
      Math.random() * (config.BRUSH_MAX_ANIM_TIME - config.BRUSH_MIN_ANIM_TIME) +
      config.BRUSH_MIN_ANIM_TIME;
    this.scaleYVariance = Math.random() * config.BRUSH_MAX_SCALE_Y_VARIANCE;
    this.scaleYMin = this.scaleY - this.scaleYVariance / 2;
    this.scaleYAnimOffset = Math.random() * Math.PI;

    this.zAnimOffset = this.curve.vanishingPoint.z - (z - this.curve.vanishingPoint.z);
    this.zAnimTime =
      Math.random() * (config.BRUSH_MAX_Z_ANIM_TIME - config.BRUSH_MIN_Z_ANIM_TIME) +
      config.BRUSH_MIN_Z_ANIM_TIME;

    if (this.noScale) {
      this.alphaMin = 0;
      this.alphaVariance = 1;
    }

    this.startTime = null;
  }

  draw(ctx) {
    if (this.z < this.curve.vanishingPoint.z || this.z > this.curve.endPoint.z) return false;

    const point = this.curve.getPointAtZ(this.z);

    let alpha =
      (0.5 + 0.5 * Math.min(this.z, 1)) * this.alpha * this.curve.maxBrushAlpha;

    if (this.z - this.curve.vanishingPoint.z < this.config.BRUSH_ALPHA_DROPOFF) {
      alpha *= (this.z - this.curve.vanishingPoint.z) / this.config.BRUSH_ALPHA_DROPOFF;
    } else if (this.curve.endPoint.z - this.z < this.config.BRUSH_ALPHA_DROPOFF) {
      alpha *= (this.curve.endPoint.z - this.z) / this.config.BRUSH_ALPHA_DROPOFF;
    }

    let scaleY, scaleX;
    if (!this.noScale) {
      scaleY = this.z * this.scaleYMod + this.config.BRUSH_MIN_SCALE_Y;
      scaleX = this.z * this.scaleXMod + 0.5;
    } else {
      scaleY = this.scaleYMod + this.config.BRUSH_MIN_SCALE_Y;
      scaleX = this.scaleXMod + 0.5;
    }

    ctx.fillStyle = this.color1;
    ctx.globalAlpha = alpha;

    ctx.beginPath();
    ctx.moveTo(point.x, point.y - scaleY * this.config.BRUSH_HEIGHT);
    ctx.quadraticCurveTo(
      point.x + (scaleX * this.config.BRUSH_WIDTH) / 2,
      point.y - scaleY * this.config.BRUSH_HEIGHT,
      point.x + (scaleX * this.config.BRUSH_WIDTH) / 2,
      point.y
    );
    ctx.quadraticCurveTo(
      point.x + (scaleX * this.config.BRUSH_WIDTH) / 2,
      point.y + scaleY * this.config.BRUSH_WIDTH,
      point.x,
      point.y + (scaleX * this.config.BRUSH_WIDTH) / 2
    );
    ctx.quadraticCurveTo(
      point.x - (scaleX * this.config.BRUSH_WIDTH) / 2,
      point.y + scaleY * this.config.BRUSH_WIDTH,
      point.x - (scaleX * this.config.BRUSH_WIDTH) / 2,
      point.y
    );
    ctx.quadraticCurveTo(
      point.x - (scaleX * this.config.BRUSH_WIDTH) / 2,
      point.y - scaleY * this.config.BRUSH_HEIGHT,
      point.x,
      point.y - scaleY * this.config.BRUSH_HEIGHT
    );
    ctx.fill();
  }

  updatePosition() {
    if (!this.startTime) this.startTime = Date.now() - 20000;
    const now = Date.now();
    const deltaTime = now - this.startTime;

    this.alpha = Math.min(
      this.alphaMin +
        (Math.sin((deltaTime / this.alphaAnimTime) * Math.PI + this.alphaAnimOffset) * 0.5 +
          0.5) *
          this.alphaVariance,
      1
    );
    this.scaleY =
      this.scaleYMin +
      (Math.sin((deltaTime / this.scaleYAnimTime) * Math.PI + this.scaleYAnimOffset) * 0.5 +
        0.5) *
        this.scaleYVariance;

    this.z = ((deltaTime / this.zAnimTime) + this.zAnimOffset) * this.curve.endPoint.z;
    if (this.z > this.curve.vanishingPoint.z) this.z *= this.z;

    if (this.z > this.curve.endPoint.z) {
      this.z = this.z - this.curve.endPoint.z + this.curve.vanishingPoint.z;
      this.startTime = now;
    }
  }
}

class Curve {
  constructor(vpX, vpY, vpZ, epX, epY, epZ, brushCount, maxBrushAlpha, fill, config) {
    this.vanishingPoint = { x: vpX, y: vpY, z: vpZ };
    this.endPoint = { x: epX, y: epY, z: epZ };
    this.brushCount = brushCount || config.BRUSH_COUNT;
    this.maxBrushAlpha = maxBrushAlpha || 1;
    this.config = config;

    this.points = [new CurvePoint(this.vanishingPoint.x, this.vanishingPoint.y, this.vanishingPoint.z, 0, config)];

    for (let i = 0; i < config.CURVE_POINTS - 1; i++) {
      const mod = ((i + 1) / config.CURVE_POINTS) ** 2;

      const xJitter = Math.random() * config.CURVE_POINT_X_JITTER - config.CURVE_POINT_X_JITTER / 2;
      let x = this.vanishingPoint.x + mod * (this.endPoint.x - this.vanishingPoint.x);
      x += xJitter * (x - this.points[i].x);

      const yJitter =
        (1.2 - mod) *
        (Math.random() * config.CURVE_POINT_Y_JITTER - config.CURVE_POINT_Y_JITTER / 2);
      let y = this.vanishingPoint.y + mod * (this.endPoint.y - this.vanishingPoint.y);
      y += yJitter * (y - this.points[i].y);

      const z = mod * (this.endPoint.z - this.vanishingPoint.z) + this.vanishingPoint.z;

      this.points.push(
        new CurvePoint(
          x,
          y,
          z,
          (Math.random() * 0.33 + 0.33) * (x - this.points[i].x),
          config
        )
      );
    }

    this.points.push(
      new CurvePoint(this.endPoint.x, this.endPoint.y, this.endPoint.z, 0, config)
    );

    this.brushes = [];
    for (let i = 0; i < this.brushCount; i++) {
      const noScale = Math.random() < 0.01;
      this.brushes.push(
        new Brush(
          this,
          (i / this.brushCount) * (this.endPoint.z - this.vanishingPoint.z) +
            this.vanishingPoint.z,
          noScale ? 'rgb(200, 200, 220)' : fill || null,
          noScale,
          config
        )
      );
    }
  }

  getPointAtZ(p) {
    if (p <= this.points[0].z) {
      return this.points[0];
    } else if (p >= this.points[this.points.length - 1].z) {
      return this.points[this.points.length - 1];
    } else {
      let i = 0;
      for (let len = this.points.length; i < len; i++) {
        if (p <= this.points[i].z) break;
      }
      const lastPoint = this.points[i - 1];
      const lastPointCps = lastPoint.getCps();
      const nextPoint = this.points[i];
      const nextPointCps = nextPoint.getCps();
      const t = (p - lastPoint.z) / (nextPoint.z - lastPoint.z);
      return deCasteljau(
        lastPoint.x,
        lastPoint.y,
        lastPointCps[1].x,
        lastPointCps[1].y,
        nextPointCps[0].x,
        nextPointCps[0].y,
        nextPoint.x,
        nextPoint.y,
        t
      );
    }
  }

  update(mouseXPercentage, mouseYPercentage) {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].updatePosition(mouseXPercentage, mouseYPercentage);
    }
    for (let i = 0; i < this.brushes.length; i++) {
      this.brushes[i].updatePosition();
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.brushes.length; i++) {
      this.brushes[i].draw(ctx);
    }
  }
}

// Helper function to create gradient with hue shift
function createHueShiftedGradient(ctx, x1, y1, x2, y2, hue) {
  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0.4, `hsl(${hue}, 45%, 35%)`);
  grad.addColorStop(0.6, `hsla(${hue + 20}, 10%, 43%, 0.5)`);
  return grad;
}

function createHueShiftedGradient2(ctx, x1, y1, x2, y2, hue) {
  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0.35, `hsl(${hue + 10}, 45%, 35%)`);
  grad.addColorStop(0.7, `hsla(${hue - 10}, 30%, 30%, 0.7)`);
  return grad;
}

const AuroraBackground = ({ children, backgroundColor = '#18283d', hue = 160, className= "" }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mouseXPercentageRef = useRef(0.5);
  const mouseYPercentageRef = useRef(0.5);
  const curveRef = useRef([]);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'color-dodge';

    canvasRef.current = canvas;
    
    // Apply dynamic filter based on hue
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.display = 'block';
    canvas.style.filter = `blur(6px) drop-shadow(0 0 30px hsl(${hue}, 55%, 60%))`;
    canvas.style.transformOrigin = '0 100%';
    canvas.style.transform = 'skewX(-20deg)';
    canvas.style.animation = 'fadein 6s 1';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    
    containerRef.current.insertBefore(canvas, containerRef.current.firstChild);

    // Create gradients with hue shift
    const gradCanvas = document.createElement('canvas');
    const gradCtx = gradCanvas.getContext('2d');
    const grad = createHueShiftedGradient(gradCtx, width * 0.5, height, width * 0.35, 0, hue);
    const grad2 = createHueShiftedGradient2(gradCtx, width * 0.5, height * 0.5, width * 0.3, 0, hue);

    // Create curves with hue-shifted colors
    const curves = [
      new Curve(
        width * 0.17,
        height * 0.94,
        0.01,
        width * 0.8,
        height * 0.8,
        0.8,
        CONFIG.BRUSH_COUNT * 0.3,
        0.4,
        `hsl(${hue}, 50%, 41%)`,
        CONFIG
      ),
      new Curve(
        width * 0.1,
        height * 0.9,
        0.05,
        width * 0.8,
        height * 0.4,
        1,
        null,
        0.8,
        grad,
        CONFIG
      ),
      new Curve(
        width * 0.25,
        height * 0.65,
        0.33,
        width * 0.55,
        0,
        1.1,
        CONFIG.BRUSH_COUNT * 0.6,
        1,
        grad2,
        CONFIG
      ),
    ];

    curveRef.current = curves;

    // Handle mouse move
    const handleMouseMove = (e) => {
      mouseXPercentageRef.current = e.clientX / width;
      mouseYPercentageRef.current = e.clientY / height;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < curves.length; i++) {
        curves[i].update(mouseXPercentageRef.current, mouseYPercentageRef.current);
        curves[i].draw(ctx);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (canvasRef.current && containerRef.current) {
        containerRef.current.removeChild(canvasRef.current);
      }
    };
  }, [hue]);

  return (
    <div style={{ background: `${backgroundColor} center center no-repeat` }} className={`aurora-background  ${className}`} ref={containerRef}>
      <div className="aurora-background-content">{children}</div>
    </div>
  );
};

export default AuroraBackground;
export { AuroraBackground };