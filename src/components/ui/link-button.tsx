import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface LinkButtonProps extends Omit<ComponentProps<typeof Button>, "render" | "children"> {
  href: string;
  children: ReactNode;
  target?: string;
  rel?: string;
}

export function LinkButton({ href, children, target, rel, ...props }: LinkButtonProps) {
  return (
    <Button
      {...props}
      nativeButton={false}
      render={
        <Link href={href} target={target} rel={rel}>
          {children}
        </Link>
      }
    />
  );
}
