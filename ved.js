// Change these contact details once to update the shared site-wide links.
const PHONE = "91XXXXXXXXXX";
const ADDRESS = "Add address here";

const whatsappNumber = PHONE;
const whatsappUrl = (message = "Hello Shri Ayurveda, I would like to know more.") =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

const pages = [
  ["home", "Home", "index.html"],
  ["conditions", "Conditions", "conditions.html"],
  ["treatment", "Treatment", "treatment.html"],
  ["products", "Products", "products.html"],
  ["about", "About", "about.html"],
  ["contact", "Contact", "contact.html"],
];
const currentPage = document.body.dataset.page || "home";
const navigation = pages.map(([key, label, href]) =>
  `<a href="${href}"${currentPage === key ? ' aria-current="page"' : ""}>${label}</a>`,
).join("");

// Shared page chrome is rendered once here and mounted on every page.
document.querySelector("#site-header").innerHTML = `
  <header class="site-header">
    <div class="header-inner container">
      <a class="brand" href="index.html" aria-label="Shri Ayurveda home">
        <img src="image%20folder/logo-hd-2048.png" alt="Shri Ayurveda Wellness Solution logo">
        <span class="brand-copy"><strong>Shri Ayurveda</strong><small>Wellness Solution</small></span>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span><span></span><span></span></button>
      <nav class="primary-nav" id="primary-nav" aria-label="Main navigation">
        ${navigation}
        <a class="nav-cta" data-phone-link href="tel:+${whatsappNumber}">Talk to us <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>`;

