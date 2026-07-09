import "server-only";
import { Resend } from "resend";
import type { EmailSender } from "@/application/repositories/email-sender";
import type { Registration } from "@/domain/entities/registration";
import { eventConfig } from "@/config/event.config";
import { confirmationEmailHtml, adminNotificationEmailHtml } from "./templates";

function getAdminRecipients(): string[] {
  return (process.env.ADMIN_NOTIFICATION_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

export class ResendEmailSender implements EmailSender {
  private get client() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("Falta la variable de entorno RESEND_API_KEY.");
    }
    return new Resend(apiKey);
  }

  private get from() {
    return process.env.EMAIL_FROM ?? "onboarding@resend.dev";
  }

  async sendRegistrationConfirmation(registration: Registration): Promise<void> {
    await this.client.emails.send({
      from: this.from,
      to: registration.correo,
      subject: `Confirmación de inscripción — ${eventConfig.name} ${eventConfig.edition}`,
      html: confirmationEmailHtml(registration),
    });
  }

  async sendAdminNotification(registration: Registration): Promise<void> {
    const recipients = getAdminRecipients();
    if (recipients.length === 0) {
      console.warn("ADMIN_NOTIFICATION_EMAILS no está configurado; se omite la notificación.");
      return;
    }

    await this.client.emails.send({
      from: this.from,
      to: recipients,
      subject: `Nueva inscripción — ${registration.nombres} ${registration.apellidos} (${registration.tipoParticipante})`,
      html: adminNotificationEmailHtml(registration),
    });
  }
}
