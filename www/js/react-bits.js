/**
 * SMART AI - React Bits (reactbits.dev) UI Components & Visual FX Suite
 * Modules:
 * - SpotlightCard: Mouse-following radial luminescence
 * - ShinyText: Anodized titanium / porcelain shimmer text
 * - MagneticButton: Elastic spring hover cursor attraction
 * - InteractiveGridPattern: Subtle ambient vector grid canvas
 * - DecryptedText: High-precision character unscrambling
 */

const ReactBits = (function () {
  'use strict';

  /**
   * Initializes Spotlight Card effect on all .bento-card elements
   */
  function initSpotlightCards() {
    const cards = document.querySelectorAll('.bento-card, .spotlight-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--spotlight-x', `${x}px`);
        card.style.setProperty('--spotlight-y', `${y}px`);
      });
    });
  }

  /**
   * Applies Magnetic Button spring physics on buttons with .btn-magnetic
   */
  function initMagneticButtons() {
    const btns = document.querySelectorAll('.btn-magnetic, .btn-primary');
    btns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
        if (window.gsap) {
          window.gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' });
        } else {
          btn.style.transform = `translate(${x}px, ${y}px)`;
        }
      });

      btn.addEventListener('mouseleave', () => {
        if (window.gsap) {
          window.gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
        } else {
          btn.style.transform = 'translate(0px, 0px)';
        }
      });
    });
  }

  /**
   * Decrypted Text / Cyber Scramble animation
   */
  function unscrambleText(element, targetText, speed = 35) {
    if (!element) return;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~|}{[]';
    let iteration = 0;
    const maxIterations = targetText.length * 2.5;

    const interval = setInterval(() => {
      element.innerText = targetText
        .split('')
        .map((char, index) => {
          if (char === ' ' || char === '–' || char === '-') return char;
          if (index < iteration / 2.5) {
            return targetText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration >= maxIterations) {
        clearInterval(interval);
        element.innerText = targetText;
      }
      iteration++;
    }, speed);
  }

  /**
   * Ambient Interactive Grid Canvas
   */
  function initGridBackground(canvasId = 'ambientGridCanvas') {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let mouseX = width / 2;
    let mouseY = height / 2;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const gridSize = 40;

    function render() {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const dotColor = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(15, 23, 42, 0.035)';
      const glowColor = isDark ? 'rgba(56, 189, 248, 0.12)' : 'rgba(37, 99, 235, 0.08)';

      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          ctx.beginPath();
          if (dist < 140) {
            ctx.arc(x, y, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = glowColor;
          } else {
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fillStyle = dotColor;
          }
          ctx.fill();
        }
      }
      requestAnimationFrame(render);
    }
    render();
  }

  return {
    initSpotlightCards,
    initMagneticButtons,
    unscrambleText,
    initGridBackground
  };
})();

window.ReactBits = ReactBits;
