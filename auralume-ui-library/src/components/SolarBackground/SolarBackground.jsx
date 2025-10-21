import React, { useEffect, useRef } from 'react';
import './SolarBackground.css';

const SolarBackground = ({ children, className = '', color = { r: 1, g: 1, b: 1 } }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const timeRef = useRef(0);

  // Color presets
  const colorPresets = {
    orange: { r: 1.0, g: 0.4, b: 0.1 },
    red: { r: 1.0, g: 0.0, b: 0.1 },
    blue: { r: 0.3, g: 0.5, b: 1.0 },
    purple: { r: 0.8, g: 0.2, b: 1.0 },
    green: { r: 0.3, g: 1.0, b: 0.3 },
    cyan: { r: 0.2, g: 0.8, b: 1.0 },
    yellow: { r: 1.0, g: 0.9, b: 0.2 },
    white: { r: 1.0, g: 1.0, b: 1.0 },
    pink: { r: 1.0, g: 0.3, b: 0.6 }
  };

  // Parse color - either preset name or RGB object
  const parseColor = (col) => {
    if (typeof col === 'string') {
      return colorPresets[col.toLowerCase()] || colorPresets.orange;
    }
    if (typeof col === 'object' && col.r !== undefined) {
      return col;
    }
    return colorPresets.orange;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    glRef.current = gl;

    const sunColor = parseColor(color);

    // Shader sources
    const vertexSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0, 1.0);
      }
    `;

    const fragmentSource = `
      #define PI 3.14159265358979323846
      precision highp float;

      uniform float width;
      uniform float height;
      vec2 resolution = vec2(width, height);
      uniform float time;
      uniform vec3 sunColor;

      float random (in vec2 st) {
        return fract(sin(dot(st.xy/PI, vec2(12.9898,78.233))) * 43758.5453123);
      }

      vec2 rotate(vec2 _st, float _angle) {
        _st -= 0.5;
        _st = mat2(cos(_angle),-sin(_angle), sin(_angle),cos(_angle)) * _st;
        _st.y += 0.5;
        _st.x += .5;
        return _st;
      }

      float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float surface(vec2 pos, float radius, float time) {
        float sphere = length(pos)*3.0;
        float a = atan(pos.y,pos.x);
        float m = a*time;
        m += noise(pos+time*0.1)*.5;
        a *= 1.+abs(atan(time*0.2))*.1;
        a *= 1.+noise(pos+time*0.1)*0.1;
        float distortion = .002*(1.0-pos.y);
        radius += sin(a*50.)*noise(pos+time*.2)*distortion;
        radius += (sin(a*20.)*.002);
        return 1.-smoothstep(radius,radius+0.015,sphere);
      }

      void main(){
        float aspect = width/height;
        vec2 uv = gl_FragCoord.xy/resolution.xy;
        
        // Normalize coordinates to maintain consistent positioning
        vec2 normalizedUV = uv;
        normalizedUV.x *= aspect;
        
        // Position sun at the right edge (x = aspect) and centered vertically (y = 0.5)
        vec2 pos = vec2(aspect, 0.5) - normalizedUV;
        float ds = length(pos);
        float dc = distance(vec2(.5,.5), uv);
        float ids = 1.0 - ds;
       
        float period = 17.2*PI;
        float t = mod(time, period);
        
        float movement = .00;
        float rotation = -t*.0000;
        float twinkle = (1.0+.2*cos(t*40.0*random(uv)));

        vec2 starPos = uv;
        starPos.y -= t*movement;
        starPos = rotate(starPos, rotation);
        float r = random(floor(starPos*500.));
        float brightnessModifier = .3*(fract(r*9.445)+.1);
        r *= step(.97, r);
        vec3 stars = vec3(.5,.7,1.0) * vec3(r)*ds;
        stars *= 1.0-step(ds,.2);
        vec4 starfield = brightnessModifier*vec4(stars,1.0);

        vec2 starPos2 = uv;
        starPos2.y -= t*movement;
        starPos2 = rotate(starPos2, rotation);
        float r2 = random(floor(starPos2*450.));
        brightnessModifier = fract(r2*14.4548);
        r2 *= step(.99, r2);
        vec3 stars2 = vec3(.5,.5,1.0) * vec3(r2)*ds;
        stars2 *= 1.0-step(ds,.2);
        vec4 starfield2 = (twinkle)*(.77*brightnessModifier)*vec4(stars2,1.0);

        vec2 starPos3 = uv;
        starPos3.y -= t*movement;
        starPos3 = rotate(starPos3, rotation);
        float r3 = random(floor(starPos3*470.));
        brightnessModifier = .4*fract(r3*68.7);
        r3 *= step(.9975, r3);
        vec3 stars3 = vec3(1.0,.7,.7) * vec3(r3)*ds;
        stars3 *= 1.0-step(ds,.2);
        vec4 starfield3 = twinkle*(brightnessModifier)*vec4(stars3,1.0);

        vec2 starPos4 = uv;
        starPos4.y -= t*movement;
        starPos4 = rotate(starPos4, rotation);
        float r4 = random(floor(starPos4*400.));
        brightnessModifier = .5+.5*fract(r4*34.5234);
        r4 *= step(.9986, r4);
        vec3 stars4 = vec3(.5,.5,1.0) * vec3(r4)*ds;
        stars4 += vec3(0.0,0.0,.05);
        stars4 *= 1.0-step(ds,.2);
        vec4 starfield4 = twinkle*brightnessModifier*vec4(stars4,1.0);

        float starfieldBrightness = .8;

        // Use custom sun color for the gradient
        vec3 coreColor = sunColor;
        vec3 midColor = sunColor * 0.8 + vec3(0.2, 0.2, 0.0);
        vec3 outerColor = sunColor * 0.6 + vec3(0.3, 0.3, 0.1);
        
        vec3 red = -ds + coreColor;
        vec3 orange = -ds + midColor;
        vec3 yellow = outerColor * clamp(ids, 0.0, 1.0);
        vec3 lime = (coreColor * 0.9 + vec3(0.1, 0.1, 0.0)) * clamp(ids, 0.0, 1.0);
        float lensing = (1.0-normalizedUV.y)-.5;
        vec3 colorz = (yellow)*(lime)*(lensing+.9*(lime+yellow+orange+red)); 
        float sunsetFactor = 2.0*normalizedUV.y;
        
        gl_FragColor = starfieldBrightness*(starfield2+starfield+starfield3+starfield4)+vec4(colorz+(sunsetFactor*(surface(pos,.6+.5*lensing,t))),1.0);
      }
    `;

    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile failed:', gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);
    programRef.current = program;

    const vertexData = new Float32Array([
      -1.0, 1.0,
      -1.0, -1.0,
      1.0, 1.0,
      1.0, -1.0,
    ]);

    const vertexDataBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexDataBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

    const positionHandle = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionHandle);
    gl.vertexAttribPointer(positionHandle, 2, gl.FLOAT, false, 2 * 4, 0);

    const timeHandle = gl.getUniformLocation(program, 'time');
    const widthHandle = gl.getUniformLocation(program, 'width');
    const heightHandle = gl.getUniformLocation(program, 'height');
    const sunColorHandle = gl.getUniformLocation(program, 'sunColor');

    // Set sun color uniform
    gl.uniform3f(sunColorHandle, sunColor.r, sunColor.g, sunColor.b);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(widthHandle, canvas.width);
      gl.uniform1f(heightHandle, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      timeRef.current += 0.02;
      gl.uniform1f(timeHandle, timeRef.current);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [color]);

  return (
    <div className={`solar-background-wrapper ${className}`}>
      <canvas ref={canvasRef} className="solar-background-canvas" />
      <div className="solar-background-content">
        {children}
      </div>
    </div>
  );
};

export default SolarBackground;