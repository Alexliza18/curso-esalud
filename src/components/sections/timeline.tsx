import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { timelineSteps } from "@/data/content";

export function Timeline() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto w-[min(1240px,92vw)]">
        <SectionHeading
          eyebrow="Cómo inscribirte"
          title="De la inscripción a tu asiento en 4 pasos"
          align="center"
        />

        <StaggerGroup className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden
            className="absolute top-6 hidden h-px w-full bg-border lg:block"
          />
          {timelineSteps.map((item) => (
            <StaggerItem key={item.step} className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
              <span className="relative z-10 flex size-12 items-center justify-center rounded-full bg-primary font-data text-lg font-bold text-primary-foreground shadow-lg shadow-primary/30">
                {item.step}
              </span>
              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
