"use client";

import { useState } from "react";
import { Share2, Link2, Check } from "lucide-react";
import { toast } from "sonner";
import { siteConfig } from "@/config/site.config";
import { eventConfig } from "@/config/event.config";
import { LinkedinIcon } from "@/components/layout/social-icons";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  url?: string;
  text?: string;
  className?: string;
}

export function ShareButtons({ url, text, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url ?? siteConfig.url;
  const shareText = text ?? `${eventConfig.name} ${eventConfig.edition} — ${eventConfig.tagline}`;

  async function handleNativeShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: shareText, url: shareUrl });
      } catch {
        // el usuario canceló el share sheet, no hacemos nada
      }
      return;
    }
    await handleCopy();
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Enlace copiado al portapapeles");
    setTimeout(() => setCopied(false), 2000);
  }

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;

  const iconButtonClass =
    "flex size-9 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary hover:text-primary";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={handleNativeShare}
        aria-label="Compartir"
        className={iconButtonClass}
      >
        <Share2 className="size-4" />
      </button>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir en WhatsApp"
        className={iconButtonClass}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.83.49 3.55 1.35 5.03L2 22l5.24-1.43a9.9 9.9 0 0 0 4.8 1.22h.01c5.46 0 9.9-4.45 9.9-9.9C21.95 6.45 17.5 2 12.04 2z" />
        </svg>
      </a>
      <a
        href={xHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir en X"
        className={iconButtonClass}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5">
          <path d="M18.9 2H22l-7.2 8.2L23 22h-6.9l-5.4-6.6L4.6 22H1.5l7.7-8.8L1 2h7.1l4.9 6.1L18.9 2zm-1.2 18h1.9L7.4 3.9H5.4L17.7 20z" />
        </svg>
      </a>
      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartir en LinkedIn"
        className={iconButtonClass}
      >
        <LinkedinIcon className="size-4" />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copiar enlace"
        className={iconButtonClass}
      >
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      </button>
    </div>
  );
}
