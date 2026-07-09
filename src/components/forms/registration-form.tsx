"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  registrationSchema,
  type RegistrationInput,
} from "@/application/dto/registration.schema";
import { TICKETS, CURRENCY } from "@/domain/entities/ticket";
import { useCreateRegistration, RegistrationRequestError } from "@/hooks/use-create-registration";

interface FieldConfig {
  name: keyof Omit<RegistrationInput, "tipoParticipante" | "voucher" | "aceptaTerminos">;
  label: string;
  placeholder: string;
  type?: string;
}

const IDENTITY_FIELDS: FieldConfig[] = [
  { name: "nombres", label: "Nombres", placeholder: "Ej. María Fernanda" },
  { name: "apellidos", label: "Apellidos", placeholder: "Ej. Rojas Vega" },
  { name: "dni", label: "DNI", placeholder: "8 dígitos" },
];

const CONTACT_FIELDS: FieldConfig[] = [
  { name: "correo", label: "Correo electrónico", placeholder: "tucorreo@ejemplo.com", type: "email" },
  { name: "celular", label: "Celular", placeholder: "987654321" },
];

const PROFILE_FIELDS: FieldConfig[] = [
  { name: "profesion", label: "Profesión", placeholder: "Ej. Enfermería quirúrgica" },
  { name: "institucion", label: "Institución", placeholder: "Ej. Hospital Nacional Almanzor Aguinaga Asenjo" },
  { name: "ciudad", label: "Ciudad", placeholder: "Ej. Chiclayo" },
];

export function RegistrationForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const createRegistration = useCreateRegistration();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { tipoParticipante: "profesional", aceptaTerminos: false },
  });

  const tipoParticipante = watch("tipoParticipante");
  const voucher = watch("voucher");

  async function onSubmit(data: RegistrationInput) {
    setSubmitError(null);

    try {
      const registration = await createRegistration.mutateAsync(data);
      toast.success("Inscripción registrada correctamente");
      router.push(`/registro/${registration.id}/exito`);
    } catch (error) {
      if (error instanceof RegistrationRequestError) {
        setSubmitError(error.message);
        toast.error(error.message);
        if (error.field) {
          setError(error.field, { type: "manual", message: error.message });
        }
        return;
      }
      const message = "No pudimos completar tu inscripción. Intenta de nuevo.";
      setSubmitError(message);
      toast.error(message);
    }
  }

  function renderField({ name, label, placeholder, type }: FieldConfig) {
    const error = errors[name];
    return (
      <div key={name} className="flex flex-col gap-2">
        <Label htmlFor={name}>{label}</Label>
        <Input
          id={name}
          type={type ?? "text"}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...register(name)}
        />
        {error && (
          <p id={`${name}-error`} className="text-sm text-destructive">
            {error.message as string}
          </p>
        )}
      </div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 rounded-3xl border border-border/60 bg-card p-6 shadow-sm sm:p-8"
      noValidate
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {IDENTITY_FIELDS.map(renderField)}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">{CONTACT_FIELDS.map(renderField)}</div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {PROFILE_FIELDS.map(renderField)}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="tipoParticipante">Tipo de participante</Label>
        <Select
          value={tipoParticipante}
          onValueChange={(value) =>
            setValue("tipoParticipante", value as RegistrationInput["tipoParticipante"], {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger id="tipoParticipante" className="w-full">
            <SelectValue placeholder="Selecciona un tipo de participante" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(TICKETS).map((ticket) => (
              <SelectItem key={ticket.type} value={ticket.type}>
                {ticket.name} — {CURRENCY} {ticket.price}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.tipoParticipante && (
          <p className="text-sm text-destructive">{errors.tipoParticipante.message}</p>
        )}
      </div>

      <Controller
        control={control}
        name="voucher"
        render={({ field: { onChange, name, ref } }) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor="voucher-file">Comprobante de pago</Label>
            <label
              htmlFor="voucher-file"
              className="flex cursor-pointer flex-col items-center gap-3 rounded-2xl border border-dashed border-border px-6 py-10 text-center transition-colors hover:border-primary"
            >
              <UploadCloud className="size-8 text-muted-foreground" />
              <span className="text-sm font-medium">
                {voucher ? voucher.name : "Haz clic para adjuntar tu voucher"}
              </span>
              <span className="text-xs text-muted-foreground">JPG, PNG, WEBP o PDF · máx. 5MB</span>
            </label>
            <input
              id="voucher-file"
              name={name}
              ref={ref}
              type="file"
              accept="image/png,image/jpeg,image/webp,application/pdf"
              className="sr-only"
              onChange={(e) => onChange(e.target.files?.[0])}
            />
            {errors.voucher && (
              <p role="alert" className="text-sm text-destructive">
                {errors.voucher.message as string}
              </p>
            )}
          </div>
        )}
      />

      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input
            type="checkbox"
            className="mt-0.5 size-4 shrink-0 rounded border-border text-primary accent-primary"
            aria-invalid={!!errors.aceptaTerminos}
            {...register("aceptaTerminos")}
          />
          Acepto los términos y condiciones y el tratamiento de mis datos personales para fines
          del curso.
        </label>
        {errors.aceptaTerminos && (
          <p role="alert" className="text-sm text-destructive">
            {errors.aceptaTerminos.message as string}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={createRegistration.isPending}
        className="mt-2 rounded-full"
      >
        {createRegistration.isPending && <Loader2 className="size-4 animate-spin" />}
        Inscribirme ahora
      </Button>

      {submitError && (
        <p role="alert" className="text-center text-sm text-destructive">
          {submitError}
        </p>
      )}

      <p className="text-center text-xs text-muted-foreground">
        Recuerda enviar tu voucher también por WhatsApp indicando tu nombre completo. Te
        confirmaremos por correo y te enviaremos el enlace de Zoom antes del curso.
      </p>
    </motion.form>
  );
}
