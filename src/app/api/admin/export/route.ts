import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-session";
import { SupabaseRegistrationRepository } from "@/infrastructure/supabase/registration-repository.impl";
import { ESTADO_LABEL, type RegistrationStatus } from "@/domain/entities/registration";
import { TICKETS, type TicketType } from "@/domain/entities/ticket";

const repository = new SupabaseRegistrationRepository();

const ESTADOS: readonly RegistrationStatus[] = ["pendiente", "aprobado", "rechazado"];
const TIPOS: readonly TicketType[] = ["profesional", "tecnico"];

function parseEnum<T extends string>(value: string | null, allowed: readonly T[]): T | undefined {
  return value && (allowed as readonly string[]).includes(value) ? (value as T) : undefined;
}

function csvEscape(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const estado = parseEnum(searchParams.get("estado"), ESTADOS);
  const tipoParticipante = parseEnum(searchParams.get("tipo"), TIPOS);
  const search = searchParams.get("q")?.trim() || undefined;

  const registrations = await repository.list({ estado, tipoParticipante, search });

  const header = [
    "Nombres",
    "Apellidos",
    "DNI",
    "Correo",
    "Celular",
    "Profesión",
    "Tipo de participante",
    "Ciudad",
    "Institución",
    "Estado",
    "Fecha de registro",
    "Comprobante",
  ];

  const rows = registrations.map((registration) => [
    registration.nombres,
    registration.apellidos,
    registration.dni,
    registration.correo,
    registration.celular,
    registration.profesion,
    TICKETS[registration.tipoParticipante].name,
    registration.ciudad,
    registration.institucion,
    ESTADO_LABEL[registration.estado],
    new Date(registration.fechaRegistro).toISOString(),
    registration.voucherUrl,
  ]);

  const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
  const bom = "﻿";

  return new NextResponse(bom + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="inscripciones-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
