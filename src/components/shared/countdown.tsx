"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCountdown } from "@/hooks/use-countdown";
import { cn } from "@/lib/utils";

const UNITS = [
  { key: "days", label: "Días" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Seg" },
] as const;

function AnimatedDigits({ value }: { value: number }) {
  const formatted = String(value).padStart(2, "0");

  return (
    <span className="relative inline-flex overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={formatted}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          suppressHydrationWarning
          className="inline-block font-data text-2xl font-bold text-accent drop-shadow-[0_0_18px_oklch(0.68_0.13_168_/_35%)] tabular-nums sm:text-3xl"
        >
          {formatted}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Countdown({ targetDate, className }: { targetDate: string; className?: string }) {
  const countdown = useCountdown(targetDate);

  return (
    <div
      role="timer"
      aria-label="Tiempo restante para el congreso"
      className={cn(
        "flex items-center gap-3 rounded-3xl border border-border/60 bg-background/60 px-6 py-4 backdrop-blur-xl sm:gap-5",
        className
      )}
    >
      {UNITS.map((unit, i) => (
        <div key={unit.key} className="flex items-center gap-3 sm:gap-5">
          <div className="flex min-w-[52px] flex-col items-center">
            <AnimatedDigits value={countdown[unit.key]} />
            <span className="mt-1 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
              {unit.label}
            </span>
          </div>
          {i < UNITS.length - 1 && (
            <span aria-hidden className="text-lg text-border">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
