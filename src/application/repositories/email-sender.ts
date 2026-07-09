import type { Registration } from "@/domain/entities/registration";

export interface EmailSender {
  sendRegistrationConfirmation(registration: Registration): Promise<void>;
  sendAdminNotification(registration: Registration): Promise<void>;
}
