'use client';

import { Button } from 'flowbite-react';
import AppModal from '../modal/AppModal';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ResponsibleDisclosureModal({ open, onClose }: Props) {
  return (
    <AppModal open={open} onClose={onClose} title="Responsible Disclosure" footer={<Button onClick={onClose}>Close</Button>}>
      <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        <p>We take the security of our systems seriously and appreciate the efforts of security researchers and users who help us keep our platform safe.</p>

        <p>If you believe you have discovered a security vulnerability in our website or services, please report it responsibly.</p>

        <p>When reporting a vulnerability, please include:</p>

        <ul className="list-disc list-inside space-y-1">
          <li>A clear description of the issue</li>
          <li>Steps to reproduce the vulnerability</li>
          <li>Potential impact or risk</li>
          <li>Screenshots or proof of concept (if available)</li>
        </ul>

        <p>Please avoid exploiting vulnerabilities or accessing user data.</p>

        <p className="font-medium">
          Report issues at:
          <span className="block text-blue-600 dark:text-blue-400">security@insonix.com</span>
        </p>
      </div>
    </AppModal>
  );
}
