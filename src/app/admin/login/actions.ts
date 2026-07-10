"use server";

import { redirect } from "next/navigation";
import { verifyAdminPassword } from "@/lib/admin-session-token";
import { createAdminSession } from "@/lib/admin-session";

export interface LoginState {
  error?: string;
}

export async function login(_state: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    return { error: "Contraseña incorrecta." };
  }

  await createAdminSession();
  redirect("/admin");
}
