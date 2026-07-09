import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { eventConfig } from "@/config/event.config";
import { ShareButtons } from "@/components/shared/share-buttons";
import { BrandMark } from "./brand-mark";
import { InstagramIcon, LinkedinIcon, YoutubeIcon } from "./social-icons";

const FOOTER_COLUMNS = [
  {
    title: "Curso",
    links: [
      { href: "#programa", label: "Programa académico" },
      { href: "#comite", label: "Comité organizador" },
      { href: "#cronograma", label: "Cronograma" },
      { href: "#sponsors", label: "Instituciones" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { href: "#faq", label: "Preguntas frecuentes" },
      { href: "#galeria", label: "Galería" },
      { href: "/registro", label: "Inscripción" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="mx-auto w-[min(1240px,92vw)] py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <BrandMark />
            <p className="mt-4 max-w-[32ch] text-sm text-muted-foreground">
              {eventConfig.description}
            </p>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="font-data text-xs uppercase tracking-widest text-muted-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-data text-xs uppercase tracking-widest text-muted-foreground">
              Modalidad
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              {eventConfig.modality.note}
              <br />
              Plataforma {eventConfig.modality.platform}
              <br />
              {eventConfig.dateRange.label}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row">
          <span>
            © {new Date(eventConfig.dateRange.start).getFullYear()} {eventConfig.name}. Todos los
            derechos reservados.
          </span>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-muted-foreground">Comparte:</span>
              <ShareButtons />
            </div>
            <span aria-hidden className="h-5 w-px bg-border" />
            <a
              href={eventConfig.social.linkedin}
              aria-label="LinkedIn"
              className="flex size-9 items-center justify-center rounded-full border border-border/60 transition-colors hover:border-primary hover:text-primary"
            >
              <LinkedinIcon className="size-4" />
            </a>
            <a
              href={eventConfig.social.instagram}
              aria-label="Instagram"
              className="flex size-9 items-center justify-center rounded-full border border-border/60 transition-colors hover:border-primary hover:text-primary"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={eventConfig.social.youtube}
              aria-label="YouTube"
              className="flex size-9 items-center justify-center rounded-full border border-border/60 transition-colors hover:border-primary hover:text-primary"
            >
              <YoutubeIcon className="size-4" />
            </a>
            <a
              href="#top"
              aria-label="Volver arriba"
              className="flex size-9 items-center justify-center rounded-full border border-border/60 transition-colors hover:border-primary hover:text-primary"
            >
              <ArrowUp className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
