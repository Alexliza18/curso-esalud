import "server-only";
import type { RegistrationRepository } from "@/application/repositories/registration-repository";
import type { RegistrationFields } from "@/application/dto/registration.schema";
import type { Registration } from "@/domain/entities/registration";
import type { TicketType } from "@/domain/entities/ticket";
import type { RegistrationRow } from "@/types/database.types";
import { DuplicateRegistrationError } from "@/domain/errors/domain-errors";
import { getSupabaseAdminClient } from "./admin-client";

function toDomain(row: RegistrationRow): Registration {
  return {
    id: row.id,
    nombres: row.nombres,
    apellidos: row.apellidos,
    dni: row.dni,
    correo: row.correo,
    celular: row.celular,
    profesion: row.profesion,
    tipoParticipante: row.tipo_participante,
    ciudad: row.ciudad,
    institucion: row.institucion,
    voucherUrl: row.voucher_url,
    aceptaTerminos: row.acepta_terminos,
    estado: row.estado,
    fechaRegistro: row.fecha_registro,
  };
}

const UNIQUE_VIOLATION = "23505";

export class SupabaseRegistrationRepository implements RegistrationRepository {
  private get client() {
    return getSupabaseAdminClient();
  }

  async create(id: string, input: RegistrationFields, voucherUrl: string): Promise<Registration> {
    const { data, error } = await this.client
      .from("registrations")
      .insert({
        id,
        nombres: input.nombres,
        apellidos: input.apellidos,
        dni: input.dni,
        correo: input.correo,
        celular: input.celular,
        profesion: input.profesion,
        tipo_participante: input.tipoParticipante,
        ciudad: input.ciudad,
        institucion: input.institucion,
        voucher_url: voucherUrl,
        acepta_terminos: input.aceptaTerminos,
      })
      .select()
      .single();

    if (error) {
      if (error.code === UNIQUE_VIOLATION) {
        throw new DuplicateRegistrationError(error.message.includes("dni") ? "dni" : "correo");
      }
      throw new Error(error.message);
    }

    return toDomain(data);
  }

  async findById(id: string): Promise<Registration | null> {
    const { data, error } = await this.client
      .from("registrations")
      .select()
      .eq("id", id)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data ? toDomain(data) : null;
  }

  async findByDniOrCorreo(dni: string, correo: string): Promise<Registration | null> {
    const { data, error } = await this.client
      .from("registrations")
      .select()
      .or(`dni.eq.${dni},correo.eq.${correo}`)
      .limit(1)
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data ? toDomain(data) : null;
  }

  async countByTipoParticipante(tipoParticipante: TicketType): Promise<number> {
    const { count, error } = await this.client
      .from("registrations")
      .select("id", { count: "exact", head: true })
      .eq("tipo_participante", tipoParticipante)
      .neq("estado", "rechazado");

    if (error) throw new Error(error.message);
    return count ?? 0;
  }
}
