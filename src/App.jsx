import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Clock3,
  Heart,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { CONTACT, emailHref, mapDirectionsUrl, mapEmbedUrl, phoneHref, whatsappHref } from "./config.js";
import { localAssets } from "./assets.js";

const image = (id, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Conditions", to: "/conditions" },
  { label: "Treatment", to: "/treatment" },
  { label: "Products", to: "/products" },
  { label: "Contact", to: "/contact" },
];

const conditions = [
  {
    name: "Piles",
    intro: "Swelling or lumps (masses) that may come out of the anus.",
    image: image("photo-1547887538-e3a2f32cb1cc", 720),
    alt: "Green leaves and botanical ingredients",
  },
  {
    name: "Fissure",
    intro: "A tear or crack in the anal area that can cause pain, burning and bleeding.",
    image: image("photo-1515377905703-c4788e51af15", 720),
    alt: "A calm wellness setting with natural light",
  },
  {
    name: "Fistula",
    intro: "A small passage or boil near the anus, sometimes with sticky discharge.",
    image: image("photo-1501004318641-b39e6451bec6", 720),
    alt: "Green botanical leaves in sunlight",
  },
  {
    name: "Bhagandar",
    intro: "Heavy bleeding, severe burning or pain can need prompt medical attention.",
    image: image("photo-1470252649378-9c29740c9fa8", 720),
    alt: "Soft morning light over a green garden",
  },
];

const productPhotos = [
  { name: "Shri Ayurveda Piles Care", src: localAssets.products[0] },
  { name: "Shri Ayurveda Piles Care", src: localAssets.products[1] },
  { name: "Shri Ayurveda Piles Care", src: localAssets.products[2] },
  { name: "Shri Ayurveda Piles Care", src: localAssets.products[3] },
];

const steps = [
  ["01", "Contact / consultation", "Share your concern privately by phone or WhatsApp."],
  ["02", "Understand the concern", "Discuss symptoms and whether an in-person assessment may be needed."],
  ["03", "Treatment and medicine", "Ask about Ayurvedic guidance and currently available products."],
  ["04", "Follow-up and guidance", "Get in touch with further questions and next steps."],
];

const faqs = [
  ["Can you diagnose my symptoms online?", "No. Website information is for general awareness only. A qualified practitioner can assess your personal symptoms and health history."],
  ["Can I speak with you from home?", "Yes. You can start with a phone call or WhatsApp message and ask about the next step."],
  ["How do I know which product is right for me?", "Please consult a qualified practitioner before starting a medicine. Discuss your symptoms, health history, ingredients and safe use."],
  ["What should I do about heavy bleeding or severe pain?", "Seek prompt medical attention for heavy bleeding, severe pain, fever or symptoms that are getting worse. Do not delay urgent care to contact us."],
  ["How can I ask about prices and availability?", "Contact us by phone or WhatsApp for current product details, availability and prices."],
];

const revealVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: [0.2, 0.75, 0.25, 1] } },
};

function Reveal({ children, className = "", ...props }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.12 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

function ButtonLink({ to, href, children, variant = "primary", icon = true, ...props }) {
  const className = `button button-${variant}`;
  const content = <>{children}{icon && <ArrowUpRight size={16} aria-hidden="true" />}</>;
  return to
    ? <Link className={className} to={to} {...props}>{content}</Link>
    : <a className={className} href={href} {...props}>{content}</a>;
}

function SectionHeading({ eyebrow, title, text, light = false, align = "center" }) {
  return (
    <Reveal className={`section-heading ${light ? "section-heading-light" : ""} ${align === "left" ? "text-left" : ""}`}>
      <p className="eyebrow"><span />{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-lede">{text}</p>}
    </Reveal>
  );
}

function PageMeta({ title, description }) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.append(meta);
    }
    meta.content = description;
  }, [title, description]);
  return null;
}

