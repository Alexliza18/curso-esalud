"use client";

import { useMutation } from "@tanstack/react-query";
import type { RegistrationInput } from "@/application/dto/registration.schema";
import type { Registration } from "@/domain/entities/registration";

class RegistrationRequestError extends Error {
  readonly field?: "dni" | "correo";

  constructor(message: string, field?: "dni" | "correo") {
    super(message);
    this.name = "RegistrationRequestError";
    this.field = field;
  }
}

async function createRegistrationRequest(input: RegistrationInput): Promise<Registration> {
  const formData = new FormData();
  formData.set("nombres", input.nombres);
  formData.set("apellidos", input.apellidos);
  formData.set("dni", input.dni);
  formData.set("correo", input.correo);
  formData.set("celular", input.celular);
  formData.set("profesion", input.profesion);
  formData.set("tipoParticipante", input.tipoParticipante);
  formData.set("ciudad", input.ciudad);
  formData.set("institucion", input.institucion);
  formData.set("aceptaTerminos", String(input.aceptaTerminos));
  formData.set("voucher", input.voucher);

  const response = await fetch("/api/registrations", { method: "POST", body: formData });
  const body = await response.json();

  if (!response.ok) {
    throw new RegistrationRequestError(body.error ?? "No pudimos completar tu inscripción.", body.field);
  }

  return body.registration;
}

export function useCreateRegistration() {
  return useMutation({
    mutationFn: createRegistrationRequest,
  });
}

export { RegistrationRequestError };
