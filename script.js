(function () {
  // Hearts on click (if button exists)
  const btn = document.getElementById('btn-hearts');
  let heartsLayer = document.querySelector('.hearts-layer');
  if (!heartsLayer) {
    heartsLayer = document.createElement('div');
    heartsLayer.className = 'hearts-layer';
    document.body.appendChild(heartsLayer);
  }

  function spawnHeart(x, y) {
    const el = document.createElement('div');
    el.className = 'heart-float';
    el.textContent = '❤';
    const left = x + (Math.random() * 40 - 20);
    const top = y + (Math.random() * 12 - 6);
    el.style.left = left + 'px';
    el.style.top = top + 'px';
    el.style.transform = `translateY(0) rotate(${Math.random() * 30 - 15}deg)`;
    el.style.fontSize = (12 + Math.random() * 10) + 'px';
    el.style.opacity = String(0.8 + Math.random() * 0.2);
    heartsLayer.appendChild(el);
    setTimeout(() => el.remove(), 2600);
  }

  if (btn) {
    btn.addEventListener('click', () => {
      const rect = btn.getBoundingClientRect();
      const originX = rect.left + rect.width / 2 + window.scrollX;
      const originY = rect.top + rect.height / 2 + window.scrollY;
      for (let i = 0; i < 24; i++) {
        setTimeout(() => spawnHeart(originX, originY), i * 40);
      }
    });
  }

  // Flower bouquet on page load
  const prefersReduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduceMotion) {
    let flowersLayer = document.querySelector('.flowers-layer');
    if (!flowersLayer) {
      flowersLayer = document.createElement('div');
      flowersLayer.className = 'flowers-layer';
      document.body.appendChild(flowersLayer);
    }

    function burstFlowers() {
      const hero = document.querySelector('.hero');
      const rect = (hero || document.body).getBoundingClientRect();
      const originX = rect.left + rect.width / 2 + window.scrollX;
      const originY = rect.top + rect.height / 2 + window.scrollY;
      const emojis = ['🌸','🌺','🌷','🌹','🌻','🌼'];
      const count = 26;
      for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.className = 'flower';
        el.textContent = emojis[i % emojis.length];
        el.style.left = originX + 'px';
        el.style.top = originY + 'px';
        const angle = Math.random() * Math.PI * 2;
        const radius = 140 + Math.random() * 220;
        const dx = Math.cos(angle) * radius;
        const dy = Math.sin(angle) * radius;
        el.style.setProperty('--dx', dx + 'px');
        el.style.setProperty('--dy', dy + 'px');
        el.style.setProperty('--rz', (Math.random() * 120 - 60) + 'deg');
        el.style.fontSize = (18 + Math.random() * 10) + 'px';
        el.style.animationDelay = (Math.random() * 0.15) + 's';
        flowersLayer.appendChild(el);
        el.addEventListener('animationend', () => el.remove());
      }
    }

    window.addEventListener('load', () => {
      setTimeout(burstFlowers, 350);
    });
  }
})();


