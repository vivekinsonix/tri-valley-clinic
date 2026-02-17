'use client';

import { Modal, Button } from 'flowbite-react';
import { ReactNode } from 'react';

interface AppModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: ReactNode;
  children: ReactNode;
  showCloseIcon?: boolean;
}

export default function AppModal({ open, onClose, title, size = 'md', footer, children, showCloseIcon = true }: AppModalProps) {
  return (
    <Modal show={open} onClose={onClose} size={size} className="bg-black/10 backdrop-blur-sm">
      {/* Header */}
      {(title || showCloseIcon) && (
        <div className="flex items-center justify-between p-4 md:p-5 border-b dark:border-gray-600">
          {title && <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>}

          {showCloseIcon && (
            <button type="button" onClick={onClose} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
              ✕
            </button>
          )}
        </div>
      )}

      {/* Body */}
      <div className="p-4 md:p-5">{children}</div>

      {/* Footer */}
      {footer && <div className="flex items-center p-4 md:p-5 border-t border-gray-200 dark:border-gray-600 justify-end">{footer}</div>}
    </Modal>
  );
}
