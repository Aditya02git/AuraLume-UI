import confetti from 'canvas-confetti';

/**
 * Triggers a confetti animation
 * @param {Object} options - Configuration options for the confetti
 * @param {number} options.particleCount - Number of confetti particles (default: 150)
 * @param {number} options.spread - Spread angle in degrees (default: 60)
 * @param {number} options.startVelocity - Initial velocity of particles (default: 30)
 * @param {number} options.decay - How quickly particles slow down (default: 0.9)
 * @param {number} options.gravity - Gravity effect (default: 1)
 * @param {number} options.drift - Horizontal drift (default: 0)
 * @param {number} options.scalar - Size multiplier for particles (default: 1)
 * @param {Array} options.colors - Array of color strings (default: canvas-confetti defaults)
 * @param {Object} options.origin - Origin point {x: 0-1, y: 0-1} (default: {x: 0.5, y: 0.6})
 */
export const triggerConfetti = (options = {}) => {
  const {
    particleCount = 150,
    spread = 60,
    startVelocity = 30,
    decay = 0.9,
    gravity = 1,
    drift = 0,
    scalar = 1,
    colors,
    origin = { x: 0.5, y: 0.6 }
  } = options;

  confetti({
    particleCount,
    spread,
    startVelocity,
    decay,
    gravity,
    drift,
    scalar,
    colors,
    origin
  });
};

// Predefined confetti variations for common use cases
export const confettiVariations = {
  // Basic celebration
  celebrate: () => triggerConfetti(),
  
  // Success/achievement
  success: () => triggerConfetti({
    particleCount: 100,
    spread: 70,
    colors: ['#00ff00', '#32cd32', '#90ee90']
  }),
  
  // Party time
  party: () => triggerConfetti({
    particleCount: 200,
    spread: 90,
    startVelocity: 45
  }),
  
  // Gentle celebration
  gentle: () => triggerConfetti({
    particleCount: 80,
    spread: 45,
    startVelocity: 20
  }),
  
  // From left side
  fromLeft: () => triggerConfetti({
    particleCount: 100,
    spread: 55,
    origin: { x: 0, y: 0.6 }
  }),
  
  // From right side  
  fromRight: () => triggerConfetti({
    particleCount: 100,
    spread: 55,
    origin: { x: 1, y: 0.6 }
  }),
  
  // Rain from top
  rain: () => triggerConfetti({
    particleCount: 150,
    spread: 120,
    origin: { x: 0.5, y: 0 },
    gravity: 2
  }),
  
  // Fireworks effect
  fireworks: () => {
    // Multiple bursts for fireworks effect
    const burst = () => triggerConfetti({
      particleCount: 50,
      spread: 60,
      origin: { x: Math.random(), y: Math.random() * 0.6 + 0.2 }
    });
    
    burst();
    setTimeout(burst, 200);
    setTimeout(burst, 400);
  },
  
  // Continuous celebration
  continuous: (duration = 3000) => {
    const end = Date.now() + duration;
    
    const frame = () => {
      triggerConfetti({
        particleCount: 2,
        spread: 60,
        origin: { 
          x: Math.random(),
          y: Math.random() - 0.2
        }
      });
      
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    frame();
  }
};