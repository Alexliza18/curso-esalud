import { z } from "zod";

const MAX_VOUCHER_SIZE = 5 * 1024 * 1024;
const VOUCHER_TYPES = ["image/png", "image/jpeg", "image/webp", "application/pdf"];

export const registrationFieldsSchema = z.object({
  nombres: z.string().trim().min(2, "Ingresa tus nombres").max(80, "Máximo 80 caracteres"),
  apellidos: z.string().trim().min(2, "Ingresa tus apellidos").max(80, "Máximo 80 caracteres"),
  dni: z
    .string()
    .trim()
    .regex(/^\d{8}$/, "El DNI debe tener 8 dígitos"),
  correo: z
    .string()
    .trim()
    .toLowerCase()
    .email("Ingresa un correo válido"),
  celular: z
    .string()
    .trim()
    .regex(/^9\d{8}$/, "Ingresa un celular válido (9 dígitos, ej. 987654321)"),
  profesion: z.string().trim().min(2, "Ingresa tu profesión").max(100, "Máximo 100 caracteres"),
  tipoParticipante: z.enum(["profesional", "tecnico"], {
    message: "Selecciona un tipo de participante",
  }),
  ciudad: z.string().trim().min(2, "Ingresa tu ciudad").max(80, "Máximo 80 caracteres"),
  institucion: z
    .string()
    .trim()
    .min(2, "Ingresa tu institución")
    .max(120, "Máximo 120 caracteres"),
  aceptaTerminos: z.boolean().refine((value) => value === true, {
    message: "Debes aceptar los términos y condiciones",
  }),
});

export const voucherFileSchema = z
  .instanceof(File, { message: "Adjunta tu comprobante de pago" })
  .refine((file) => file.size > 0, "Adjunta tu comprobante de pago")
  .refine((file) => file.size <= MAX_VOUCHER_SIZE, "El archivo debe pesar menos de 5MB")
  .refine(
    (file) => VOUCHER_TYPES.includes(file.type),
    "Formato no soportado. Usa JPG, PNG, WEBP o PDF"
  );

export const registrationSchema = registrationFieldsSchema.extend({
  voucher: voucherFileSchema,
});

export type RegistrationFields = z.infer<typeof registrationFieldsSchema>;
export type RegistrationInput = z.infer<typeof registrationSchema>;
