import type { TicketType } from "./ticket";

export type RegistrationStatus = "pendiente" | "aprobado" | "rechazado";

export interface Registration {
  id: string;
  nombres: string;
  apellidos: string;
  dni: string;
  correo: string;
  celular: string;
  profesion: string;
  tipoParticipante: TicketType;
  ciudad: string;
  institucion: string;
  voucherUrl: string;
  aceptaTerminos: boolean;
  estado: RegistrationStatus;
  fechaRegistro: string;
}

export const ESTADO_LABEL: Record<RegistrationStatus, string> = {
  pendiente: "Comprobante en revisión",
  aprobado: "Inscripción confirmada",
  rechazado: "Comprobante rechazado",
};
