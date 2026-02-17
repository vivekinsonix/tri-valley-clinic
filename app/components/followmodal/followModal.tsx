'use client';
import { useState, useEffect } from 'react';

export default function FollowModal({ onFollowed }: { onFollowed: () => void }) {
  const [open, setOpen] = useState(false);
  const [showConfirmBtn, setShowConfirmBtn] = useState(false);

  useEffect(() => {
    const isFollowed = sessionStorage.getItem('isFollowed');
    if (!isFollowed) setOpen(true);
  }, []);

  const handleFollowClick = () => {
    window.open('https://www.linkedin.com/company/insonixinc/', '_blank');
    setShowConfirmBtn(true);
  };

  const handleConfirm = () => {
    sessionStorage.setItem('isFollowed', 'true');
    setOpen(false);
    onFollowed();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
        <p className="text-sm mb-5">Follow our LinkedIn page to unlock all case studies.</p>

        {!showConfirmBtn && (
          <button
            onClick={handleFollowClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full shadow-[0_8px_30px_rgba(33,84,255,0.25),_0_0_20px_rgba(75,201,255,0.22)]
      transition-all duration-[250ms] ease 
      bg-gradient-to-r from-primary-200 to-primary-100
      px-8 py-3 font-bold tracking-wide text-black uppercase hover:scale-105 "
          >
            Follow on LinkedIn
          </button>
        )}

        {showConfirmBtn && (
          <button onClick={handleConfirm} className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md w-full">
            I have followed
          </button>
        )}
      </div>
    </div>
  );
}
