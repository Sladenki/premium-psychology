import { Header } from "@/components/layout/header";
import { About } from "@/components/sections/about";
import { Cases } from "@/components/sections/cases";
import { ContactForm } from "@/components/sections/contact";
import { Discuss } from "@/components/sections/discuss";
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
        <Cases />
        <ContactForm />
        <Faq />
        <Discuss />
      </main>
      <Footer />
    </>
  );
}