function PageFrame({ title, description, children }) {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);
  return <><PageMeta title={title} description={description} />{children}</>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const close = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" aria-label="Shri Ayurveda home">
          <img src={localAssets.logo} alt="Shri Ayurveda Wellness Solution logo" />
          <span><strong>Shri Ayurveda</strong><small>Wellness Solution</small></span>
        </Link>
        <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`primary-nav ${open ? "is-open" : ""}`} id="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className={({ isActive }) => isActive ? "active" : ""}>{item.label}</NavLink>
          ))}
          <a className="nav-contact" href={phoneHref}>Talk to us <ArrowUpRight size={15} /></a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-about">
            <Link className="brand footer-brand" to="/"><img src={localAssets.logo} alt="" /><span><strong>Shri Ayurveda</strong><small>Wellness Solution</small></span></Link>
            <p>Personal Ayurvedic guidance and product enquiries, shared with care and respect.</p>
          </div>
          <div><h2>Explore</h2><div className="footer-links">{navItems.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}</div></div>
          <div className="footer-contact"><h2>Contact</h2><a href={phoneHref}><Phone size={14} />{CONTACT.PHONE_NUMBER}</a><a href={emailHref}><Mail size={14} />{CONTACT.EMAIL}</a><span><MapPin size={14} />{CONTACT.ADDRESS}</span></div>
        </div>
        <p className="footer-disclaimer"><strong>Health note:</strong> Results vary. Please consult a qualified practitioner. Website information is for general awareness and is not a substitute for medical examination. Seek prompt care for severe or worsening symptoms.</p>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Shri Ayurveda. All rights reserved.</span><Link to="/">Back to home ↑</Link></div>
      </div>
    </footer>
  );
}

function FloatingContact() {
  return (
    <div className="floating-actions" aria-label="Quick contact">
      <a className="floating-button floating-whatsapp" href={whatsappHref()} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
        <span className="floating-label" aria-hidden="true">WhatsApp</span><MessageCircle size={22} />
      </a>
      <a className="floating-button floating-call" href={phoneHref} aria-label="Call Shri Ayurveda" title="Call Shri Ayurveda">
        <span className="floating-label" aria-hidden="true">Call us</span><Phone size={21} />
      </a>
    </div>
  );
}

function SiteLayout() {
  return <><Header /><Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/conditions" element={<ConditionsPage />} />
    <Route path="/treatment" element={<TreatmentPage />} />
    <Route path="/products" element={<ProductsPage />} />
    <Route path="/contact" element={<ContactPage />} />
    <Route path="*" element={<HomePage />} />
  </Routes><Footer /><FloatingContact /></>;
}

function HomePage() {
  return (
    <PageFrame title="Shri Ayurveda | Personal Ayurvedic Guidance" description="Respectful Ayurvedic guidance and product enquiries for piles, fissure, fistula and bhagandar.">
      <main>
        <section className="hero">
          <img className="hero-background" src={image("photo-1545389336-cf090694435e", 2200)} alt="Calm wellness space with soft natural light" fetchpriority="high" />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <Reveal><p className="eyebrow eyebrow-light"><span />Traditional care, thoughtful guidance</p><h1>Ayurvedic care with <em>respect at every step</em></h1><p className="hero-copy">A private, personal place to ask about piles, fissure, fistula and bhagandar. Start with a conversation and understand your options in clear, simple language.</p><div className="button-row"><ButtonLink href={phoneHref} variant="gold">Call now</ButtonLink><ButtonLink href={whatsappHref()} variant="glass">Chat on WhatsApp</ButtonLink></div><p className="hero-note">Your privacy matters. Get in touch from the comfort of home.</p></Reveal>
          </div>
          <div className="hero-bottom container"><span>Shri Ayurveda</span><span>Care that listens · Guidance at your pace</span></div>
        </section>
        <TrustStrip />
        <section className="section section-cream"><div className="container split-layout"><Reveal className="image-panel"><img src={localAssets.aboutHerbs} alt="Ayurvedic herbs, spices and a mortar and pestle" width="712" height="500" loading="lazy" /><span className="image-caption">Rooted in care. Guided by conversation.</span></Reveal><Reveal className="section-copy"><p className="eyebrow"><span />A more personal way to begin</p><h2>Care begins when someone takes the time to <em>listen</em></h2><p>We know that some health concerns can feel difficult to talk about. Shri Ayurveda offers a respectful place to ask questions, learn about available products and understand when an in-person medical assessment may be important.</p><p>We use clear language and encourage informed decisions with a qualified practitioner.</p><ButtonLink to="/about" variant="text">Get to know us</ButtonLink></Reveal></div></section>
        <section className="section"><div className="container"><SectionHeading eyebrow="Understand your concern" title={<>Conditions we <em>talk about</em></>} text="Learn about common symptoms. Only a qualified practitioner can assess your condition." /><ConditionCards /></div></section>
        <ProcessSection />
        <section className="section section-cream"><div className="container"><div className="section-heading-row"><SectionHeading eyebrow="Shri Ayurveda products" title={<>Explore the <em>range</em></>} align="left" /><ButtonLink to="/products" variant="text">View all products</ButtonLink></div><ProductSlider /></div></section>
        <WhySection />
        <Testimonials />
        <FaqSection />
        <ContactBanner />
      </main>
    </PageFrame>
  );
}

