window.addEventListener('load', () => {
  const left = document.querySelector('.left');
  const right = document.querySelector('.right');
  const slider = document.querySelector('.slider');
  const images = document.querySelectorAll('.image');
  const bottom = document.querySelector('.bottom');
  const frame = document.querySelector('.frame');

  let slideNumber = 0;
  const length = images.length;

  /* ✅ ALWAYS use frame width (mobile safe) */
  let slideWidth = frame.clientWidth;

  const updateWidth = () => {
    slideWidth = frame.clientWidth;
    slider.style.transform = `translateX(-${slideNumber * slideWidth}px)`;
  };

  window.addEventListener('resize', updateWidth);

  /* ===== DOT BUTTONS ===== */
  for (let i = 0; i < length; i++) {
    const dot = document.createElement('div');
    dot.className = 'button';
    bottom.appendChild(dot);
  }

  const buttons = document.querySelectorAll('.button');

  const updateDots = () => {
    buttons.forEach(btn => btn.style.backgroundColor = 'transparent');
    buttons[slideNumber].style.backgroundColor = '#A0522D';
  };

  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      slideNumber = i;
      slider.style.transform = `translateX(-${slideWidth * slideNumber}px)`;
      updateDots();
    });
  });

  updateDots();

  /* ===== SLIDE CONTROL ===== */
  const nextSlide = () => {
    slideNumber = (slideNumber + 1) % length;
    slider.style.transform = `translateX(-${slideWidth * slideNumber}px)`;
    updateDots();
  };

  const prevSlide = () => {
    slideNumber = (slideNumber - 1 + length) % length;
    slider.style.transform = `translateX(-${slideWidth * slideNumber}px)`;
    updateDots();
  };

  right.addEventListener('click', nextSlide);
  left.addEventListener('click', prevSlide);

  /* ===== AUTO SLIDE ===== */
  let interval = setInterval(nextSlide, 2500);

  const stopAuto = () => clearInterval(interval);
  const startAuto = () => interval = setInterval(nextSlide, 2500);

  /* DESKTOP HOVER */
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  /* MOBILE TOUCH SUPPORT */
  slider.addEventListener('touchstart', stopAuto);
  slider.addEventListener('touchend', startAuto);
});



/* ================= PRODUCT ANIMATION ================= */

const productSection = document.querySelector('#products');
const productCards = document.querySelectorAll('.product-card');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        productCards.forEach(card => card.classList.add('show'));
        observer.disconnect();
      }
    });
  }, { threshold: 0.25 });

  observer.observe(productSection);
} else {
  /* Fallback for old mobiles */
  productCards.forEach(card => card.classList.add('show'));
}



/* ================= PRODUCT TOGGLE (MOBILE SAFE) ================= */

function toggleDesc(img) {
  const card = img.closest('.product-card');

  document.querySelectorAll('.product-card').forEach(c => {
    if (c !== card) c.classList.remove('active');
  });

  card.classList.toggle('active');
}



/* ================= CONTACT SECTION ANIMATION ================= */

const contactSection = document.querySelector('.contact-section');

if ('IntersectionObserver' in window) {
  const contactObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        contactSection.classList.add('active');
        contactObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  contactObserver.observe(contactSection);
} else {
  contactSection.classList.add('active');
}
