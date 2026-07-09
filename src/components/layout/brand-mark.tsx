import Link from "next/link";
import { eventConfig } from "@/config/event.config";
import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 font-extrabold tracking-tight", className)}
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent font-data text-sm text-primary-foreground shadow-lg shadow-primary/30">
        {eventConfig.shortName}
      </span>
      <span className="hidden sm:inline">
        {eventConfig.name} <span className="font-data text-accent">{eventConfig.edition}</span>
      </span>
    </Link>
  );
}
