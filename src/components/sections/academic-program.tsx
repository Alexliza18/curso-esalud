import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { tracks } from "@/data/content";

export function AcademicProgram() {
  return (
    <section id="programa" className="bg-muted/40 py-20 md:py-28">
      <div className="mx-auto w-[min(1240px,92vw)]">
        <SectionHeading
          eyebrow="Programa académico"
          title="Cuatro ejes para tu formación quirúrgica"
          description="El curso está organizado alrededor de la finalidad institucional: fortalecer las competencias de enfermería quirúrgica en innovación, seguridad, liderazgo y humanización."
        />

        <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tracks.map((track) => (
            <StaggerItem key={track.id}>
              <Card className="flex h-full flex-col border-border/60 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="flex h-full flex-col gap-3 p-7">
                  <span className="font-data text-xs text-muted-foreground">Eje {track.id}</span>
                  <h3 className="text-xl font-bold">{track.title}</h3>
                  <p className="flex-1 text-sm text-muted-foreground">{track.description}</p>
                  <span className="font-data text-xs font-semibold text-accent">
                    Incluido en las 34 h académicas
                  </span>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
