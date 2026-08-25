export function repel(node, options = {}) {
  let { radius = 150, force = 40 } = options;
  
  let rafId;
  let isRepelling = false;

  const handleMouseMove = (e) => {
    if (rafId) cancelAnimationFrame(rafId);
    
    rafId = requestAnimationFrame(() => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const rect = node.getBoundingClientRect();
      const nodeCenterX = rect.left + rect.width / 2;
      const nodeCenterY = rect.top + rect.height / 2;
      
      const dx = nodeCenterX - mouseX;
      const dy = nodeCenterY - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < radius && distance > 0) {
        const strength = 1 - (distance / radius);
        const easedStrength = strength * strength; // quadratic ease
        
        const pushX = (dx / distance) * easedStrength * force;
        const pushY = (dy / distance) * easedStrength * force;
        
        if (!isRepelling) {
          node.style.transition = 'none';
          isRepelling = true;
        }
        node.style.transform = `translate(${pushX}px, ${pushY}px)`;
      } else {
        if (isRepelling) {
          // Smooth spring-like return transition
          node.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
          node.style.transform = 'translate(0px, 0px)';
          isRepelling = false;
        }
      }
    });
  };
  
  const handleMouseLeave = () => {
    if (rafId) cancelAnimationFrame(rafId);
    node.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
    node.style.transform = 'translate(0px, 0px)';
    isRepelling = false;
  };
  
  window.addEventListener('mousemove', handleMouseMove, { passive: true });
  // Also handle mouseleave on the document to reset cards if user leaves the window
  document.addEventListener('mouseleave', handleMouseLeave);
  
  return {
    update(newOptions) {
      radius = newOptions.radius ?? radius;
      force = newOptions.force ?? force;
    },
    destroy() {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
      node.style.transform = '';
      node.style.transition = '';
    }
  };
}
