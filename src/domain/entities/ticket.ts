export type TicketType = "profesional" | "tecnico";

export interface Ticket {
  type: TicketType;
  name: string;
  price: number;
  quota: number;
  taken: number;
}

export function hasAvailability(ticket: Pick<Ticket, "quota" | "taken">): boolean {
  return ticket.taken < ticket.quota;
}

export const CURRENCY = "S/";

export const TICKETS: Record<TicketType, Omit<Ticket, "taken">> = {
  profesional: { type: "profesional", name: "Profesional de Enfermería", price: 100, quota: 500 },
  tecnico: { type: "tecnico", name: "Técnico de Enfermería", price: 80, quota: 300 },
};
