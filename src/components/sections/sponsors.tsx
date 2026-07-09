import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { sponsors } from "@/data/content";

export function Sponsors() {
  return (
    <section id="sponsors" className="bg-muted/40 py-20 md:py-28">
      <div className="mx-auto w-[min(1240px,92vw)]">
        <SectionHeading eyebrow="Respaldan esta edición" title="Instituciones aliadas" align="center" />

        <Reveal className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {sponsors.map((sponsor) => (
            <span
              key={sponsor}
              className="text-lg font-bold tracking-tight text-muted-foreground grayscale transition-all hover:text-primary hover:grayscale-0"
            >
              {sponsor}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
