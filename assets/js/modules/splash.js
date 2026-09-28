/**
 * Splash Module
 * Handles canvas snow particle background animation.
 */

export function initSplash() {
  initCanvas();
}

/**
 * Canvas Particle / Snowflake Animation
 */
function initCanvas() {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const splash = document.querySelector('.splash');
  let particles = [];
  let maxParticles = 400;
  let mouseX = -100;
  let mouseY = -100;
  let animationFrameId = null;

  function resize() {
    canvas.width = canvas.scrollWidth || splash?.clientWidth || window.innerWidth;
    canvas.height = canvas.scrollHeight || splash?.clientHeight || 344;
    maxParticles = Math.min(400, Math.floor(canvas.width / 5));
  }

  function createParticle() {
    const w = canvas.width || 800;
    const h = canvas.height || 344;
    return {
      x: Math.floor(Math.random() * w),
      y: Math.floor(Math.random() * h),
      size: 3 * Math.random() + 2,
      speed: 1 * Math.random() + 0.5,
      velY: 1 * Math.random() + 0.5,
      velX: 0,
      stepSize: Math.random() / 30,
      step: 0,
      opacity: 0.5 * Math.random() + 0.3,
    };
  }

  function resetParticle(p) {
    if (particles.length > maxParticles) return false;
    p.x = Math.floor(Math.random() * canvas.width);
    p.y = 0;
    p.size = 3 * Math.random() + 2;
    p.speed = 1 * Math.random() + 0.5;
    p.velY = p.speed;
    p.velX = 0;
    p.opacity = 0.5 * Math.random() + 0.3;
    return true;
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    while (particles.length < maxParticles) {
      particles.push(createParticle());
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        const force = 150 / (dist * dist) / 2;
        p.velX -= force * (dx / dist);
        p.velY -= force * (dy / dist);
      } else {
        p.velX *= 0.98;
        if (p.velY <= p.speed) {
          p.velY = p.speed;
        }
        p.step += 0.05;
        p.velX += Math.cos(p.step) * p.stepSize;
      }

      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
      p.y += p.velY;
      p.x += p.velX;

      if ((p.y >= canvas.height || p.y <= 0) && !resetParticle(p)) {
        particles.splice(i--, 1);
      } else if ((p.x >= canvas.width || p.x <= 0) && !resetParticle(p)) {
        particles.splice(i--, 1);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    animationFrameId = requestAnimationFrame(loop);
  }

  if (splash) {
    splash.addEventListener('mousemove', (e) => {
      const rect = splash.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    splash.addEventListener('mouseleave', () => {
      mouseX = -100;
      mouseY = -100;
    });
  }

  window.addEventListener('resize', resize);
  resize();

  // Populate initial particles
  for (let i = 0; i < maxParticles; i++) {
    particles.push(createParticle());
  }

  loop();
}
