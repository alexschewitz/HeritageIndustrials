// =========================================
// Heritage Industrials — Landing Page JS
// =========================================

document.addEventListener('DOMContentLoaded', () => {

  // -----------------------------------------
  // Navigation scroll effect
  // -----------------------------------------
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // -----------------------------------------
  // Mobile menu toggle
  // -----------------------------------------
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // -----------------------------------------
  // Scroll reveal animation
  // -----------------------------------------
  const revealElements = document.querySelectorAll(
    '.section-header, .section-label, .section-title, ' +
    '.about-text, .about-stats, ' +
    '.division-block, .feature-card, .mfg-card, ' +
    '.vision-content, .contact-info, .contact-form'
  );

  revealElements.forEach(el => {
    el.classList.add('reveal');
  });

  // Add staggered delays to cards
  document.querySelectorAll('.feature-card, .mfg-card').forEach((card, i) => {
    card.classList.add(`reveal-delay-${(i % 4) + 1}`);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // -----------------------------------------
  // Smooth scroll for anchor links
  // -----------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // -----------------------------------------
  // Contact form handling
  // -----------------------------------------
  const contactForm = document.getElementById('contactForm');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent!';
    btn.style.background = '#27ae60';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });

});
