export class SoldOutError extends Error {
  constructor(ticketType: string) {
    super(`No hay cupo disponible para el tipo de participante "${ticketType}".`);
    this.name = "SoldOutError";
  }
}

export type DuplicateField = "dni" | "correo";

export class DuplicateRegistrationError extends Error {
  readonly field: DuplicateField;

  constructor(field: DuplicateField) {
    super(
      field === "dni"
        ? "Ya existe una inscripción registrada con este DNI."
        : "Ya existe una inscripción registrada con este correo electrónico."
    );
    this.name = "DuplicateRegistrationError";
    this.field = field;
  }
}

export class RegistrationNotFoundError extends Error {
  constructor(id: string) {
    super(`No se encontró una inscripción con id "${id}".`);
    this.name = "RegistrationNotFoundError";
  }
}
