import type { Registration } from "@/domain/entities/registration";
import { eventConfig } from "@/config/event.config";
import { TICKETS } from "@/domain/entities/ticket";

const wrapper = (title: string, body: string) => `
<div style="font-family:-apple-system,Segoe UI,Arial,sans-serif;background:#eef3f6;padding:32px 0;">
  <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e5e9ec;">
    <div style="background:linear-gradient(135deg,#0b5fd9,#147a63);padding:28px 32px;color:#ffffff;">
      <p style="margin:0;font-size:12px;letter-spacing:.08em;text-transform:uppercase;opacity:.85;">
        ${eventConfig.name} ${eventConfig.edition}
      </p>
      <h1 style="margin:8px 0 0;font-size:22px;">${title}</h1>
    </div>
    <div style="padding:28px 32px;color:#0b1524;font-size:14px;line-height:1.6;">
      ${body}
    </div>
    <div style="padding:16px 32px;background:#f5f7f9;color:#7c8ba0;font-size:12px;">
      ${eventConfig.modality.note} vía ${eventConfig.modality.platform} · ${eventConfig.dateRange.label}
    </div>
  </div>
</div>
`;

export function confirmationEmailHtml(registration: Registration): string {
  const ticket = TICKETS[registration.tipoParticipante];
  return wrapper(
    "¡Recibimos tu inscripción!",
    `
      <p>Hola <b>${registration.nombres}</b>, gracias por inscribirte al ${eventConfig.officialName} — ${eventConfig.name} ${eventConfig.edition}.</p>
      <p>Tu comprobante de pago fue recibido y está en revisión. Te confirmaremos por este mismo
      correo en un plazo máximo de 48 horas hábiles y te enviaremos el enlace de acceso a
      ${eventConfig.modality.platform} antes del inicio del curso.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:16px;">
        <tr><td style="padding:6px 0;color:#7c8ba0;">Tipo de participante</td><td style="padding:6px 0;text-align:right;font-weight:600;">${ticket.name}</td></tr>
        <tr><td style="padding:6px 0;color:#7c8ba0;">Institución</td><td style="padding:6px 0;text-align:right;font-weight:600;">${registration.institucion}</td></tr>
        <tr><td style="padding:6px 0;color:#7c8ba0;">Ciudad</td><td style="padding:6px 0;text-align:right;font-weight:600;">${registration.ciudad}</td></tr>
        <tr><td style="padding:6px 0;color:#7c8ba0;">Código de inscripción</td><td style="padding:6px 0;text-align:right;font-weight:600;">${registration.id.slice(0, 8)}</td></tr>
      </table>
    `
  );
}

export function adminNotificationEmailHtml(registration: Registration): string {
  const ticket = TICKETS[registration.tipoParticipante];
  return wrapper(
    "Nueva inscripción recibida",
    `
      <p><b>${registration.nombres} ${registration.apellidos}</b> se inscribió como ${ticket.name}.</p>
      <table style="width:100%;border-collapse:collapse;margin-top:8px;">
        <tr><td style="padding:6px 0;color:#7c8ba0;">DNI</td><td style="padding:6px 0;text-align:right;font-weight:600;">${registration.dni}</td></tr>
        <tr><td style="padding:6px 0;color:#7c8ba0;">Correo</td><td style="padding:6px 0;text-align:right;font-weight:600;">${registration.correo}</td></tr>
        <tr><td style="padding:6px 0;color:#7c8ba0;">Celular</td><td style="padding:6px 0;text-align:right;font-weight:600;">${registration.celular}</td></tr>
        <tr><td style="padding:6px 0;color:#7c8ba0;">Profesión</td><td style="padding:6px 0;text-align:right;font-weight:600;">${registration.profesion}</td></tr>
        <tr><td style="padding:6px 0;color:#7c8ba0;">Institución</td><td style="padding:6px 0;text-align:right;font-weight:600;">${registration.institucion}</td></tr>
        <tr><td style="padding:6px 0;color:#7c8ba0;">Ciudad</td><td style="padding:6px 0;text-align:right;font-weight:600;">${registration.ciudad}</td></tr>
      </table>
      <p style="margin-top:16px;">
        <a href="${registration.voucherUrl}" style="color:#0b5fd9;font-weight:600;">Ver comprobante de pago →</a>
      </p>
      <p style="margin-top:16px;color:#7c8ba0;">Valida el pago y actualiza el campo <code>estado</code> del registro
      <code>${registration.id}</code> en Supabase (aprobado / rechazado).</p>
    `
  );
}
