// Update these placeholders once to change contact details across the website.
const PHONE_NUMBER = "91XXXXXXXXXX";
const WHATSAPP_NUMBER = "91XXXXXXXXXX";
const EMAIL = "hello@example.com";
const ADDRESS = "Add clinic address here";
const WORKING_HOURS = "Add clinic working hours";

const pages = [
  ["home", "Home", "index.html"],
  ["conditions", "Conditions", "conditions.html"],
  ["treatment", "Treatment", "treatment.html"],
  ["products", "Products", "products.html"],
  ["about", "About", "about.html"],
  ["contact", "Contact", "contact.html"],
];
const currentPage = document.body.dataset.page || "home";
const whatsappUrl = (message = "Hello Shri Ayurveda, I would like to know more.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
const phoneUrl = `tel:+${PHONE_NUMBER}`;
const emailUrl = `mailto:${EMAIL}`;
const addressQuery = encodeURIComponent(ADDRESS.includes("Add clinic") ? "India" : ADDRESS);
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;

const headerPlaceholder = document.querySelector("#site-header");
const footerPlaceholder = document.querySelector("#site-footer");
const floatingPlaceholder = document.querySelector("#floating-contact");
const navigation = pages.map(([key, label, href]) =>
  `<a href="${href}"${currentPage === key ? ' aria-current="page"' : ""}>${label}</a>`,
).join("");

if (headerPlaceholder) {
  headerPlaceholder.innerHTML = `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="index.html" aria-label="Shri Ayurveda home">
          <img src="image%20folder/logo-hd-2048.png" alt="Shri Ayurveda Wellness Solution logo">
          <span><strong>Shri Ayurveda</strong><small>Wellness Solution</small></span>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span><span></span><span></span></button>
        <nav class="primary-nav" id="primary-nav" aria-label="Main navigation">
          ${navigation}
          <a class="nav-contact" data-phone-link href="${phoneUrl}">Talk to us <span aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>`;
}

if (footerPlaceholder) {
  footerPlaceholder.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-main">
          <div class="footer-about">
            <a class="brand footer-brand" href="index.html" aria-label="Shri Ayurveda home"><img src="image%20folder/logo-hd-2048.png" alt=""><span><strong>Shri Ayurveda</strong><small>Wellness Solution</small></span></a>
            <p>Personal Ayurvedic guidance and product enquiries, shared with care and respect.</p>
          </div>
          <div><h2>Explore</h2><nav class="footer-links" aria-label="Footer navigation">${pages.map(([, label, href]) => `<a href="${href}">${label}</a>`).join("")}</nav></div>
          <div><h2>Contact</h2><a data-phone-link href="${phoneUrl}"><span data-phone-text>${PHONE_NUMBER}</span></a><a data-email-link href="${emailUrl}"><span data-email-text>${EMAIL}</span></a><span data-address-text>${ADDRESS}</span></div>
        </div>
        <div class="footer-disclaimer"><p><strong>Health note:</strong> Results vary. Please consult a qualified practitioner. Website information is for general awareness and is not a substitute for medical examination. Seek prompt care for severe or worsening symptoms.</p></div>
        <div class="footer-bottom"><span>© ${new Date().getFullYear()} Shri Ayurveda. All rights reserved.</span><a href="index.html">Back to home ↑</a></div>
      </div>
    </footer>`;
}

if (floatingPlaceholder) {
  floatingPlaceholder.innerHTML = `
    <div class="floating-actions" aria-label="Quick contact">
      <a class="floating-button floating-whatsapp" data-whatsapp-link href="${whatsappUrl()}" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
        <span class="floating-label" aria-hidden="true">WhatsApp</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.3 11.8a8.3 8.3 0 0 1-12.2 7.3L3.7 20l.9-4.2a8.3 8.3 0 1 1 15.7-4Z"/><path d="M8.2 7.8c-.2.3-.5.7-.5 1.2 0 .4.2.9.5 1.4.8 1.4 2.1 2.6 3.6 3.3.5.2.9.4 1.3.4.5 0 .9-.2 1.2-.5l.5-.7c.1-.2.1-.4-.1-.5l-1.5-.7c-.2-.1-.4 0-.5.2l-.5.6c-.1.1-.2.2-.4.1-.6-.2-1.2-.6-1.7-1.1-.5-.5-.9-1.1-1.1-1.7-.1-.2 0-.3.1-.4l.5-.5c.2-.2.2-.3.1-.5l-.7-1.5c-.1-.2-.3-.2-.5-.1Z"/></svg>
      </a>
      <a class="floating-button floating-call" data-phone-link href="${phoneUrl}" aria-label="Call Shri Ayurveda" title="Call Shri Ayurveda">
        <span class="floating-label" aria-hidden="true">Call us</span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 3.5 9.4 3c.6-.1 1.1.2 1.3.7l1.1 2.7c.2.5.1 1-.3 1.4l-1.4 1.1a14 14 0 0 0 5 5l1.1-1.4c.3-.4.9-.5 1.4-.3l2.7 1.1c.5.2.8.8.7 1.3l-.5 2.3c-.1.6-.7 1.1-1.3 1.1A16.5 16.5 0 0 1 3.7 4.8c0-.6.4-1.2 1.1-1.3Z"/></svg>
      </a>
    </div>`;
}

document.body.classList.add("js-enabled");
document.querySelectorAll("[data-phone-link]").forEach((link) => { link.href = phoneUrl; });
document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  const productName = link.dataset.product;
  const message = productName
    ? `Hello Shri Ayurveda, I would like to enquire about ${productName}. Please share the details and availability.`
    : undefined;
  link.href = whatsappUrl(message);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});
document.querySelectorAll("[data-email-link]").forEach((link) => { link.href = emailUrl; });
document.querySelectorAll("[data-phone-text]").forEach((element) => { element.textContent = PHONE_NUMBER; });
document.querySelectorAll("[data-email-text]").forEach((element) => { element.textContent = EMAIL; });
document.querySelectorAll("[data-address-text]").forEach((element) => { element.textContent = ADDRESS; });
document.querySelectorAll("[data-hours-text]").forEach((element) => { element.textContent = WORKING_HOURS; });
document.querySelectorAll("[data-map-link]").forEach((link) => { link.href = mapUrl; });
const mapFrame = document.querySelector("[data-map-frame]");
if (mapFrame) mapFrame.src = `https://www.google.com/maps?q=${addressQuery}&output=embed`;

const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector("#primary-nav");
if (menuToggle && primaryNav) {
  const setMenuOpen = (open) => {
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    primaryNav.classList.toggle("is-open", open);
  };
  menuToggle.addEventListener("click", () => setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true"));
  primaryNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });
}

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    document.querySelectorAll(".product-card[data-product-category]").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.productCategory !== filter;
    });
  });
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const wasOpen = button.getAttribute("aria-expanded") === "true";
    document.querySelectorAll(".faq-question").forEach((question) => {
      question.setAttribute("aria-expanded", "false");
      question.closest(".faq-item").querySelector(".faq-answer").hidden = true;
    });
    if (!wasOpen) {
      button.setAttribute("aria-expanded", "true");
      button.closest(".faq-item").querySelector(".faq-answer").hidden = false;
    }
  });
});

