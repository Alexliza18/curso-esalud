import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Benefits } from "@/components/sections/benefits";
import { AcademicProgram } from "@/components/sections/academic-program";
import { Timeline } from "@/components/sections/timeline";
import { Schedule } from "@/components/sections/schedule";
import { Speakers } from "@/components/sections/speakers";
import { Sponsors } from "@/components/sections/sponsors";
import { Faq } from "@/components/sections/faq";
import { CtaRegister } from "@/components/sections/cta-register";
import { EventJsonLd, FaqJsonLd, OrganizationJsonLd } from "@/components/shared/seo-jsonld";
import { faqItems } from "@/data/content";

export default function Home() {
  return (
    <>
      <EventJsonLd />
      <OrganizationJsonLd />
      <FaqJsonLd items={faqItems} />
      <Navbar />
      <main id="main">
        <Hero />
        <Benefits />
        <AcademicProgram />
        <Timeline />
        <Schedule />
        <Speakers />
        <Sponsors />
        <Faq />
        <CtaRegister />
      </main>
      <Footer />
    </>
  );
}
