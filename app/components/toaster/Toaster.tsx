'use client';
import ToastService from '@/app/services/toasterService';
import { Alert } from 'flowbite-react';
import { useCallback, useEffect, useState } from 'react';

interface ToastType {
  message?: string;
  type?: string;
  onClick?: () => void;
}

const Toaster = () => {
  const [toast, setToast] = useState<ToastType>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    ToastService.register((message, type) => {
      setToast({ message, type });
      setOpen(true);

      const duration = 3000;
      const timer = setTimeout(() => setOpen(false), duration);
      return () => clearTimeout(timer);
    });
  }, []);

  const handleClick = useCallback(() => {
    toast?.onClick?.();
    setOpen(false);
  }, [toast]);

  return (
    open && (
      <div className="fixed top-4 right-4 z-50" onClick={handleClick}>
        <Alert color={toast?.type || 'success'} onDismiss={() => alert('Alert dismissed!')}>
          {toast?.message}
        </Alert>
      </div>
    )
  );
};

export default Toaster;
