import type { Registration, RegistrationStatus } from "@/domain/entities/registration";
import type { TicketType } from "@/domain/entities/ticket";
import type { RegistrationFields } from "@/application/dto/registration.schema";

export interface RegistrationListFilters {
  estado?: RegistrationStatus;
  tipoParticipante?: TicketType;
  search?: string;
}

export interface RegistrationRepository {
  create(id: string, input: RegistrationFields, voucherUrl: string): Promise<Registration>;
  findById(id: string): Promise<Registration | null>;
  findByDniOrCorreo(dni: string, correo: string): Promise<Registration | null>;
  countByTipoParticipante(tipoParticipante: TicketType): Promise<number>;
  list(filters: RegistrationListFilters): Promise<Registration[]>;
  updateEstado(id: string, estado: RegistrationStatus): Promise<Registration>;
}
