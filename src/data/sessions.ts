import type { Session } from "@/domain/entities/session";

export const sessions: Session[] = [
  { id: "1-1", day: 1, time: "18:00", title: "Ceremonia de apertura", speaker: "Comité organizador", room: "Auditorio virtual · Zoom" },
  { id: "1-2", day: 1, time: "18:30", title: "Innovación tecnológica en el quirófano", speaker: "Docentes invitados · USAT", room: "Auditorio virtual · Zoom" },
  { id: "1-3", day: 1, time: "20:00", title: "Seguridad del paciente: protocolos actualizados", speaker: "Docentes invitados · CEP", room: "Auditorio virtual · Zoom" },
  { id: "2-1", day: 2, time: "09:00", title: "Liderazgo en centro quirúrgico", speaker: "Docentes invitados · USAT", room: "Auditorio virtual · Zoom" },
  { id: "2-2", day: 2, time: "11:00", title: "Instrumental y equipos de última generación", speaker: "Docentes invitados · EsSalud", room: "Auditorio virtual · Zoom" },
  { id: "2-3", day: 2, time: "15:00", title: "Humanización del cuidado perioperatorio", speaker: "Docentes invitados · CEP", room: "Auditorio virtual · Zoom" },
  { id: "3-1", day: 3, time: "09:00", title: "Evaluación de aprendizaje — cuestionario virtual", speaker: "Comité académico", room: "Plataforma virtual" },
  { id: "3-2", day: 3, time: "10:30", title: "Encuesta de satisfacción", speaker: "Comité organizador", room: "Plataforma virtual" },
  { id: "3-3", day: 3, time: "12:00", title: "Clausura y entrega de certificados", speaker: "Comité organizador", room: "Auditorio virtual · Zoom" },
];
