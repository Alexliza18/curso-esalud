"use client";

import { useEffect, useMemo, useState } from "react";

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

function computeCountdown(target: Date): Countdown {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
    isComplete: diff <= 0,
  };
}

export function useCountdown(targetDate: string): Countdown {
  const target = useMemo(() => new Date(targetDate), [targetDate]);
  const [countdown, setCountdown] = useState<Countdown>(() => computeCountdown(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(computeCountdown(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return countdown;
}
