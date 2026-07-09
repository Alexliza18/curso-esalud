import { Award, Wrench, Video, Users, PlayCircle, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { benefits } from "@/data/content";

const ICONS = [Award, Wrench, Video, Users, PlayCircle, Sparkles];

export function Benefits() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto w-[min(1240px,92vw)]">
        <SectionHeading
          eyebrow="Por qué asistir"
          title="Una experiencia diseñada para especialistas"
          description="No es una conferencia más: es el punto de encuentro entre quienes operan hoy y quienes diseñan cómo se operará mañana."
          align="center"
        />

        <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <StaggerItem key={benefit.title}>
                <Card className="h-full border-border/60 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="flex flex-col gap-4 p-7">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="text-lg font-bold">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
