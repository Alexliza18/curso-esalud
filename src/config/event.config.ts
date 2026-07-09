export interface EventConfig {
  slug: string;
  name: string;
  officialName: string;
  shortName: string;
  edition: string;
  tagline: string;
  description: string;
  dateRange: { start: string; end: string; label: string };
  modality: {
    type: "virtual";
    platform: string;
    note: string;
  };
  academic: {
    hours: number;
    credits: number;
    minAttendancePercent: number;
  };
  audience: string[];
  registrationOpen: boolean;
  social: {
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  whatsapp: {
    phone: string;
    message: string;
  };
  payment: {
    accountHolder: string;
    bank: string;
    accountType: string;
    accountNumber: string;
    cci: string;
    plin: string;
    yape: string;
  };
}

export const eventConfig: EventConfig = {
  slug: "quirofano-del-futuro",
  name: "Quirófano del Futuro",
  officialName: "XI Curso Nacional y XII Regional de Enfermería en Centro Quirúrgico",
  shortName: "QF",
  edition: "2026",
  tagline: "Nuevas tendencias en seguridad y tecnología quirúrgica",
  description:
    "Curso virtual organizado por el Servicio de Centro Quirúrgico del Hospital Nacional Almanzor Aguinaga Asenjo (EsSalud), con el respaldo del Colegio de Enfermeros del Perú y la Universidad Católica Santo Toribio de Mogrovejo. 34 horas académicas y 02 créditos, 100% virtual vía Zoom.",
  dateRange: {
    start: "2026-09-25T08:00:00-05:00",
    end: "2026-09-27T13:00:00-05:00",
    label: "25 al 27 de septiembre de 2026",
  },
  modality: {
    type: "virtual",
    platform: "Zoom",
    note: "100% virtual",
  },
  academic: {
    hours: 34,
    credits: 2,
    minAttendancePercent: 80,
  },
  audience: [
    "Licenciadas(os) en Enfermería",
    "Enfermeras(os) especialistas",
    "Personal asistencial de áreas quirúrgicas",
    "Docentes de enfermería",
    "Estudiantes de Segunda Especialidad",
    "Internas(os) de Enfermería",
    "Profesionales de la salud vinculados al entorno quirúrgico",
  ],
  registrationOpen: true,
  social: {
    instagram: "#",
    linkedin: "#",
    youtube: "#",
  },
  whatsapp: {
    phone: "51979268581",
    message: "Hola, quiero información sobre el XI Curso Nacional de Enfermería en Centro Quirúrgico — Quirófano del Futuro 2026",
  },
  payment: {
    accountHolder: "Doris Maco Serrato",
    bank: "Scotiabank",
    accountType: "Cuenta de ahorro en soles",
    accountNumber: "7241374060",
    cci: "00932020724137406033",
    plin: "979 268 581",
    yape: "978 832 660",
  },
};
