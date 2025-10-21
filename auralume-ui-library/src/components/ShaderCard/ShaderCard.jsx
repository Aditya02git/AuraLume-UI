import React, { useEffect, useRef, useState } from 'react';
import './ShaderCard.css';

class VHSGlitchEffect {
  constructor(canvasElement, options = {}) {
    this.canvas = canvasElement;
    this.gl =
      this.canvas.getContext("webgl") ||
      this.canvas.getContext("experimental-webgl");
    this.texture = null;
    this.program = null;
    this.time = 0;
    this.glitchIntensity = 0;
    this.targetGlitchIntensity = 0;
    this.imageWidth = 512;
    this.imageHeight = 512;
    this.glitchInterval = null;
    this.animationId = null;

    // Default parameters (can be overridden by options)
    this.params = {
      // Glitch controls
      glitchFrequency: 0.5,
      glitchDuration: 300,
      maxGlitchIntensity: 1.0,
      minGlitchIntensity: 0.3,

      // Scanline controls
      scanlineSpeed: 0.15,
      scanlineIntensity: 0.04,
      thickScanlineSpeed: 0.03,
      thickScanlineIntensity: 0.02,
      scanlineGlitchThreshold: 0.98,

      // Distortion controls
      horizontalDistortion: 0.1,
      verticalGlitchBars: 0.2,
      rgbShiftIntensity: 1.0,

      // Visual effects
      colorGradeR: 1.1,
      colorGradeG: 0.95,
      colorGradeB: 0.9,
      noiseIntensity: 0.05,
      vignetteStrength: 0.3,

      // Image scaling
      imageScale: 0.8,

      // Animation
      pause: false,
      ...options // Merge with provided options
    };

    this.init();
  }

  init() {
    if (!this.gl) {
      console.error("WebGL not supported");
      return false;
    }

    this.setupCanvas();
    this.createShaders();
    this.setupGlitchTiming();
    return true;
  }

  setupCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * window.devicePixelRatio;
    this.canvas.height = rect.height * window.devicePixelRatio;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  createShaders() {
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      uniform vec2 u_resolution;
      uniform vec2 u_imageSize;
      uniform float u_imageScale;
      varying vec2 v_texCoord;
      
      void main() {
          float screenAspect = u_resolution.x / u_resolution.y;
          float imageAspect = u_imageSize.x / u_imageSize.y;
          
          vec2 scale = vec2(1.0);
          if (imageAspect > screenAspect) {
              scale.y = screenAspect / imageAspect;
          } else {
              scale.x = imageAspect / screenAspect;
          }
          
          scale *= u_imageScale;
          
          gl_Position = vec4(a_position * scale, 0.0, 1.0);
          v_texCoord = a_texCoord;
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform sampler2D u_texture;
      uniform float u_time;
      uniform float u_glitchIntensity;
      
      // Scanline uniforms
      uniform float u_scanlineSpeed;
      uniform float u_scanlineIntensity;
      uniform float u_thickScanlineSpeed;
      uniform float u_thickScanlineIntensity;
      uniform float u_scanlineGlitchThreshold;
      
      // Distortion uniforms
      uniform float u_horizontalDistortion;
      uniform float u_verticalGlitchBars;
      uniform float u_rgbShiftIntensity;
      
      // Visual effect uniforms
      uniform vec3 u_colorGrade;
      uniform float u_noiseIntensity;
      uniform float u_vignetteStrength;
      
      varying vec2 v_texCoord;

      float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      vec3 rgbShift(sampler2D tex, vec2 uv, float intensity) {
          float shift = intensity * u_rgbShiftIntensity * 0.01;
          float r = texture2D(tex, uv + vec2(shift, 0.0)).r;
          float g = texture2D(tex, uv).g;
          float b = texture2D(tex, uv - vec2(shift, 0.0)).b;
          return vec3(r, g, b);
      }

      void main() {
          vec2 uv = v_texCoord;
          
          // Moving VHS scanlines
          float scanlineOffset = u_time * u_scanlineSpeed;
          float scanlineY = uv.y + scanlineOffset;
          float scanline = sin(scanlineY * 800.0) * u_scanlineIntensity;
          
          // Glitching scanlines
          float scanlineGlitch = random(vec2(floor(scanlineY * 100.0), floor(u_time * 5.0)));
          if (scanlineGlitch > u_scanlineGlitchThreshold) {
              scanline *= 2.0;
          }
          
          // Thick scanline bands
          float thickScanline = sin((scanlineY + u_time * u_thickScanlineSpeed) * 50.0) * u_thickScanlineIntensity;
          scanline += thickScanline;
          
          // Horizontal distortion
          float noise = random(vec2(floor(uv.y * 150.0), floor(u_time * 10.0)));
          float distortion = (noise - 0.5) * u_glitchIntensity * u_horizontalDistortion;
          
          // Scanline-based distortion
          float scanlineDistort = step(0.985, random(vec2(floor(scanlineY * 200.0), floor(u_time * 8.0))));
          distortion += scanlineDistort * (noise - 0.5) * 0.03;
          
          uv.x += distortion;
          
          // Vertical glitch bars
          float glitchBar = step(0.98, random(vec2(floor(uv.y * 25.0), floor(u_time * 15.0))));
          uv.x += glitchBar * (noise - 0.5) * u_glitchIntensity * u_verticalGlitchBars;
          
          // RGB shift
          vec3 color = rgbShift(u_texture, uv, u_glitchIntensity);
          
          // Add moving scanlines
          color -= scanline;
          
          // Scanline color bleeding
          if (scanlineGlitch > u_scanlineGlitchThreshold) {
              color.r += 0.06;
              color.g -= 0.03;
          }
          
          // VHS color grading
          color *= u_colorGrade;
          
          // Add noise
          float grain = random(uv + u_time) * u_noiseIntensity;
          color += grain;
          
          // Vignette effect
          vec2 center = uv - 0.5;
          float vignette = 1.0 - dot(center, center) * u_vignetteStrength;
          color *= vignette;
          
          gl_FragColor = vec4(color, 1.0);
      }
    `;

    const vertexShader = this.createShader(
      this.gl.VERTEX_SHADER,
      vertexShaderSource
    );
    const fragmentShader = this.createShader(
      this.gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    this.program = this.gl.createProgram();
    this.gl.attachShader(this.program, vertexShader);
    this.gl.attachShader(this.program, fragmentShader);
    this.gl.linkProgram(this.program);

    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      const error = this.gl.getProgramInfoLog(this.program);
      console.error("Shader program failed to link:", error);
      return;
    }

    this.setupBuffers();
    this.getUniformLocations();
  }

  getUniformLocations() {
    this.uniforms = {
      time: this.gl.getUniformLocation(this.program, "u_time"),
      glitchIntensity: this.gl.getUniformLocation(
        this.program,
        "u_glitchIntensity"
      ),
      resolution: this.gl.getUniformLocation(this.program, "u_resolution"),
      imageSize: this.gl.getUniformLocation(this.program, "u_imageSize"),
      imageScale: this.gl.getUniformLocation(this.program, "u_imageScale"),
      texture: this.gl.getUniformLocation(this.program, "u_texture"),

      // Scanline uniforms
      scanlineSpeed: this.gl.getUniformLocation(
        this.program,
        "u_scanlineSpeed"
      ),
      scanlineIntensity: this.gl.getUniformLocation(
        this.program,
        "u_scanlineIntensity"
      ),
      thickScanlineSpeed: this.gl.getUniformLocation(
        this.program,
        "u_thickScanlineSpeed"
      ),
      thickScanlineIntensity: this.gl.getUniformLocation(
        this.program,
        "u_thickScanlineIntensity"
      ),
      scanlineGlitchThreshold: this.gl.getUniformLocation(
        this.program,
        "u_scanlineGlitchThreshold"
      ),

      // Distortion uniforms
      horizontalDistortion: this.gl.getUniformLocation(
        this.program,
        "u_horizontalDistortion"
      ),
      verticalGlitchBars: this.gl.getUniformLocation(
        this.program,
        "u_verticalGlitchBars"
      ),
      rgbShiftIntensity: this.gl.getUniformLocation(
        this.program,
        "u_rgbShiftIntensity"
      ),

      // Visual effect uniforms
      colorGrade: this.gl.getUniformLocation(this.program, "u_colorGrade"),
      noiseIntensity: this.gl.getUniformLocation(
        this.program,
        "u_noiseIntensity"
      ),
      vignetteStrength: this.gl.getUniformLocation(
        this.program,
        "u_vignetteStrength"
      ),
    };

    this.attributes = {
      position: this.gl.getAttribLocation(this.program, "a_position"),
      texCoord: this.gl.getAttribLocation(this.program, "a_texCoord"),
    };
  }

  createShader(type, source) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const error = this.gl.getShaderInfoLog(shader);
      console.error("Shader compile error:", error);
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  setupBuffers() {
    const vertices = new Float32Array([
      -1, -1, 0, 1, 1, -1, 1, 1, -1, 1, 0, 0, 1, 1, 1, 0,
    ]);

    this.buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);
  }

  loadImage(imageSrc) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.imageWidth = img.width;
        this.imageHeight = img.height;
        this.createTextureFromImage(img);
        resolve();
      };
      img.onerror = reject;
      img.crossOrigin = "anonymous";
      img.src = imageSrc;
    });
  }

  createTextureFromImage(img) {
    this.texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.texImage2D(
      this.gl.TEXTURE_2D,
      0,
      this.gl.RGBA,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      img
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_S,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_WRAP_T,
      this.gl.CLAMP_TO_EDGE
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MIN_FILTER,
      this.gl.LINEAR
    );
    this.gl.texParameteri(
      this.gl.TEXTURE_2D,
      this.gl.TEXTURE_MAG_FILTER,
      this.gl.LINEAR
    );
  }

  setupGlitchTiming() {
    const scheduleNextGlitch = () => {
      const baseInterval = 2000;
      const randomInterval = Math.random() * 3000;
      const frequency = this.params.glitchFrequency;
      const interval = baseInterval + randomInterval * (1 - frequency);

      this.glitchInterval = setTimeout(() => {
        if (Math.random() < frequency) {
          this.triggerGlitch();
        }
        scheduleNextGlitch();
      }, interval);
    };

    scheduleNextGlitch();
  }

  triggerGlitch() {
    const intensity =
      Math.random() *
        (this.params.maxGlitchIntensity - this.params.minGlitchIntensity) +
      this.params.minGlitchIntensity;
    this.targetGlitchIntensity = intensity;

    setTimeout(() => {
      this.targetGlitchIntensity = 0;
    }, this.params.glitchDuration);
  }

  updateParams(newParams) {
    this.params = { ...this.params, ...newParams };
  }

  start() {
    this.render();
  }

  render() {
    if (!this.params.pause) {
      this.time += 0.016;
    }

    // Smooth glitch intensity transition
    this.glitchIntensity +=
      (this.targetGlitchIntensity - this.glitchIntensity) * 0.1;

    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    if (!this.texture) {
      this.animationId = requestAnimationFrame(() => this.render());
      return;
    }

    this.gl.useProgram(this.program);

    // Bind buffer and set attributes
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.enableVertexAttribArray(this.attributes.position);
    this.gl.vertexAttribPointer(
      this.attributes.position,
      2,
      this.gl.FLOAT,
      false,
      16,
      0
    );
    this.gl.enableVertexAttribArray(this.attributes.texCoord);
    this.gl.vertexAttribPointer(
      this.attributes.texCoord,
      2,
      this.gl.FLOAT,
      false,
      16,
      8
    );

    // Set all uniforms
    this.gl.uniform1f(this.uniforms.time, this.time);
    this.gl.uniform1f(this.uniforms.glitchIntensity, this.glitchIntensity);
    this.gl.uniform2f(
      this.uniforms.resolution,
      this.canvas.width,
      this.canvas.height
    );
    this.gl.uniform2f(
      this.uniforms.imageSize,
      this.imageWidth,
      this.imageHeight
    );
    this.gl.uniform1f(this.uniforms.imageScale, this.params.imageScale);

    // Scanline uniforms
    this.gl.uniform1f(this.uniforms.scanlineSpeed, this.params.scanlineSpeed);
    this.gl.uniform1f(
      this.uniforms.scanlineIntensity,
      this.params.scanlineIntensity
    );
    this.gl.uniform1f(
      this.uniforms.thickScanlineSpeed,
      this.params.thickScanlineSpeed
    );
    this.gl.uniform1f(
      this.uniforms.thickScanlineIntensity,
      this.params.thickScanlineIntensity
    );
    this.gl.uniform1f(
      this.uniforms.scanlineGlitchThreshold,
      this.params.scanlineGlitchThreshold
    );

    // Distortion uniforms
    this.gl.uniform1f(
      this.uniforms.horizontalDistortion,
      this.params.horizontalDistortion
    );
    this.gl.uniform1f(
      this.uniforms.verticalGlitchBars,
      this.params.verticalGlitchBars
    );
    this.gl.uniform1f(
      this.uniforms.rgbShiftIntensity,
      this.params.rgbShiftIntensity
    );

    // Visual effect uniforms
    this.gl.uniform3f(
      this.uniforms.colorGrade,
      this.params.colorGradeR,
      this.params.colorGradeG,
      this.params.colorGradeB
    );
    this.gl.uniform1f(this.uniforms.noiseIntensity, this.params.noiseIntensity);
    this.gl.uniform1f(
      this.uniforms.vignetteStrength,
      this.params.vignetteStrength
    );

    // Bind texture
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    this.gl.uniform1i(this.uniforms.texture, 0);

    // Draw
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

    this.animationId = requestAnimationFrame(() => this.render());
  }

  destroy() {
    if (this.glitchInterval) {
      clearTimeout(this.glitchInterval);
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.gl && this.program) {
      this.gl.deleteProgram(this.program);
    }
    if (this.gl && this.texture) {
      this.gl.deleteTexture(this.texture);
    }
    if (this.gl && this.buffer) {
      this.gl.deleteBuffer(this.buffer);
    }
  }
}

const ShaderCard = ({
  src,
  alt = "Shader effect",
  className = "",
  style = {},
  glitchOptions = {},
  showControls = false,
  title,
  description,
  onGlitch,
  children,
  ...props
}) => {
  const canvasRef = useRef(null);
  const effectRef = useRef(null);
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const effect = new VHSGlitchEffect(canvasRef.current, glitchOptions);
    effectRef.current = effect;

    if (!effect.init()) {
      console.error("Failed to initialize VHS effect");
      setHasError(true);
      setIsLoading(false);
      return;
    }

    // Load image and start effect
    if (src) {
      effect.loadImage(src).then(() => {
        effect.start();
        setIsLoading(false);
      }).catch((error) => {
        console.error("Failed to load image:", error);
        setHasError(true);
        setIsLoading(false);
      });
    } else {
      // Use default image if no src provided
      const defaultImage = "data:image/png;base64,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"; // TODO: Add default base64 image here
      if (defaultImage) {
        effect.loadImage(defaultImage).then(() => {
          effect.start();
          setIsLoading(false);
        }).catch((error) => {
          console.error("Failed to load default image:", error);
          // Start without texture if default image fails
          effect.start();
          setIsLoading(false);
        });
      } else {
        // Start without texture if no default image
        effect.start();
        setIsLoading(false);
      }
    }

    // Handle resize
    const handleResize = () => {
      if (effectRef.current && containerRef.current) {
        effectRef.current.setupCanvas();
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (effectRef.current) {
        effectRef.current.destroy();
      }
    };
  }, [src, glitchOptions]);

  // Method to update glitch parameters
  const updateGlitchParams = (newParams) => {
    if (effectRef.current) {
      effectRef.current.updateParams(newParams);
    }
  };

  // Method to trigger manual glitch
  const triggerGlitch = () => {
    if (effectRef.current) {
      effectRef.current.triggerGlitch();
      if (onGlitch) {
        onGlitch();
      }
    }
  };

  // Method to pause/resume animation
  const togglePause = () => {
    if (effectRef.current) {
      const newPauseState = !effectRef.current.params.pause;
      effectRef.current.updateParams({ pause: newPauseState });
    }
  };

  const getCardClasses = () => {
    let classes = `shader-card ${className}`;
    if (isLoading) classes += ' shader-card--loading';
    if (hasError) classes += ' shader-card--error';
    return classes;
  };

  return (
    <div 
      ref={containerRef}
      className={getCardClasses()}
      style={style}
      {...props}
    >
      <canvas 
        ref={canvasRef}
        className="shader-card__canvas"
        style={{ width: '100%', height: '100%' }}
        alt={alt}
      />
      
      {showControls && !hasError && (
        <div className="shader-card__controls">
          <button 
            className="shader-card__control-btn"
            onClick={triggerGlitch}
            title="Trigger Glitch"
          >
            ⚡
          </button>
          <button 
            className="shader-card__control-btn"
            onClick={togglePause}
            title="Pause/Resume"
          >
            ⏸️
          </button>
        </div>
      )}

      {title && (
        <div className="shader-card__title">{title}</div>
      )}

      {description && (
        <div className="shader-card__description">{description}</div>
      )}

      {children && (
        <div className="shader-card__content">
          {children}
        </div>
      )}
    </div>
  );
};

// Export the component along with helper methods
ShaderCard.displayName = 'ShaderCard';

// Expose methods for external control
ShaderCard.updateParams = (ref, params) => {
  if (ref.current?.effectRef?.current) {
    ref.current.effectRef.current.updateParams(params);
  }
};

ShaderCard.triggerGlitch = (ref) => {
  if (ref.current?.effectRef?.current) {
    ref.current.effectRef.current.triggerGlitch();
  }
};

export default ShaderCard;