const testimonialSlider = document.querySelector("[data-testimonials]");
if (testimonialSlider) {
  const testimonials = [...testimonialSlider.querySelectorAll(".testimonial-card")];
  let testimonialIndex = 0;
  const showTestimonial = (index) => {
    testimonialIndex = (index + testimonials.length) % testimonials.length;
    testimonials.forEach((item, itemIndex) => {
      const active = itemIndex === testimonialIndex;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-hidden", String(!active));
    });
  };
  document.querySelector(".testimonial-prev")?.addEventListener("click", () => showTestimonial(testimonialIndex - 1));
  document.querySelector(".testimonial-next")?.addEventListener("click", () => showTestimonial(testimonialIndex + 1));
  showTestimonial(0);
}

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

const contactForm = document.querySelector("#contact-form");
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get("name")).trim();
  const contact = String(formData.get("contact")).trim();
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message")).trim();
  const text = `Hello Shri Ayurveda, my name is ${name}. My phone or WhatsApp number is ${contact}.${email ? ` My email is ${email}.` : ""} ${message}`;
  const status = contactForm.querySelector(".form-status");
  if (!name || !contact || !message) {
    if (status) status.textContent = "Please complete your name, contact number and message.";
    return;
  }
  if (status) status.textContent = "WhatsApp will open with your message. Review it and choose whether to send.";
  window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
});
