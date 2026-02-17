'use client';

import AppModal from '@/app/components/modal/AppModal';
import { save_newsletter_subscription } from '@/app/services/homePageService';
import SpinnerService from '@/app/services/SpinnerService';
import ToastService from '@/app/services/toasterService';
import { Button, TextInput } from 'flowbite-react';
import { Mail, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NewsletterModal() {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  const handleSubscribe = async () => {
    sessionStorage.setItem('newsletterShown', 'true');
    setOpenModal(false);

    SpinnerService.showSpinner();
    try {
      await save_newsletter_subscription({ email });
      ToastService.showToast('You have successfully subscribed to the newsletter.', 'success');
    } catch (err) {
      console.error('Subscription error:', err);
    } finally {
      setEmail('');
      SpinnerService.hideSpinner();
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-open logic (optional)
  // useEffect(() => {
  //   if (isMounted && !sessionStorage.getItem('newsletterShown')) {
  //     setOpenModal(true);
  //   }
  // }, [isMounted]);

  return (
    <>
      {/* Trigger */}
      <div className="hover:underline cursor-pointer" onClick={() => setOpenModal(true)}>
        Subscribe
      </div>

      {/* Modal */}
      <AppModal open={openModal} onClose={() => setOpenModal(false)} size="md" showCloseIcon={false} footer={null}>
        {/* Close Icon */}
        <button onClick={() => setOpenModal(false)} className="absolute right-4 top-4 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white">
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-4 mt-4">
          {/* Icon */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>

          <h3 className="text-xl font-semibold dark:text-white">Join our Newsletter</h3>

          <p className="text-sm dark:text-gray-200">Subscribe to receive the latest updates, articles & insights.</p>

          <TextInput type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2" />

          <Button className="w-full" onClick={handleSubscribe}>
            Subscribe Now
          </Button>
        </div>
      </AppModal>
    </>
  );
}
