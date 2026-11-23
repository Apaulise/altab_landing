// Values still to be confirmed before shipping: Cal.com link and social profiles.
// Set them via NEXT_PUBLIC_* env vars (see .env.example).

/** Internal booking page (Cal.com embed). Every "Analicemos tu negocio" / "Agendar llamada" link points here. */
const booking = "/agendar";

/** Número de WhatsApp de contacto, +54 11 5145-5506. Pisable vía NEXT_PUBLIC_WHATSAPP_URL. */
const WHATSAPP_NUMBER = "5491151455506";

export const links = {
  cta: booking,
  cal: booking,
  /** Cal.com event slug, "usuario/evento" (e.g. "smokia/llamada-diagnostico"). Used by the booking page. */
  calSlug: process.env.NEXT_PUBLIC_CAL_LINK || "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_URL || `https://wa.me/${WHATSAPP_NUMBER}`,
  /** Toggles the Impacto / case study section. */
  showResults: true,
};
