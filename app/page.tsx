import { Header } from "@/components/layout/header";
import { About } from "@/components/sections/about";
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
        <About />
        <Process />
        <Pricing />
        <ContactForm />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
