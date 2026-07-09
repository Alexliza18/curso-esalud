"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { LinkButton } from "@/components/ui/link-button";
import { Countdown } from "@/components/shared/countdown";
import { EcgCanvas } from "@/components/shared/ecg-canvas";
import { AddToCalendar } from "@/components/shared/add-to-calendar";
import { eventConfig } from "@/config/event.config";
import { useParallax } from "@/hooks/use-parallax";

const easing = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowOneY = useParallax(sectionRef, 90);
  const glowTwoY = useParallax(sectionRef, -70);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24"
    >
      <EcgCanvas className="absolute inset-0 h-full w-full opacity-70" />

      <motion.div
        aria-hidden
        style={{ y: glowOneY }}
        className="absolute -right-[10%] -top-[10%] h-[60vw] max-h-[900px] w-[60vw] max-w-[900px] rounded-full bg-[radial-gradient(circle,_oklch(0.5_0.19_259_/_16%),_transparent_65%)] blur-2xl"
      />
      <motion.div
        aria-hidden
        style={{ y: glowTwoY }}
        className="absolute -bottom-[20%] -left-[15%] h-[60vw] max-h-[900px] w-[60vw] max-w-[900px] rounded-full bg-[radial-gradient(circle,_oklch(0.5_0.1_168_/_14%),_transparent_65%)] blur-2xl"
      />

      <div className="relative z-10 mx-auto flex w-[min(1240px,92vw)] flex-col items-center gap-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easing }}
          className="inline-flex items-center gap-2 font-data text-xs font-semibold uppercase tracking-[0.14em] text-accent"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_4px_oklch(0.68_0.13_168_/_18%)]" />
          Curso virtual · {eventConfig.dateRange.label}
        </motion.span>

        {/* Sin animación de entrada: es el candidato a LCP y debe pintarse de inmediato,
            sin esperar a la hidratación de React/Framer Motion. */}
        <h1 className="max-w-[16ch] text-balance text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
          Quirófano del futuro{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {eventConfig.edition}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: easing }}
          className="max-w-[52ch] text-pretty text-lg font-semibold text-foreground/80 sm:text-xl"
        >
          {eventConfig.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: easing }}
          className="max-w-[56ch] text-pretty text-base text-muted-foreground"
        >
          {eventConfig.officialName}, organizado por el Servicio de Centro Quirúrgico del Hospital
          Nacional Almanzor Aguinaga Asenjo (EsSalud), con el respaldo del Colegio de Enfermeros
          del Perú y la Universidad Católica Santo Toribio de Mogrovejo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: easing }}
          className="flex flex-wrap items-center justify-center gap-2 font-data text-sm text-muted-foreground"
        >
          <span>
            <b className="text-foreground">{eventConfig.dateRange.label}</b>
          </span>
          <span aria-hidden>·</span>
          <span>
            <b className="text-foreground">{eventConfig.modality.note}</b> vía {eventConfig.modality.platform}
          </span>
          <span aria-hidden>·</span>
          <span>
            <b className="text-foreground">{eventConfig.academic.hours} h</b> académicas ·{" "}
            <b className="text-foreground">{eventConfig.academic.credits}</b> créditos
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: easing }}
          className="mt-2 flex flex-wrap items-center justify-center gap-4"
        >
          <LinkButton href="/registro" size="lg" className="rounded-full px-7">
            Inscribirme ahora
          </LinkButton>
          <LinkButton href="#programa" size="lg" variant="outline" className="rounded-full px-7">
            Ver programa
          </LinkButton>
          <LinkButton
            href={`https://wa.me/${eventConfig.whatsapp.phone}?text=${encodeURIComponent(eventConfig.whatsapp.message)}`}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            variant="ghost"
            className="rounded-full px-7"
          >
            Contactar por WhatsApp
          </LinkButton>
          <AddToCalendar />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: easing }}
        >
          <Countdown targetDate={eventConfig.dateRange.start} className="mt-2" />
        </motion.div>
      </div>
    </section>
  );
}
