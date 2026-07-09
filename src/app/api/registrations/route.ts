import { NextResponse } from "next/server";
import { registrationSchema } from "@/application/dto/registration.schema";
import { createRegistration } from "@/application/use-cases/create-registration";
import { SupabaseRegistrationRepository } from "@/infrastructure/supabase/registration-repository.impl";
import { SupabaseVoucherStorage } from "@/infrastructure/supabase/voucher-storage.impl";
import { ResendEmailSender } from "@/infrastructure/email/resend-email-sender";
import { DuplicateRegistrationError, SoldOutError } from "@/domain/errors/domain-errors";

const repository = new SupabaseRegistrationRepository();
const storage = new SupabaseVoucherStorage();
const emailSender = new ResendEmailSender();

export async function POST(request: Request) {
  const formData = await request.formData();

  const parsed = registrationSchema.safeParse({
    nombres: formData.get("nombres"),
    apellidos: formData.get("apellidos"),
    dni: formData.get("dni"),
    correo: formData.get("correo"),
    celular: formData.get("celular"),
    profesion: formData.get("profesion"),
    tipoParticipante: formData.get("tipoParticipante"),
    ciudad: formData.get("ciudad"),
    institucion: formData.get("institucion"),
    aceptaTerminos: formData.get("aceptaTerminos") === "true",
    voucher: formData.get("voucher"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Revisa los datos ingresados." },
      { status: 400 }
    );
  }

  try {
    const registration = await createRegistration(repository, storage, emailSender, parsed.data);
    return NextResponse.json({ registration });
  } catch (error) {
    if (error instanceof DuplicateRegistrationError) {
      return NextResponse.json({ error: error.message, field: error.field }, { status: 409 });
    }
    if (error instanceof SoldOutError) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    console.error("Error al crear inscripción:", error);
    return NextResponse.json(
      { error: "No pudimos completar tu inscripción. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
