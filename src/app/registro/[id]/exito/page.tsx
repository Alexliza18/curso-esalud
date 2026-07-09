import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LinkButton } from "@/components/ui/link-button";
import { ShareButtons } from "@/components/shared/share-buttons";
import { SupabaseRegistrationRepository } from "@/infrastructure/supabase/registration-repository.impl";
import { TICKETS } from "@/domain/entities/ticket";
import { eventConfig } from "@/config/event.config";

export const metadata: Metadata = {
  title: "¡Registro completo!",
  robots: { index: false, follow: false },
};

const repository = new SupabaseRegistrationRepository();

export default async function ExitoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const registration = await repository.findById(id);

  if (!registration) notFound();

  const ticket = TICKETS[registration.tipoParticipante];

  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto flex w-[min(640px,92vw)] flex-col items-center pb-24 pt-32 text-center md:pt-36">
        <span className="flex size-16 items-center justify-center rounded-full bg-accent/15 text-accent">
          <CheckCircle2 className="size-8" />
        </span>
        <h1 className="mt-6 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
          ¡Registro completo, {registration.nombres}!
        </h1>
        <p className="mt-4 max-w-[48ch] text-pretty text-muted-foreground">
          Tu comprobante fue recibido correctamente. En menos de 48 horas hábiles validaremos tu
          pago y te enviaremos la confirmación junto con el enlace de{" "}
          {eventConfig.modality.platform} a <b>{registration.correo}</b>.
        </p>
        <p className="mt-2 max-w-[48ch] text-pretty text-xs text-muted-foreground">
          Recuerda: el certificado con valor oficial requiere una asistencia mínima del{" "}
          {eventConfig.academic.minAttendancePercent}% y la aprobación de la evaluación y encuesta
          de satisfacción.
        </p>

        <dl className="mt-8 grid w-full grid-cols-1 gap-3 rounded-2xl border border-border/60 p-6 text-left text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Tipo de participante</dt>
            <dd className="font-medium">{ticket.name}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Institución</dt>
            <dd className="font-medium">{registration.institucion}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Ciudad</dt>
            <dd className="font-medium">{registration.ciudad}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Código de inscripción</dt>
            <dd className="font-data font-medium">{registration.id.slice(0, 8)}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href="/" size="lg" className="rounded-full">
            Volver al inicio
          </LinkButton>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-sm text-muted-foreground">
            Cuéntale a tus colegas sobre {eventConfig.name} {eventConfig.edition}
          </p>
          <ShareButtons />
        </div>
      </main>
      <Footer />
    </>
  );
}