function TrustStrip() {
  const points = [
    ["01", "Personal guidance", "Start with a conversation"],
    ["02", "Respect and privacy", "Your comfort comes first"],
    ["03", "Ayurvedic approach", "Discuss products and care"],
  ];
  return <section className="trust-strip" aria-label="Our approach"><div className="container trust-strip-grid">{points.map(([number, title, detail]) => <div key={number}><span className="trust-number">{number}</span><span><strong>{title}</strong><small>{detail}</small></span></div>)}</div></section>;
}

function ConditionCards() {
  return <div className="card-grid four">{conditions.map((condition, index) => <Reveal className="visual-card" key={condition.name}><img src={condition.image} alt={condition.alt} loading="lazy" /><div><span className="card-index">0{index + 1} / CONDITION</span><h3>{condition.name}</h3><p>{condition.intro}</p><Link className="text-link" to="/conditions">Learn more <ArrowUpRight size={14} /></Link></div></Reveal>)}</div>;
}

function ProcessSection() {
  return <section className="section section-green"><div className="container"><SectionHeading eyebrow="Your next steps" title={<>A clear process, at <em>your pace</em></>} text="Start with a conversation and take the next step with guidance." light /><div className="process-grid">{steps.map(([number, title, text]) => <Reveal key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div><div className="center-action"><ButtonLink to="/treatment" variant="light">Explore our approach</ButtonLink></div></div></section>;
}

function ProductSlider() {
  return <Swiper className="product-swiper" modules={[Pagination, A11y]} slidesPerView={1.08} spaceBetween={16} pagination={{ clickable: true }} breakpoints={{ 560: { slidesPerView: 2, spaceBetween: 20 }, 900: { slidesPerView: 3, spaceBetween: 24 } }} aria-label="Featured product photos">
    {productPhotos.slice(0, 3).map((product, index) => <SwiperSlide key={index}><ProductCard product={product} index={index} /></SwiperSlide>)}
  </Swiper>;
}

function ProductCard({ product, index, enquire = false }) {
  const enquiryMessage = `Hello Shri Ayurveda, I would like to enquire about ${product.name}, product photo ${index + 1}. Please share details and availability.`;
  return <article className="product-card"><img src={product.src} alt={`${product.name}, product photo ${index + 1}`} loading="lazy" /><div><span className="card-index">PRODUCT PHOTO 0{index + 1}</span><h3>{product.name}</h3><p>Product photo from the available range. Contact us for details, suitability and price.</p>{enquire ? <a className="button button-primary" href={whatsappHref(enquiryMessage)} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowUpRight size={15} /></a> : <Link className="text-link" to="/products">Product details <ArrowUpRight size={14} /></Link>}</div></article>;
}

function WhySection() {
  const values = [
    [<Leaf />, "Herbal tradition", "Discuss Ayurvedic products and guidance in simple language."],
    [<ShieldCheck />, "Privacy first", "Sensitive conversations are approached with discretion and respect."],
    [<Heart />, "Personal guidance", "Ask questions and take the next step at a pace that feels comfortable."],
  ];
  return <section className="section"><div className="container"><SectionHeading eyebrow="Why Shri Ayurveda" title={<>Thoughtful care with <em>you in mind</em></>} text="We aim to make sensitive conversations easier, with clarity, respect and personal attention." /><div className="card-grid three">{values.map(([icon, title, text]) => <Reveal className="value-card" key={title}><span className="value-icon">{icon}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div></div></section>;
}

function Testimonials() {
  const stories = [
    "Patient testimonial placeholder. Replace with a genuine comment shared with clear permission.",
    "Patient testimonial placeholder. Add only a real experience and avoid promising specific outcomes.",
    "Patient testimonial placeholder. Your privacy and personal experience should always be respected.",
  ];
  return <section className="section section-cream"><div className="container testimonial-layout">  <div><p className="eyebrow"><span />A note from our community</p><h2>Kind words, <em>shared with care</em></h2><p>Patient stories should be shared only with permission. These cards are placeholders for approved testimonials.</p><div className="swiper-nav"><button className="testimonial-prev" type="button" aria-label="Previous story"><ArrowLeft /></button><button className="testimonial-next" type="button" aria-label="Next story"><ArrowRight /></button></div></div><Swiper modules={[Pagination, A11y, Navigation]} slidesPerView={1} pagination={{ clickable: true }} navigation={{ prevEl: ".testimonial-prev", nextEl: ".testimonial-next" }} className="testimonial-swiper" aria-label="Patient stories">{stories.map((story, index) => <SwiperSlide key={story}><article className="testimonial-card"><span className="quote-mark">“</span><p>{story}</p><strong>Approved patient story</strong><small>Shared with permission · {index + 1}</small></article></SwiperSlide>)}</Swiper></div></section>;
}

function FaqList({ items = faqs }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  return <div className="faq-list">{items.map(([question, answer], index) => <article className="faq-item" key={question}><h3><button className="faq-question" type="button" aria-expanded={activeIndex === index} onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}>{question}<ChevronDown size={18} /></button></h3><AnimatePresence initial={false}>{activeIndex === index && <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{answer}</p></motion.div>}</AnimatePresence></article>)}</div>;
}

function FaqSection() {
  return <section className="section"><div className="container faq-layout"><div><p className="eyebrow"><span />Helpful information</p><h2>Questions, <em>answered</em></h2><p>Find a starting point. For personal advice, speak with a qualified practitioner.</p><ButtonLink to="/about" variant="text">More answers</ButtonLink></div><FaqList items={faqs.slice(0, 3)} /></div></section>;
}

function ContactBanner() {
  return <section className="cta-band"><div className="container cta-band-inner"><div><p className="eyebrow eyebrow-light"><span />A private first step</p><h2>Have a question? <em>We are here to listen.</em></h2><p>Reach out by phone or WhatsApp at your convenience.</p></div><div className="button-row"><ButtonLink href={phoneHref} variant="gold">Call now</ButtonLink><ButtonLink href={whatsappHref()} variant="glass">WhatsApp us</ButtonLink></div></div></section>;
}

function PageHero({ eyebrow, title, description }) {
  return <section className="page-hero"><img src={image("photo-1547887538-e3a2f32cb1cc", 2000)} alt="Ayurvedic botanicals and herbs" fetchpriority="high" /><div className="page-hero-shade" /><div className="container page-hero-content"><p className="eyebrow eyebrow-light"><span />{eyebrow}</p><h1>{title}</h1><p>{description}</p></div></section>;
}

function AboutPage() {
  return <PageFrame title="About Shri Ayurveda | Our Story and Values" description="Learn about Shri Ayurveda's story, mission, values and respectful approach."><main>
    <PageHero eyebrow="Our story" title={<>About Shri <em>Ayurveda</em></>} description="Personal guidance, honest conversations and care with respect." />
    <section className="section section-cream"><div className="container split-layout"><Reveal className="image-panel"><img src={localAssets.aboutHerbs} alt="Ayurvedic herbs, spices and a mortar and pestle" width="712" height="500" loading="lazy" /></Reveal><Reveal className="section-copy"><p className="eyebrow"><span />Our introduction</p><h2>A place to begin a <em>conversation</em></h2><p>Shri Ayurveda is here to make it easier to ask questions about piles, fissure, fistula and bhagandar. These concerns can be private and uncomfortable to discuss, so we listen without judgement and explain information in simple language.</p><p>We offer Ayurvedic guidance and product enquiries while encouraging qualified medical assessment when symptoms call for it. Your wellbeing and informed choices matter at every step.</p><ButtonLink to="/contact">Talk with our team</ButtonLink></Reveal></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow="What guides us" title={<>Our mission and <em>values</em></>} text="Care should feel clear, considerate and personal." /><div className="card-grid three">{[["01", "Listen first", "Make room for questions and understand what matters to each person."], ["02", "Explain honestly", "Share clear information without promises or confusing language."], ["03", "Respect every person", "Handle sensitive conversations with discretion and kindness."]].map(([number, title, text]) => <Reveal className="value-card" key={number}><span className="value-number">{number}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div></div></section>
    <section className="section section-green"><div className="container split-layout"><Reveal className="section-copy section-copy-light"><p className="eyebrow eyebrow-light"><span />Our approach</p><h2>Tradition with <em>thoughtful guidance</em></h2><p>Ayurveda offers a long tradition of health practices. Any care plan should still be suitable for the individual and their health needs. We encourage you to discuss symptoms, existing conditions and medicines with a qualified practitioner before starting something new.</p><p>Seek prompt medical attention for severe pain, heavy bleeding, fever or symptoms that are getting worse.</p><ButtonLink to="/conditions" variant="light">Learn about conditions</ButtonLink></Reveal><Reveal className="image-panel image-panel-tall"><img src={image("photo-1576091160550-2173dba999ef", 1100)} alt="Practitioner discussing care with a patient" loading="lazy" /><span className="image-caption">Your questions deserve time and care.</span></Reveal></div></section>
    <section className="section section-cream"><div className="container profile-grid"><Reveal className="profile-photo"><img src={image("photo-1559839734-2b71ea197ec2", 900)} alt="Placeholder portrait for the Shri Ayurveda practitioner profile" loading="lazy" /></Reveal><Reveal className="section-copy"><p className="eyebrow"><span />Meet your practitioner</p><h2>A profile built on <em>trust</em></h2><p>This section is ready for the clinic's verified practitioner details. Add a name, qualification, registration and experience only after confirming they are accurate.</p><div className="credential-list"><p><strong>Name:</strong> Add practitioner name</p><p><strong>Qualification:</strong> Add verified qualification</p><p><strong>Registration:</strong> Add registration details, if applicable</p></div><p>Replace the profile image and credential placeholders with information verified by Shri Ayurveda before publishing.</p></Reveal></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow="Our credentials" title={<>Transparency matters <em>to us</em></>} text="Replace these editable placeholders with verified clinic certificates and professional details." /><div className="card-grid three">{["Qualification", "Registration", "Clinic details"].map((title) => <Reveal className="credential-card" key={title}><Sparkles /><h3>{title}</h3><p>Add verified details and supporting information here.</p></Reveal>)}</div></div></section>
    <section className="section section-cream"><div className="container faq-layout"><div><p className="eyebrow"><span />A few helpful answers</p><h2>Questions, <em>answered</em></h2><p>Still unsure? Contact us and we can help with general enquiries.</p></div><FaqList items={faqs.slice(0, 4)} /></div></section>
    <ContactBanner />
  </main></PageFrame>;
}

function ConditionsPage() {
  const details = [
    { ...conditions[0], signs: ["Swelling or lumps near or coming out of the anus", "Discomfort or bleeding that should be checked", "Symptoms that persist or change"], help: "A qualified practitioner can discuss Ayurvedic care and suitable products based on your symptoms and health history. Do not self-diagnose or delay an examination if advised." },
    { ...conditions[1], signs: ["Pain or burning in the anal area", "Bleeding that needs a clinician's assessment", "Discomfort that does not settle or keeps returning"], help: "Discuss your symptoms with a qualified practitioner. They can explain whether Ayurvedic guidance is appropriate and whether examination or other care is needed." },
    { ...conditions[2], signs: ["A boil or opening near the anus", "Sticky or pus-like discharge", "Recurring irritation or pain"], help: "First, seek an appropriate medical assessment. A practitioner can help discuss next steps and whether complementary Ayurvedic guidance is suitable." },
    { ...conditions[3], signs: ["Heavy bleeding or severe pain", "Fever, worsening symptoms or feeling unwell", "Any sudden or concerning change"], help: "Do not rely on self-treatment or a website description. Seek prompt medical care first; discuss complementary guidance only with qualified professionals." },
  ];
  return <PageFrame title="Conditions We Discuss | Shri Ayurveda" description="Understand symptoms of piles, fissure, fistula and bhagandar. Contact Shri Ayurveda for guidance, not diagnosis."><main>
    <PageHero eyebrow="Understand your concern" title={<>Conditions we <em>discuss</em></>} description="Common symptoms can have different causes. A qualified practitioner can assess your condition." />
    <section className="section"><div className="container"><SectionHeading eyebrow="Learn and ask" title={<>Know the signs. Get <em>the right advice.</em></>} text="This information is not a diagnosis and should not replace a medical examination." /><div className="condition-detail-list">{details.map((condition, index) => <Reveal className={`condition-detail-card ${index % 2 ? "reverse" : ""}`} key={condition.name}><img src={condition.image} alt={condition.alt} loading="lazy" /><div><span className="card-index">0{index + 1} / CONDITION</span><h2>{condition.name}</h2><p>{condition.intro}</p><h3>Signs people may notice</h3><ul>{condition.signs.map((sign) => <li key={sign}>{sign}</li>)}</ul><h3>How Ayurveda may help</h3><p>{condition.help}</p><ButtonLink href={whatsappHref(`Hello Shri Ayurveda, I have a question about ${condition.name}. Please share how to enquire.`)}>Ask about {condition.name.toLowerCase()}</ButtonLink></div></Reveal>)}</div><p className="disclaimer-inline">Results vary. Please consult a qualified practitioner. Seek prompt medical attention for severe or worsening symptoms.</p></div></section>
    <ContactBanner />
  </main></PageFrame>;
}

function TreatmentPage() {
  return <PageFrame title="Our Approach | Shri Ayurveda Treatment Guidance" description="Learn how to begin a conversation and ask about Ayurvedic guidance and product enquiries."><main>
    <PageHero eyebrow="A clear way forward" title={<>Guidance at <em>your pace</em></>} description="We offer Ayurvedic guidance and product enquiries for piles, fissure, fistula and bhagandar." />
    <section className="section section-cream"><div className="container split-layout"><Reveal className="section-copy"><p className="eyebrow"><span />Treatment and medicines</p><h2>Start with what feels <em>right for you</em></h2><p>Our team can discuss the available Ayurvedic products and guidance for all four concerns. The next step depends on your symptoms, assessment and personal health needs.</p><p>A website cannot diagnose or recommend a medicine for you. Please consult a qualified practitioner before starting any treatment, especially if you have existing conditions or take other medicines.</p><ButtonLink href={whatsappHref()}>Begin a conversation</ButtonLink></Reveal><Reveal className="image-panel"><img src={image("photo-1576091160399-112ba8d25d1d", 1100)} alt="A healthcare consultation in a calm setting" loading="lazy" /><span className="image-caption">Personal questions deserve personal guidance.</span></Reveal></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow="Four simple steps" title={<>What happens when you <em>get in touch</em></>} text="We will help you understand the process without pressure." /><div className="process-grid process-grid-light">{steps.map(([number, title, text]) => <Reveal key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></Reveal>)}</div></div></section>
    <section className="section section-green"><div className="container split-layout"><Reveal className="image-panel image-panel-tall"><img src={image("photo-1515377905703-c4788e51af15", 1000)} alt="A peaceful place for rest and wellbeing" loading="lazy" /><span className="image-caption">Small, steady habits can support wellbeing.</span></Reveal><Reveal className="section-copy section-copy-light"><p className="eyebrow eyebrow-light"><span />Everyday wellbeing</p><h2>Gentle food and lifestyle <em>considerations</em></h2><p>General wellbeing habits may support comfort, but they do not replace diagnosis or treatment. Ask a qualified practitioner what is suitable for your health.</p><ul className="check-list check-list-light"><li>Drink fluids regularly, if appropriate for your health</li><li>Include a varied, fibre-containing diet as tolerated</li><li>Try to avoid straining and long periods on the toilet</li><li>Discuss persistent symptoms with a healthcare professional</li><li>Ask your clinician before major diet or medicine changes</li></ul></Reveal></div></section>
    <section className="section section-cream"><div className="container faq-layout"><div><p className="eyebrow"><span />Before you begin</p><h2>Frequently asked <em>questions</em></h2><p>Your safety and the right assessment always come first.</p></div><FaqList items={faqs} /></div></section>
    <ContactBanner />
  </main></PageFrame>;
}

function ProductsPage() {
  const filters = ["All", "Piles Care", "Other enquiries"];
  const [filter, setFilter] = useState("All");
  const visibleProducts = productPhotos.map((product, index) => ({ ...product, index })).filter((product) => filter !== "Other enquiries");
  return <PageFrame title="Ayurvedic Products | Shri Ayurveda" description="Explore Shri Ayurveda product photos and enquire about details, suitability, availability and price."><main>
    <PageHero eyebrow="The Shri Ayurveda range" title={<>Products and <em>enquiries</em></>} description="Explore product photos and contact us for current ingredients, availability and price." />
    <section className="section section-cream"><div className="container"><SectionHeading eyebrow="Product gallery" title={<>Ask us for <em>the details</em></>} text="Product names, ingredients and suitability should be confirmed directly with Shri Ayurveda. No prices or health claims are listed here." /><div className="filter-row" role="group" aria-label="Filter product gallery">{filters.map((item) => <button className={`filter-button ${filter === item ? "active" : ""}`} key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div>{filter !== "Other enquiries" ? <div className="card-grid three product-gallery">{visibleProducts.map((product) => <ProductCard key={product.index} product={product} index={product.index} enquire />)}</div> : <div className="other-products"><div><Leaf size={40} /><span>Product information</span></div><h2>Other categories</h2><p>Ask about powder, oil, ointment or products for other concerns. Contact us for details.</p><ButtonLink href={whatsappHref("Hello Shri Ayurveda, I would like to ask about other product categories.")}>Ask us on WhatsApp</ButtonLink></div>}<p className="disclaimer-inline">Contact us for price and details. Consult a qualified practitioner before starting any treatment.</p></div></section>
    <section className="section"><div className="container split-layout"><Reveal className="image-panel"><img src={image("photo-1608571423902-eed4a5ad8108", 1000)} alt="Natural ingredients arranged for wellness" loading="lazy" /><span className="image-caption">Ask about ingredients before use.</span></Reveal><Reveal className="section-copy"><p className="eyebrow"><span />Need more information?</p><h2>We can help you ask the <em>right questions</em></h2><p>Enquire about product names, ingredients, availability and price. A qualified practitioner can help assess whether a product is suitable for you.</p><ul className="check-list"><li>Ask for current product information</li><li>Share relevant health details with your practitioner</li><li>Check suitability before starting a product</li><li>Seek medical advice for severe or worsening symptoms</li></ul><ButtonLink href={whatsappHref()}>Ask a product question</ButtonLink></Reveal></div></section>
    <ContactBanner />
  </main></PageFrame>;
}

function ContactPage() {
  const [formStatus, setFormStatus] = useState("");
  const submitContact = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name")).trim();
    const phone = String(data.get("phone")).trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message")).trim();
    const text = `Hello Shri Ayurveda, my name is ${name}. My phone or WhatsApp number is ${phone}.${email ? ` My email is ${email}.` : ""} ${message}`;
    setFormStatus("WhatsApp will open with your message. Review it and choose whether to send.");
    window.open(whatsappHref(text), "_blank", "noopener,noreferrer");
  };
  return <PageFrame title="Contact Shri Ayurveda | Get in Touch" description="Contact Shri Ayurveda by phone, WhatsApp or email, or send a private enquiry."><main>
    <PageHero eyebrow="We are here to listen" title={<>Let's start a <em>conversation</em></>} description="Call, send a WhatsApp message or use the form to share a question." />
    <section className="section section-cream"><div className="container contact-layout"><Reveal className="contact-details"><p className="eyebrow"><span />Get in touch</p><h2>Reach us in the way <em>that suits you</em></h2><p>We will do our best to answer general questions and help you understand the next step.</p><a className="contact-method" href={phoneHref}><Phone /><span><small>Phone</small><strong>{CONTACT.PHONE_NUMBER}</strong></span></a><a className="contact-method" href={whatsappHref()} target="_blank" rel="noreferrer"><MessageCircle /><span><small>WhatsApp</small><strong>Send a message</strong></span></a><a className="contact-method" href={emailHref}><Mail /><span><small>Email</small><strong>{CONTACT.EMAIL}</strong></span></a><div className="contact-method"><MapPin /><span><small>Address</small><strong>{CONTACT.ADDRESS}</strong></span></div><div className="contact-method"><Clock3 /><span><small>Working hours</small><strong>{CONTACT.WORKING_HOURS}</strong></span></div></Reveal>
      <Reveal><form className="contact-form" onSubmit={submitContact}><p className="eyebrow"><span />A private first step</p><h2>Send an enquiry</h2><p>Complete this form and your message will open in WhatsApp.</p><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" placeholder="Enter your name" required /><label htmlFor="contact-phone">Phone or WhatsApp number</label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="Enter your number" required /><label htmlFor="contact-email">Email (optional)</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="Enter your email" /><label htmlFor="contact-message">How can we help?</label><textarea id="contact-message" name="message" rows="5" placeholder="Write your question" required /><button className="button button-primary" type="submit">Continue on WhatsApp <ArrowUpRight size={15} /></button><p className="form-status" role="status" aria-live="polite">{formStatus}</p><small>Your message is not sent until you choose to send it in WhatsApp.</small></form></Reveal></div></section>
    <section className="section"><div className="container map-layout"><Reveal><p className="eyebrow"><span />Find the clinic</p><h2>Visit us <em>in person</em></h2><p>Replace the map location with the verified clinic address before publishing. Contact us to confirm visiting details.</p><p><strong>Address:</strong> {CONTACT.ADDRESS}</p><a className="text-link" href={mapDirectionsUrl} target="_blank" rel="noreferrer">Open map directions <ArrowUpRight size={14} /></a></Reveal><Reveal className="map-frame"><iframe title="Map showing the Shri Ayurveda clinic location" src={mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></Reveal></div></section>
    <ContactBanner />
  </main></PageFrame>;
}

export default function App() {
  return <SiteLayout />;
}
