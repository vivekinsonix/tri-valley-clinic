'use client';

import SeoHead from '@/app/components/seo/seoHead';
import { ALTERNATE_UI_URL } from '@/app/constants/appconstants';
import { Card } from 'flowbite-react';

export default function Policy() {
  const seoTitle = 'Privacy Policy – Dolcera';
  const seoDescription = 'Learn how Dolcera Information Technology Services Pvt Ltd collects, uses, stores, and protects your personal data.';
  const seoKeywords = 'Dolcera Privacy Policy, Data Protection, GDPR, CCPA, Cookies Policy';
  const seoUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ALTERNATE_UI_URL}/privacy-policy`;
  const seoImage = '/default-og.jpg';

  return (
    <>
      <SeoHead title={seoTitle} description={seoDescription} keywords={seoKeywords} url={seoUrl} image={seoImage} />

      <section className="min-h-screen w-full dark:bg-foreground">
        <main className="container mx-auto max-w-7xl px-4 py-16">
          <header className="my-16 text-center">
            <h1 className="mt-5">Pivacy Policy</h1>
            <p className="mt-2 text-gray-400">TRI-VALLEY CLINIC</p>
          </header>

          {/* Content */}
          <div className="prose prose-gray max-w-none ">
            <div className="container mx-auto px-2 text-left">
              <div className="mx-auto max-w-4xl  py-3">
                <h2 className="text-xl mt-0 font-semibold text-accent dark:text-accent">1. Information We Collect</h2>

                <h3 className="text-lg font-medium mt-4">Personal Information</h3>
                <p>Name, phone number, email address, date of birth, and other information provided through patient forms.</p>

                <h3 className="text-lg font-medium mt-4">Health Information</h3>
                <p>Any details you voluntarily share during appointment about health concerns.</p>

                <h3 className="text-lg font-medium mt-4">Usage Information</h3>
                <p>Information about your interaction with our website, including IP address, browser type, and cookies.</p>

                <h3 className="text-lg font-medium mt-4">Mobile SMS Information</h3>
                <p>If you opt-in to receive SMS messages, we collect and store your mobile phone number and communication preferences</p>

                <h2 className="text-xl font-semibold text-accent dark:text-accent mt-4">2. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide psychiatric services and schedule appointments</li>
                  <li>Communicate with you regarding diagnosis, medications, treatments, appointments, billing, and updates.</li>
                  <li>Respond to your inquiries and provide patient support</li>
                  <li>Comply with legal and regulatory requirements</li>
                </ul>

                <h2 className="text-xl font-semibold text-accent dark:text-accent mt-4">3. Third-Party Disclosure</h2>
                <p>We do not sell, trade, or share your personal information with third parties for marketing or any other purposes. Your data is shared with trusted service providers when necessary for delivering our services, and they are required to maintain confidentiality</p>

                <h2 className="text-xl font-semibold text-accent dark:text-accent mt-4">4. Your Rights and Choices</h2>

                <h3 className="text-lg font-medium mt-4">You have the right to see a copy of your medical records</h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li> if you would like a copy let us know. We will grant your request during business hours within 5 working days. The records can be viewed by you or your personal representative.</li>
                  <li>You may ask to see or get an electronic or paper copy of your medical record and other health information we have about you.</li>
                  <li>You have the right to ask us to correct your medical record.</li>
                  <li>You can ask us to contact you in a specific way or sent mail to a different address.</li>
                  <li>You have the right to withdraw consent for communication at any time</li>
                  <li>You have the right to request deletion of your personal data, subject to legal and operational requirements. </li>
                </ul>

                <p className="mt-4">
                  For more information, please visi{' '}
                  <a className="text-blue-900 underline" href="https://www.hhs.gov/hipaa/for-individuals/guidance-materials-for-consumers/index.html">
                    {' '}
                    Your Rights Under HIPAA | HHS.gov
                  </a>
                  .
                </p>

                <h2 className="text-xl font-semibold text-accent dark:text-accent mt-4">Changes to This Policy</h2>
                <p>We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated effective date.</p>
                <p>
                  For more information, please visit{' '}
                  <a className="text-blue-900 underline" href="https://www.hhs.gov/hipaa/for-individuals/notice-privacy-practices/index.html">
                    {' '}
                    Notice of Privacy Practices | HHS.gov
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
