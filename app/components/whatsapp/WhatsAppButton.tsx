'use client';

import { Button } from 'flowbite-react';
import { openWhatsApp, WhatsAppPayload } from '@/app/utils/whatsapp';

interface WhatsAppButtonProps {
  payload: WhatsAppPayload;
  label?: string;
  className?: string;
  outline?: boolean;
}

export const WhatsAppButton = ({ payload, label = 'Chat on WhatsApp', className = 'w-full', outline = false }: WhatsAppButtonProps) => {
  return (
    <Button className={className} outline={outline} onClick={() => openWhatsApp(payload)}>
      {label}
    </Button>
  );
};
