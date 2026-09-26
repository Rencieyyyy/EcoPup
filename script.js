// Mobile nav toggle (side drawer with overlay)
const burgerBtn = document.getElementById('burgerBtn');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

function openMenu(){
  navLinks.classList.add('open');
  navOverlay.classList.add('active');
  burgerBtn.classList.add('active');
  burgerBtn.setAttribute('aria-expanded', 'true');
  document.body.classList.add('nav-open');
}

function closeMenu(){
  navLinks.classList.remove('open');
  navOverlay.classList.remove('active');
  burgerBtn.classList.remove('active');
  burgerBtn.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');
}

if (burgerBtn && navLinks && navOverlay) {
  burgerBtn.addEventListener('click', () => {
    navLinks.classList.contains('open') ? closeMenu() : openMenu();
  });

  navOverlay.addEventListener('click', closeMenu);

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

// Scroll reveal animation
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');

if (revealEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealEls.forEach(el => observer.observe(el));
}

// Contact form → opens Gmail pre-filled
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const contact = form.contact.value.trim();
    const quantity = form.quantity.value.trim();
    const message = form.message.value.trim();

    const subject = `Order/Inquiry from ${name}`;
    const body =
      `Name: ${name}\n` +
      `Contact Number / Email: ${contact}\n` +
      (quantity ? `Quantity: ${quantity}\n` : '') +
      `Message: ${message}`;

    const gmailURL =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=ecopupawfectbites@gmail.com` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(gmailURL, '_blank');
  });
}