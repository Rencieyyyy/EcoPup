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

// EmailJS init
emailjs.init("i1Lb8640yMSpVYeUz");

// Contact form → sends silently via EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    const templateParams = {
      from_name: form.name.value.trim(),
      contact: form.contact.value.trim(),
      quantity: form.quantity.value.trim() || 'Not specified',
      message: form.message.value.trim()
    };

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    emailjs.send('service_oj04jki', 'template_70rxi44', templateParams)
      .then(function() {
        submitBtn.textContent = 'Message Sent! ✓';
        form.reset();
        setTimeout(() => {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }, 3000);
      })
      .catch(function(error) {
        console.error('EmailJS error:', error);
        submitBtn.textContent = 'Failed — try again';
        submitBtn.disabled = false;
        setTimeout(() => { submitBtn.textContent = originalBtnText; }, 3000);
      });
  });
}

// Sale popup — shows once per session, a couple seconds after load
const saleOverlay = document.getElementById('saleOverlay');
const saleClose = document.getElementById('saleClose');
const saleCta = document.getElementById('saleCta');

if (saleOverlay) {
  const alreadyShown = sessionStorage.getItem('saleShown');

  if (!alreadyShown) {
    setTimeout(() => {
      saleOverlay.classList.add('active');
      sessionStorage.setItem('saleShown', 'true');
    }, 2000);
  }

  function closeSalePopup(){
    saleOverlay.classList.remove('active');
  }

  saleClose.addEventListener('click', closeSalePopup);
  saleOverlay.addEventListener('click', (e) => {
    if (e.target === saleOverlay) closeSalePopup();
  });
  saleCta.addEventListener('click', closeSalePopup);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSalePopup();
  });
}