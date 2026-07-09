export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_PE",
  organizer: {
    name: "Servicio de Centro Quirúrgico — Hospital Nacional Almanzor Aguinaga Asenjo (EsSalud)",
    email: "contacto@quirofanodelfuturo.com",
  },
} as const;
