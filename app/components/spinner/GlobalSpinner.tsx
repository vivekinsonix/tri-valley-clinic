'use client';
import { Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import SpinnerService from '../../services/SpinnerService';

const GlobalSpinner = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    SpinnerService.register((loading: boolean) => {
      setOpen(loading);
    });
  }, []);

  return (
    open && (
      <div className="fixed inset-0 flex items-center justify-center bg-white/30 z-[13000]">
        <Spinner size="xl" style={{ color: '#2154ff' }} />
      </div>
    )
  );
};

export default GlobalSpinner;
