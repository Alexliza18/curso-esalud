"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal";
import { Card, CardContent } from "@/components/ui/card";
import { speakers } from "@/data/speakers";

const GRADIENTS = ["from-primary to-accent", "from-accent to-primary"];

export function Speakers() {
  return (
    <section id="comite" className="py-20 md:py-28">
      <div className="mx-auto w-[min(760px,92vw)]">
        <SectionHeading
          eyebrow="Comité organizador"
          title="Quiénes lideran esta edición"
          description="El curso es organizado por el Servicio de Centro Quirúrgico del Hospital Nacional Almanzor Aguinaga Asenjo (EsSalud)."
          align="center"
        />

        <StaggerGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {speakers.map((speaker, i) => (
            <StaggerItem key={speaker.id}>
              <motion.div
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="h-full"
              >
                <Card className="h-full border-border/60 text-center shadow-none transition-shadow hover:shadow-xl hover:shadow-primary/10">
                  <CardContent className="flex flex-col items-center gap-2 p-8">
                    <span
                      className={`mb-1 flex size-16 items-center justify-center rounded-full bg-gradient-to-br font-bold text-primary-foreground ${GRADIENTS[i % GRADIENTS.length]}`}
                    >
                      {speaker.initials}
                    </span>
                    <h3 className="text-base font-bold">{speaker.name}</h3>
                    <p className="text-sm text-muted-foreground">{speaker.role}</p>
                    <p className="font-data text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                      {speaker.location}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
