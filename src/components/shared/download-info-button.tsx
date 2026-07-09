"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadInfoSheet } from "@/lib/info-sheet";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type DownloadInfoButtonProps = Omit<ComponentProps<typeof Button>, "onClick" | "type" | "render">;

export function DownloadInfoButton({
  variant = "secondary",
  size = "lg",
  className,
  ...props
}: DownloadInfoButtonProps) {
  return (
    <Button
      {...props}
      type="button"
      variant={variant}
      size={size}
      onClick={downloadInfoSheet}
      className={cn("rounded-full px-8", className)}
    >
      <Download className="size-4" />
      Descargar información
    </Button>
  );
}
