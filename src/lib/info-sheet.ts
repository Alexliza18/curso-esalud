import { eventConfig } from "@/config/event.config";
import { TICKETS } from "@/domain/entities/ticket";

function buildInfoSheetContent(): string {
  const lines = [
    `${eventConfig.officialName}`,
    `${eventConfig.name} ${eventConfig.edition} — ${eventConfig.tagline}`,
    "",
    "ORGANIZA",
    "Servicio de Centro Quirúrgico del Hospital Nacional Almanzor Aguinaga Asenjo — EsSalud",
    "",
    "AUSPICIO Y RESPALDO",
    "Colegio de Enfermeros del Perú (CEP)",
    "Universidad Católica Santo Toribio de Mogrovejo (USAT)",
    "",
    "MODALIDAD",
    `${eventConfig.modality.note} — Plataforma ${eventConfig.modality.platform}`,
    "",
    "FECHAS",
    eventConfig.dateRange.label,
    "",
    "DURACIÓN",
    `${eventConfig.academic.hours} horas académicas · ${eventConfig.academic.credits} créditos académicos`,
    "",
    "DIRIGIDO A",
    ...eventConfig.audience.map((item) => `- ${item}`),
    "",
    "COSTOS",
    ...Object.values(TICKETS).map((ticket) => `${ticket.name}: S/ ${ticket.price}`),
    "",
    "DATOS PARA EL PAGO",
    `Titular: ${eventConfig.payment.accountHolder}`,
    `Banco: ${eventConfig.payment.bank}`,
    `${eventConfig.payment.accountType}: ${eventConfig.payment.accountNumber}`,
    `CCI: ${eventConfig.payment.cci}`,
    `Plin: ${eventConfig.payment.plin}`,
    `Yape: ${eventConfig.payment.yape}`,
    "",
    "Después de pagar, envía tu comprobante junto a tu nombre completo por WhatsApp al",
    eventConfig.payment.plin,
    "",
    "CERTIFICACIÓN",
    `Certificado con valor oficial de ${eventConfig.academic.credits} créditos académicos y ${eventConfig.academic.hours} horas académicas,`,
    `sujeto a una asistencia mínima del ${eventConfig.academic.minAttendancePercent}% y la aprobación de los requisitos establecidos.`,
    "",
    "Inscripciones: /registro",
  ];

  return lines.join("\n");
}

export function downloadInfoSheet(): void {
  const blob = new Blob([buildInfoSheetContent()], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${eventConfig.slug}-${eventConfig.edition}-informacion.txt`;
  link.click();
  URL.revokeObjectURL(url);
}
