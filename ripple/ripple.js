// ==========================================
// RIPPLE EFFECT ON CLICK
// ==========================================

let lastRippleTime = 0;
const rippleDelay = 150; // Milliseconds between ripples
let activeRipples = 0;
const maxRipples = 5;

document.addEventListener('click', function(e) {
  const now = Date.now();
  
  // Throttle: only create ripple if enough time has passed
  if (now - lastRippleTime < rippleDelay) {
    return;
  }
  
  // Limit maximum simultaneous ripples
  if (activeRipples >= maxRipples) {
    return;
  }
  
  lastRippleTime = now;
  activeRipples++;
  
  // Create ripple element
  const ripple = document.createElement('div');
  ripple.classList.add('ripple');
  
  // Position at click coordinates
  ripple.style.left = e.clientX + 'px';
  ripple.style.top = e.clientY + 'px';
  
  // Add to body
  document.body.appendChild(ripple);
  
  // Remove ripple after animation completes
  setTimeout(() => {
    ripple.remove();
    activeRipples--;
  }, 700); // Must match animation duration in CSS
});