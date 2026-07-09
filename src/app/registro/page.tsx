import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RegistrationForm } from "@/components/forms/registration-form";
import { eventConfig } from "@/config/event.config";
import { TICKETS, CURRENCY } from "@/domain/entities/ticket";

export const metadata: Metadata = {
  title: "Inscripción",
  description: `Matricúlate en ${eventConfig.name} ${eventConfig.edition} — ${eventConfig.officialName}. ${eventConfig.academic.hours} horas académicas, ${eventConfig.academic.credits} créditos, 100% virtual.`,
  alternates: { canonical: "/registro" },
};

export default function RegistroPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="mx-auto w-[min(1200px,92vw)] pb-24 pt-32 md:pt-36">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div className="flex flex-col gap-8">
            <div>
              <span className="inline-flex items-center gap-2 font-data text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Inscripción
              </span>
              <h1 className="mt-2 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
                Matricúlate en 2 minutos
              </h1>
              <p className="mt-4 max-w-[50ch] text-pretty text-muted-foreground">
                Completa tus datos, adjunta tu comprobante de pago y listo. Te enviaremos un correo
                de confirmación y el enlace de {eventConfig.modality.platform} antes del curso.
              </p>

              <ul className="mt-8 flex flex-col gap-4">
                {Object.values(TICKETS).map((ticket) => (
                  <li
                    key={ticket.type}
                    className="flex items-center justify-between rounded-2xl border border-border/60 px-5 py-4"
                  >
                    <span className="text-sm font-semibold">{ticket.name}</span>
                    <span className="font-data text-sm font-bold text-primary">
                      {CURRENCY} {ticket.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-data text-xs uppercase tracking-widest text-muted-foreground">
                Dirigido a
              </h2>
              <ul className="mt-3 flex flex-col gap-2">
                {eventConfig.audience.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                    <span aria-hidden className="text-accent">
                      •
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border/60 p-5">
              <h2 className="font-data text-xs uppercase tracking-widest text-muted-foreground">
                Datos para el pago
              </h2>
              <dl className="mt-3 flex flex-col gap-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Titular</dt>
                  <dd className="text-right font-medium">{eventConfig.payment.accountHolder}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">{eventConfig.payment.bank}</dt>
                  <dd className="text-right font-medium">{eventConfig.payment.accountType}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">N.º de cuenta</dt>
                  <dd className="text-right font-data font-medium">{eventConfig.payment.accountNumber}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">CCI</dt>
                  <dd className="text-right font-data font-medium">{eventConfig.payment.cci}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Plin</dt>
                  <dd className="text-right font-data font-medium">{eventConfig.payment.plin}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Yape</dt>
                  <dd className="text-right font-data font-medium">{eventConfig.payment.yape}</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-muted-foreground">
                Después de pagar, indica tu nombre completo y envía tu voucher también por
                WhatsApp al <b className="text-foreground">{eventConfig.payment.plin}</b>.
              </p>
            </div>
          </div>

          <RegistrationForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
