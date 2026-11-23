import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Stage from "@/components/Stage";
import HowWeWork from "@/components/HowWeWork";
import Projects from "@/components/Projects";
import Methodology from "@/components/Methodology";
import Results from "@/components/Results";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RevealProvider from "@/components/RevealProvider";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SmoothScroll, { ScrollPanel } from "@/components/ui/smooth-scroll";
import "./landing.css";
import { siteDescription, siteTitle, siteUrl } from "./site-metadata";

export const metadata: Metadata = {
  alternates: siteUrl ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    siteName: "ALTAB",
    title: siteTitle,
    description: siteDescription,
    locale: "es_AR",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function Page() {
  return (
    <>
      {/* El campo de partículas es el escenario: vive detrás de toda la página
          y cambia de forma con el scroll (ondas → dispersión → grilla →
          embudo → barras → convergencia). */}
      <ScrollProgress />

      <div className="page altab-landing">
        <a className="landing-skip" href="#contenido-principal">Saltar al contenido</a>
        <Nav />
        <SmoothScroll id="contenido-principal" tabIndex={-1}>
          <ScrollPanel id="top" tabIndex={-1} overlap={false}><Hero /></ScrollPanel>
          <ScrollPanel overlap={false}><Stage /></ScrollPanel>
          <ScrollPanel id="soluciones"><HowWeWork /></ScrollPanel>
          <ScrollPanel id="proyectos"><Projects /></ScrollPanel>
          <ScrollPanel id="metodologia"><Methodology /></ScrollPanel>
          <ScrollPanel><Results /></ScrollPanel>
          <ScrollPanel id="faq"><Faq /></ScrollPanel>
          <ScrollPanel><FinalCta /></ScrollPanel>
          <ScrollPanel id="contacto"><Contact /></ScrollPanel>
        </SmoothScroll>
        <Footer />
      </div>

      <RevealProvider />
      <WhatsAppFloat />
    </>
  );
}
