// ====== ArchiPage interactions ======

// Navbar shadow on scroll
const nav = document.querySelector('.navbar');
const setNavStyle = () => {
  if (window.scrollY > 6) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
setNavStyle();
window.addEventListener('scroll', setNavStyle);

// Mobile hamburger toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Reveal on scroll (IntersectionObserver)
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Lightweight parallax for blobs/hero
document.addEventListener('mousemove', (e) => {
  const parallaxEls = document.querySelectorAll('.parallax');
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  const dx = (e.clientX - cx) / cx;
  const dy = (e.clientY - cy) / cy;
  parallaxEls.forEach(el => {
    const depth = parseFloat(el.getAttribute('data-depth') || 10);
    el.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
  });
});

// Testimonials auto-rotate
const quotes = document.querySelectorAll('.testimonials .quote');
if (quotes.length) {
  let i = 0;
  setInterval(() => {
    quotes[i].classList.remove('active');
    i = (i + 1) % quotes.length;
    quotes[i].classList.add('active');
  }, 4500);
}

// Portfolio filters
const grid = document.getElementById('folioGrid');
const filterBar = document.getElementById('filters');
if (grid && filterBar) {
  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    filterBar.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    grid.querySelectorAll('.folio-card').forEach(card => {
      const cat = card.getAttribute('data-cat');
      card.style.display = (f === 'all' || f === cat) ? '' : 'none';
    });
  });
}
