import { LinkButton } from "@/components/ui/link-button";
import { DownloadInfoButton } from "@/components/shared/download-info-button";
import { Reveal } from "@/components/shared/reveal";
import { eventConfig } from "@/config/event.config";

export function CtaRegister() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto w-[min(1240px,92vw)]">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent px-8 py-16 text-center text-primary-foreground sm:px-16">
            <h2 className="mx-auto max-w-[28ch] text-balance text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Fortalece tus competencias en enfermería quirúrgica
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-pretty text-primary-foreground/90">
              {eventConfig.academic.hours} horas académicas, {eventConfig.academic.credits} créditos
              oficiales, 100% virtual vía {eventConfig.modality.platform}. Inscríbete antes del{" "}
              {eventConfig.dateRange.label}.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <LinkButton
                href="/registro"
                size="lg"
                variant="secondary"
                className="rounded-full px-8 text-foreground"
              >
                Empezar mi inscripción
              </LinkButton>
              <DownloadInfoButton
                variant="ghost"
                className="border border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
