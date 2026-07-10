import type { Metadata } from "next";
import { SupabaseRegistrationRepository } from "@/infrastructure/supabase/registration-repository.impl";
import { ESTADO_LABEL, type RegistrationStatus } from "@/domain/entities/registration";
import { TICKETS, type TicketType } from "@/domain/entities/ticket";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LinkButton } from "@/components/ui/link-button";
import { RegistrationActions } from "./registration-actions";
import { logoutAdmin } from "./actions";

export const metadata: Metadata = {
  title: "Inscripciones",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const repository = new SupabaseRegistrationRepository();

const ESTADOS: readonly RegistrationStatus[] = ["pendiente", "aprobado", "rechazado"];
const TIPOS: readonly TicketType[] = ["profesional", "tecnico"];

const ESTADO_BADGE_VARIANT: Record<RegistrationStatus, "outline" | "default" | "destructive"> = {
  pendiente: "outline",
  aprobado: "default",
  rechazado: "destructive",
};

const selectClassName =
  "h-8 rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30";

function parseEnum<T extends string>(value: string | undefined, allowed: readonly T[]): T | undefined {
  return value && (allowed as readonly string[]).includes(value) ? (value as T) : undefined;
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const estado = parseEnum(firstValue(params.estado), ESTADOS);
  const tipoParticipante = parseEnum(firstValue(params.tipo), TIPOS);
  const search = firstValue(params.q)?.trim() || undefined;

  const registrations = await repository.list({ estado, tipoParticipante, search });

  const exportQuery = new URLSearchParams();
  if (estado) exportQuery.set("estado", estado);
  if (tipoParticipante) exportQuery.set("tipo", tipoParticipante);
  if (search) exportQuery.set("q", search);
  const exportHref = `/api/admin/export${exportQuery.size > 0 ? `?${exportQuery.toString()}` : ""}`;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Inscripciones</h1>
          <p className="text-sm text-muted-foreground">
            {registrations.length} resultado{registrations.length === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex gap-2">
          <LinkButton href={exportHref} variant="outline" size="sm">
            Exportar CSV
          </LinkButton>
          <form action={logoutAdmin}>
            <Button type="submit" variant="ghost" size="sm">
              Cerrar sesión
            </Button>
          </form>
        </div>
      </div>

      <form
        method="get"
        className="mb-6 flex flex-wrap items-end gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="q" className="text-xs text-muted-foreground">
            Buscar
          </label>
          <Input
            id="q"
            name="q"
            defaultValue={search ?? ""}
            placeholder="Nombre, apellido, DNI o correo"
            className="w-56"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="estado" className="text-xs text-muted-foreground">
            Estado
          </label>
          <select id="estado" name="estado" defaultValue={estado ?? ""} className={selectClassName}>
            <option value="">Todos</option>
            {ESTADOS.map((value) => (
              <option key={value} value={value}>
                {ESTADO_LABEL[value]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="tipo" className="text-xs text-muted-foreground">
            Tipo
          </label>
          <select id="tipo" name="tipo" defaultValue={tipoParticipante ?? ""} className={selectClassName}>
            <option value="">Todos</option>
            {TIPOS.map((value) => (
              <option key={value} value={value}>
                {TICKETS[value].name}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" size="sm">
          Filtrar
        </Button>
        <LinkButton href="/admin" variant="ghost" size="sm">
          Limpiar
        </LinkButton>
      </form>

      <div className="overflow-hidden overflow-x-auto rounded-xl ring-1 ring-foreground/10">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-foreground/10 text-xs text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-2 font-medium">Nombre</th>
              <th className="px-4 py-2 font-medium">DNI</th>
              <th className="px-4 py-2 font-medium">Contacto</th>
              <th className="px-4 py-2 font-medium">Tipo</th>
              <th className="px-4 py-2 font-medium">Institución</th>
              <th className="px-4 py-2 font-medium">Voucher</th>
              <th className="px-4 py-2 font-medium">Estado</th>
              <th className="px-4 py-2 font-medium">Fecha</th>
              <th className="px-4 py-2 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10">
            {registrations.map((registration) => (
              <tr key={registration.id}>
                <td className="px-4 py-2">
                  {registration.nombres} {registration.apellidos}
                </td>
                <td className="px-4 py-2">{registration.dni}</td>
                <td className="px-4 py-2">
                  <div>{registration.correo}</div>
                  <div className="text-muted-foreground">{registration.celular}</div>
                </td>
                <td className="px-4 py-2">{TICKETS[registration.tipoParticipante].name}</td>
                <td className="px-4 py-2">
                  <div>{registration.institucion}</div>
                  <div className="text-muted-foreground">{registration.ciudad}</div>
                </td>
                <td className="px-4 py-2">
                  <a
                    href={registration.voucherUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Ver
                  </a>
                </td>
                <td className="px-4 py-2">
                  <Badge variant={ESTADO_BADGE_VARIANT[registration.estado]}>
                    {ESTADO_LABEL[registration.estado]}
                  </Badge>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {new Date(registration.fechaRegistro).toLocaleString("es-PE")}
                </td>
                <td className="px-4 py-2">
                  <RegistrationActions id={registration.id} estado={registration.estado} />
                </td>
              </tr>
            ))}
            {registrations.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-8 text-center text-muted-foreground">
                  No hay inscripciones con estos filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
