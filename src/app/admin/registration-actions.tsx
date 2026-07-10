"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import type { RegistrationStatus } from "@/domain/entities/registration";
import { updateRegistrationStatus } from "./actions";

export function RegistrationActions({
  id,
  estado,
}: {
  id: string;
  estado: RegistrationStatus;
}) {
  const [isPending, startTransition] = useTransition();

  function handleUpdate(next: RegistrationStatus) {
    startTransition(() => {
      updateRegistrationStatus(id, next);
    });
  }

  return (
    <div className="flex gap-1.5">
      <Button
        size="xs"
        variant="outline"
        disabled={isPending || estado === "aprobado"}
        onClick={() => handleUpdate("aprobado")}
      >
        Aprobar
      </Button>
      <Button
        size="xs"
        variant="destructive"
        disabled={isPending || estado === "rechazado"}
        onClick={() => handleUpdate("rechazado")}
      >
        Rechazar
      </Button>
    </div>
  );
}