document.querySelector("#site-footer").innerHTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="footer-main">
        <a class="brand footer-brand" href="index.html" aria-label="Shri Ayurveda home"><img src="image%20folder/logo-hd-2048.png" alt=""><span class="brand-copy"><strong>Shri Ayurveda</strong><small>Wellness Solution</small></span></a>
        <p>Ayurvedic care and guidance for sensitive health concerns, with respect at every step.</p>
        <nav class="footer-links" aria-label="Footer navigation">${pages.slice(1).map(([, label, href]) => `<a href="${href}">${label}</a>`).join("")}</nav>
      </div>
      <div class="footer-disclaimer"><strong>Important note</strong><p>The information on this website is for general awareness only and is not a substitute for a medical examination. Please consult a qualified practitioner before starting any treatment. Results may vary from person to person.</p><p class="image-attribution">Illustrative photos: <a href="https://commons.wikimedia.org/wiki/File:Darjeeling,_India,_Indian_spices,_seeds_and_nuts.jpg" target="_blank" rel="noopener noreferrer">Vyacheslav Argenberg</a> (CC BY 4.0) and <a href="https://commons.wikimedia.org/wiki/File:Making_herbal_oil_a_pain_remedy.jpg" target="_blank" rel="noopener noreferrer">Mnv179</a> (CC BY-SA 4.0).</p></div>
      <div class="footer-bottom"><span>© <span id="copyright-year">${new Date().getFullYear()}</span> Shri Ayurveda. All rights reserved.</span><a href="index.html">Back to home ↑</a></div>
    </div>
  </footer>`;

document.querySelector("#floating-contact").innerHTML = `
  <div class="floating-actions" aria-label="Quick contact">
    <a class="floating-button floating-whatsapp" data-whatsapp-link href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
      <span class="floating-label" aria-hidden="true">Chat on WhatsApp</span>
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path d="M20.3 11.8a8.3 8.3 0 0 1-12.2 7.3L3.7 20l.9-4.2a8.3 8.3 0 1 1 15.7-4Z"/><path d="M8.2 7.8c-.2.3-.5.7-.5 1.2 0 .4.2.9.5 1.4.8 1.4 2.1 2.6 3.6 3.3.5.2.9.4 1.3.4.5 0 .9-.2 1.2-.5l.5-.7c.1-.2.1-.4-.1-.5l-1.5-.7c-.2-.1-.4 0-.5.2l-.5.6c-.1.1-.2.2-.4.1-.6-.2-1.2-.6-1.7-1.1-.5-.5-.9-1.1-1.1-1.7-.1-.2 0-.3.1-.4l.5-.5c.2-.2.2-.3.1-.5l-.7-1.5c-.1-.2-.3-.2-.5-.1Z"/></svg>
    </a>
    <a class="floating-button floating-call" data-phone-link href="tel:+${whatsappNumber}" aria-label="Call Shri Ayurveda" title="Call Shri Ayurveda">
      <span class="floating-label" aria-hidden="true">Call us</span>
      <svg viewBox="0 0 24 24" role="img" aria-hidden="true"><path d="M7.1 3.5 9.4 3c.6-.1 1.1.2 1.3.7l1.1 2.7c.2.5.1 1-.3 1.4l-1.4 1.1a14 14 0 0 0 5 5l1.1-1.4c.3-.4.9-.5 1.4-.3l2.7 1.1c.5.2.8.8.7 1.3l-.5 2.3c-.1.6-.7 1.1-1.3 1.1A16.5 16.5 0 0 1 3.7 4.8c0-.6.4-1.2 1.1-1.3Z"/></svg>
    </a>
  </div>`;

document.body.classList.add("js-enabled");

document.querySelectorAll("[data-phone-link]").forEach((link) => {
  link.href = `tel:+${whatsappNumber}`;
});
document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  const productName = link.dataset.product;
  link.href = whatsappUrl(productName
    ? `Hello Shri Ayurveda, I would like to enquire about ${productName}. Please share the price and availability.`
    : undefined);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});
document.querySelectorAll("[data-phone-text]").forEach((element) => {
  element.textContent = PHONE;
});
document.querySelectorAll("[data-address-text]").forEach((element) => {
  element.textContent = ADDRESS;
});

// Mobile navigation opens and closes with the menu button or a navigation link.
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  primaryNav.classList.toggle("is-open", isOpen);
}
menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});
primaryNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

// Product photos share one crop and frame; reduced-motion users get a manual slider.
const slider = document.querySelector("[data-slider]");
if (slider) {
  const slides = [...slider.querySelectorAll(".hero-slide")];
  const dots = [...slider.querySelectorAll(".slider-dot")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let activeIndex = 0;
  let timer;
  let pointerStartX = null;

  const stopAutoplay = () => {
    window.clearTimeout(timer);
    timer = undefined;
  };
  const startAutoplay = () => {
    stopAutoplay();
    if (reduceMotion.matches || slider.matches(":hover") || document.hidden) return;
    timer = window.setTimeout(() => {
      showSlide(activeIndex + 1, false);
      startAutoplay();
    }, 4000);
  };
  function showSlide(index, restart = true) {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      if (isActive) slide.loading = "eager";
    });
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", String(isActive));
    });
    if (restart) startAutoplay();
  }

  slider.querySelector(".slider-previous").addEventListener("click", () => showSlide(activeIndex - 1));
  slider.querySelector(".slider-next").addEventListener("click", () => showSlide(activeIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener("click", () => showSlide(index)));
  slider.addEventListener("mouseenter", stopAutoplay);
  slider.addEventListener("mouseleave", startAutoplay);
  slider.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") pointerStartX = event.clientX;
  });
  slider.addEventListener("pointerup", (event) => {
    if (pointerStartX === null) return;
    const swipeDistance = event.clientX - pointerStartX;
    pointerStartX = null;
    if (Math.abs(swipeDistance) > 45) showSlide(activeIndex + (swipeDistance < 0 ? 1 : -1));
  });
  slider.addEventListener("pointercancel", () => { pointerStartX = null; });
  slider.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showSlide(activeIndex - 1);
    if (event.key === "ArrowRight") showSlide(activeIndex + 1);
  });
  document.addEventListener("visibilitychange", startAutoplay);
  if (reduceMotion.addEventListener) {
    reduceMotion.addEventListener("change", startAutoplay);
  } else {
    reduceMotion.addListener(startAutoplay);
  }
  showSlide(0, false);
  startAutoplay();
}

// Condition cards reveal additional information without leaving the page.
document.querySelectorAll(".condition-more").forEach((button) => {
  button.addEventListener("click", () => {
    const detail = button.nextElementSibling;
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    detail.hidden = isExpanded;
    button.firstChild.textContent = isExpanded ? "Learn more " : "Show less ";
  });
});

// Product filters display an explanation for categories without listed products.
const productCards = [...document.querySelectorAll(".product-card[data-product-category]")];
const productGrid = document.querySelector(".product-grid:not(.featured-products)");
if (productGrid && productCards.length) {
  const emptyMessage = document.createElement("p");
  emptyMessage.className = "product-note";
  emptyMessage.setAttribute("role", "status");
  emptyMessage.textContent = "No products are listed in this category yet. Contact us to ask about availability.";
  emptyMessage.hidden = true;
  productGrid.after(emptyMessage);
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;
      document.querySelectorAll(".filter-button").forEach((filterButton) => {
        const isActive = filterButton === button;
        filterButton.classList.toggle("is-active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });
      let visibleCount = 0;
      productCards.forEach((card) => {
        const isVisible = selectedFilter === "all" || card.dataset.productCategory === selectedFilter;
        card.hidden = !isVisible;
        if (isVisible) visibleCount += 1;
      });
      emptyMessage.hidden = visibleCount > 0;
    });
  });
}

// FAQ rows work as an accessible accordion, one answer at a time.
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const wasExpanded = button.getAttribute("aria-expanded") === "true";
    document.querySelectorAll(".faq-question").forEach((question) => {
      question.setAttribute("aria-expanded", "false");
      question.closest(".faq-item").querySelector(".faq-answer").hidden = true;
    });
    if (!wasExpanded) {
      button.setAttribute("aria-expanded", "true");
      button.closest(".faq-item").querySelector(".faq-answer").hidden = false;
    }
  });
});

// Progressive reveal keeps content visible when the browser lacks observer support.
const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// The contact form prepares a WhatsApp message and never submits data to a server.
const contactForm = document.querySelector("#contact-form");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get("name")).trim();
  const contact = String(formData.get("contact")).trim();
  const message = String(formData.get("message")).trim();
  const text = `Hello Shri Ayurveda, my name is ${name}. My phone or WhatsApp number is ${contact}. ${message}`;
  window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
});
