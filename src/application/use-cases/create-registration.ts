import type { RegistrationRepository } from "@/application/repositories/registration-repository";
import type { VoucherStorage } from "@/application/repositories/voucher-storage";
import type { EmailSender } from "@/application/repositories/email-sender";
import { registrationFieldsSchema, type RegistrationInput } from "@/application/dto/registration.schema";
import type { Registration } from "@/domain/entities/registration";
import { TICKETS, hasAvailability } from "@/domain/entities/ticket";
import { DuplicateRegistrationError, SoldOutError } from "@/domain/errors/domain-errors";

export async function createRegistration(
  repository: RegistrationRepository,
  storage: VoucherStorage,
  emailSender: EmailSender,
  input: RegistrationInput
): Promise<Registration> {
  const existing = await repository.findByDniOrCorreo(input.dni, input.correo);
  if (existing) {
    throw new DuplicateRegistrationError(existing.dni === input.dni ? "dni" : "correo");
  }

  const ticket = TICKETS[input.tipoParticipante];
  const taken = await repository.countByTipoParticipante(input.tipoParticipante);
  if (!hasAvailability({ quota: ticket.quota, taken })) {
    throw new SoldOutError(ticket.name);
  }

  const id = crypto.randomUUID();
  const voucherUrl = await storage.upload(id, input.voucher);

  const fields = registrationFieldsSchema.parse(input);
  const registration = await repository.create(id, fields, voucherUrl);

  await Promise.allSettled([
    emailSender.sendRegistrationConfirmation(registration),
    emailSender.sendAdminNotification(registration),
  ]).then((results) => {
    results.forEach((result) => {
      if (result.status === "rejected") {
        console.error("No se pudo enviar un correo de inscripción:", result.reason);
      }
    });
  });

  return registration;
}
