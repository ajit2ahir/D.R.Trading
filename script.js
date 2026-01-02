window.addEventListener('load', () => {
  const left = document.querySelector('.left');
  const right = document.querySelector('.right');
  const slider = document.querySelector('.slider');
  const images = document.querySelectorAll('.image');
  const bottom = document.querySelector('.bottom');

  let slideNumber = 1;
  const length = images.length;

  // ✅ detect actual width (if fails, use fallback 1025)
  let slideWidth = images[0].clientWidth || 1025;

  // ✅ update width on resize (to keep consistent)
  window.addEventListener('resize', () => {
    slideWidth = images[0].clientWidth || 1025;
  });

  // ===== DOT BUTTONS =====
  for (let i = 0; i < length; i++) {
    const div = document.createElement('div');
    div.className = 'button';
    bottom.appendChild(div);
  }

  const buttons = document.querySelectorAll('.button');
  buttons[0].style.backgroundColor = '#A0522D';

  const resetbg = () => {
    buttons.forEach((button) => {
      button.style.backgroundColor = 'transparent';
      button.addEventListener('mouseover', stopslideshow);
      button.addEventListener('mouseout', startslideshow);
    });
  };

  buttons.forEach((button, i) => {
    button.addEventListener('click', () => {
      resetbg();
      slider.style.transform = `translateX(-${i * slideWidth}px)`;
      slideNumber = i + 1;
      button.style.backgroundColor = '#A0522D';
    });
  });

  const changecolor = () => {
    resetbg();
    buttons[slideNumber - 1].style.backgroundColor = '#A0522D';
  };

  // ===== SLIDE MOVEMENTS =====
  const nextslide = () => {
    slider.style.transform = `translateX(-${slideNumber * slideWidth}px)`;
    slideNumber++;
  };
  const prevslide = () => {
    slider.style.transform = `translateX(-${(slideNumber - 2) * slideWidth}px)`;
    slideNumber--;
  };
  const getfirstslide = () => {
    slider.style.transform = `translateX(0px)`;
    slideNumber = 1;
  };
  const getlastslide = () => {
    slider.style.transform = `translateX(-${(length - 1) * slideWidth}px)`;
    slideNumber = length;
  };

  right.addEventListener('click', () => {
    slideNumber < length ? nextslide() : getfirstslide();
    changecolor();
  });
  left.addEventListener('click', () => {
    slideNumber > 1 ? prevslide() : getlastslide();
    changecolor();
  });

  // ===== AUTO SLIDE =====
  let slideinterval;
  const startslideshow = () => {
    slideinterval = setInterval(() => {
      slideNumber < length ? nextslide() : getfirstslide();
      changecolor();
    }, 2500);
  };

  const stopslideshow = () => {
    clearInterval(slideinterval);
  };

  startslideshow();

  // ===== HOVER PAUSE =====
  slider.addEventListener('mouseover', stopslideshow);
  slider.addEventListener('mouseout', startslideshow);
  right.addEventListener('mouseover', stopslideshow);
  right.addEventListener('mouseout', startslideshow);
  left.addEventListener('mouseover', stopslideshow);
  left.addEventListener('mouseout', startslideshow);
});






/* =========================
   PRODUCT SCROLL ANIMATION
========================= */

const productSection = document.querySelector('#products');
const productCards = document.querySelectorAll('.product-card');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        productCards.forEach(card => {
          card.classList.add('show');
        });
        observer.unobserve(productSection); // run only once
      }
    });
  },
  { threshold: 0.25 } // triggers when 25% visible
);

observer.observe(productSection);

/* =========================
   PRODUCT DESCRIPTION TOGGLE
========================= */

function toggleDesc(img) {
  const card = img.closest('.product-card');
  const desc = card.querySelector('.product-desc');

  document.querySelectorAll('.product-card').forEach(c => {
    if (c !== card) {
      c.classList.remove('active');
      c.querySelector('.product-desc').style.display = "none";
    }
  });

  if (card.classList.contains('active')) {
    card.classList.remove('active');
    desc.style.display = "none";
  } else {
    card.classList.add('active');
    desc.style.display = "block";
  }
}





/* ================= CONTACT SECTION SCROLL ANIMATION ================= */


// CONTACT SECTION SCROLL ANIMATION
const contactSection = document.querySelector('.contact-section');

const contactObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      contactSection.classList.add('active');
      contactObserver.unobserve(contactSection);
    }
  });
}, {
  threshold: 0.35
});

contactObserver.observe(contactSection);
