"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { sessions } from "@/data/sessions";

const DAYS = [
  { day: 1, label: "Día 1 · Vie 25" },
  { day: 2, label: "Día 2 · Sáb 26" },
  { day: 3, label: "Día 3 · Dom 27" },
] as const;

export function Schedule() {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);
  const daySessions = sessions.filter((s) => s.day === activeDay);

  return (
    <section id="cronograma" className="bg-muted/40 py-20 md:py-28">
      <div className="mx-auto w-[min(1240px,92vw)]">
        <SectionHeading
          eyebrow="Cronograma"
          title="Tres días, agenda completa"
          description="Selecciona un día para ver el detalle de salas y horarios."
          align="center"
        />

        <div
          role="tablist"
          aria-label="Días del congreso"
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {DAYS.map(({ day, label }) => (
            <button
              key={day}
              role="tab"
              aria-selected={activeDay === day}
              onClick={() => setActiveDay(day)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
                activeDay === day
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3"
          >
            {daySessions.map((session) => (
              <Card key={session.id} className="border-border/60">
                <CardContent className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-5 sm:gap-6 sm:p-6">
                  <time className="font-data text-base font-bold text-accent tabular-nums">
                    {session.time}
                  </time>
                  <div className="min-w-0">
                    <p className="truncate font-semibold sm:text-base">{session.title}</p>
                    <p className="text-sm text-muted-foreground">{session.speaker}</p>
                  </div>
                  <span className="hidden shrink-0 rounded-full bg-secondary px-3 py-1 font-data text-xs uppercase tracking-wide text-muted-foreground sm:inline-block">
                    {session.room}
                  </span>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
