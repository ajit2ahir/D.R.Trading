
window.addEventListener('load', () => {
  const left = document.querySelector('.left');
  const right = document.querySelector('.right');
  const slider = document.querySelector('.slider');
  const images = document.querySelectorAll('.image');
  const bottom = document.querySelector('.bottom');
  const frame = document.querySelector('.frame');

  let slideNumber = 0;
  const length = images.length;

  /* ===== RESPONSIVE WIDTH ===== */
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

    btn.addEventListener('mouseenter', stopAuto);
    btn.addEventListener('mouseleave', startAuto);
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

  function stopAuto() {
    clearInterval(interval);
  }

  function startAuto() {
    interval = setInterval(nextSlide, 2500);
  }

  /* ===== PAUSE ON HOVER ===== */
  frame.addEventListener('mouseenter', stopAuto);
  frame.addEventListener('mouseleave', startAuto);
  left.addEventListener('mouseenter', stopAuto);
  right.addEventListener('mouseenter', stopAuto);
  left.addEventListener('mouseleave', startAuto);
  right.addEventListener('mouseleave', startAuto);

  /* ===== MOBILE SWIPE SUPPORT ===== */
  let startX = 0;
  let endX = 0;

  frame.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    stopAuto();
  }, { passive: true });

  frame.addEventListener('touchmove', (e) => {
    endX = e.touches[0].clientX;
  }, { passive: true });

  frame.addEventListener('touchend', () => {
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
    }
    startAuto();
  });

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







document
.getElementById("quoteForm")
.addEventListener("submit", async function(e){

  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    company: document.getElementById("company").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    country: document.getElementById("country").value,
    product: document.getElementById("product").value,
    quantity: document.getElementById("quantity").value,
    message: document.getElementById("message").value
  };

  console.log(data);

  document.getElementById("successMessage").innerHTML =
  "Thank you. We received your inquiry.";

});
