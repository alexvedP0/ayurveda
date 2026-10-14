export const CONTACT = {
  PHONE_NUMBER: "91XXXXXXXXXX",
  WHATSAPP_NUMBER: "91XXXXXXXXXX",
  EMAIL: "hello@example.com",
  ADDRESS: "Add clinic address here",
  WORKING_HOURS: "Add clinic working hours",
};

export const phoneHref = `tel:+${CONTACT.PHONE_NUMBER}`;
export const whatsappHref = (message = "Hello Shri Ayurveda, I would like to know more.") =>
  `https://wa.me/${CONTACT.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
export const emailHref = `mailto:${CONTACT.EMAIL}`;
export const addressQuery = encodeURIComponent(
  CONTACT.ADDRESS.includes("Add clinic") ? "India" : CONTACT.ADDRESS,
);
export const mapEmbedUrl = `https://www.google.com/maps?q=${addressQuery}&output=embed`;
export const mapDirectionsUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`;
