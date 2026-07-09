import type { Metadata } from "next";
import { WifiOff } from "lucide-react";
import { eventConfig } from "@/config/event.config";

export const metadata: Metadata = {
  title: "Sin conexión",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <main id="main" className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-secondary text-muted-foreground">
        <WifiOff className="size-8" />
      </span>
      <h1 className="text-balance text-2xl font-extrabold tracking-tight sm:text-3xl">
        Sin conexión a internet
      </h1>
      <p className="max-w-[42ch] text-pretty text-muted-foreground">
        No pudimos cargar esta página de {eventConfig.name} {eventConfig.edition}. Revisa tu
        conexión e intenta de nuevo.
      </p>
    </main>
  );
}
