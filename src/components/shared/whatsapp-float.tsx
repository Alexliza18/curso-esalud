"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/config/event.config";
import { WhatsappIcon } from "./whatsapp-icon";

export function WhatsappFloat() {
  const href = `https://wa.me/${eventConfig.whatsapp.phone}?text=${encodeURIComponent(eventConfig.whatsapp.message)}`;

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="group fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-40 motion-reduce:hidden" />
      <WhatsappIcon className="relative size-7" />
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-sm font-medium text-background opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Escríbenos
      </span>
    </motion.a>
  );
}
