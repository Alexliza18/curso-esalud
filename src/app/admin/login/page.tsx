import type { Metadata } from "next";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Acceso administrador",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-sm flex-col items-center justify-center gap-6 px-4">
      <div className="w-full space-y-1.5 text-center">
        <h1 className="text-xl font-semibold">Panel de administración</h1>
        <p className="text-sm text-muted-foreground">
          Ingresa la contraseña para ver las inscripciones.
        </p>
      </div>
      <LoginForm />
    </main>
  );
}
