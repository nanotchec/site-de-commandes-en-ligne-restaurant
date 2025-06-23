// Scroll fade-in animation avec translate Y
window.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Une fois la section visible, on la fait apparaître et remonter
        entry.target.classList.add('opacity-100', 'translate-y-0');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Pour chaque section ciblée, on ajoute les classes initiales
  document.querySelectorAll('.fade-in-section').forEach((section) => {
    section.classList.add(
      'opacity-0',       // invisible au départ
      'translate-y-8',   // 2 rem vers le bas
      'transition-all',  // transition sur toutes les propriétés
      'duration-700'     // durée 700 ms
    );
    observer.observe(section);
  });
});