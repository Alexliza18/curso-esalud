"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { destroyAdminSession, isAdminAuthenticated } from "@/lib/admin-session";
import { SupabaseRegistrationRepository } from "@/infrastructure/supabase/registration-repository.impl";
import type { RegistrationStatus } from "@/domain/entities/registration";

const repository = new SupabaseRegistrationRepository();

export async function updateRegistrationStatus(
  id: string,
  estado: RegistrationStatus
): Promise<void> {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  await repository.updateEstado(id, estado);
  revalidatePath("/admin");
}

export async function logoutAdmin(): Promise<void> {
  await destroyAdminSession();
  redirect("/admin/login");
}
