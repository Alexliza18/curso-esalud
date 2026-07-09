import type { Registration } from "@/domain/entities/registration";
import type { TicketType } from "@/domain/entities/ticket";
import type { RegistrationFields } from "@/application/dto/registration.schema";

export interface RegistrationRepository {
  create(id: string, input: RegistrationFields, voucherUrl: string): Promise<Registration>;
  findById(id: string): Promise<Registration | null>;
  findByDniOrCorreo(dni: string, correo: string): Promise<Registration | null>;
  countByTipoParticipante(tipoParticipante: TicketType): Promise<number>;
}
