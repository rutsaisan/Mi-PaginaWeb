const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

toggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  toggle.textContent = isOpen ? '×' : '☰';
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
  if (toggle) {
    toggle.textContent = '☰';
    toggle.setAttribute('aria-label', 'Abrir menú');
  }
}));

// Animaciones discretas al entrar en pantalla, con soporte para movimiento reducido.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduceMotion) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(section => observer.observe(section));
} else {
  document.querySelectorAll('.reveal').forEach(section => section.classList.add('is-visible'));
}
