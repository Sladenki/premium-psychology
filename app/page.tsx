import { Header } from "@/components/layout/header";
import {
  AboutFounder,
  AboutPartners,
  AboutSituations,
  AboutSystem,
} from "@/components/sections/about";
import { Cases } from "@/components/sections/cases";
import { ContactForm } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Pricing } from "@/components/sections/pricing";
import { Process } from "@/components/sections/process";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSituations />
        <AboutSystem />
        <Pricing />
        <AboutFounder />
        <Process />
        <AboutPartners />
        <Cases />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
