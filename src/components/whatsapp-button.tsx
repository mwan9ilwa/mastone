"use client";

import { motion } from "motion/react";
import { WhatsAppIcon } from "@/components/icons";


export function WhatsAppButton({ whatsapp }: { whatsapp: string }) {
  return (
    <motion.a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      className="fixed right-5 bottom-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
      <WhatsAppIcon className="relative size-7" />
    </motion.a>
  );
}
