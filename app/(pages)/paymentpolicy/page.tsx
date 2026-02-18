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
            <h1 className="mt-5">Payment Policy</h1>
            <p className="mt-2 text-gray-400">TRI-VALLEY CLINIC</p>
          </header>

          {/* Content */}
          <div className="prose prose-gray max-w-none ">
            <div className="container mx-auto px-2 text-left">
              <div className="mx-auto max-w-4xl  py-3">
                <h2 className="text-xl font-semibold text-accent dark:text-accent mt-4">We accept these insurances listed below:</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Aetna </li>
                  <li>United Healthcare</li>
                  <li>Tricare</li>
                  <li>CIGNA PPO</li>
                  <li>Blue Shield PPO</li>
                  <li>Blue Cross PPO</li>
                  <li>Medi-Cal</li>
                  <li>Medicaid</li>
                </ul>

                <p>Before you visit us, please check with your individual insurance company to confirm that we can treat you. If your insurance is not listed or you wish to pay for service without, please call the clinic for service charges. We accept cash, checks, HSA/FSA card, and credit/debit card (2.6% + 15 ¢ surcharge for credit or debit card payments). Services are paid for in full at the time of service via our accepted payment methods.</p>

                <p>Our initial 45-minute consultation is $450 and follow-up appointments can range around $300.</p>
                <p>Other professional services such as filling out certified medical forms, letter writing, completing prior authorizations, telephone calls, extensive email conversations, preparation of treatment summaries, or time spent performing any other functions are charged $150 for each 15-minute increment.</p>
                <p>If requested, Tri-Valley Clinic will gladly provide patients a “superbill” which they can submit to their insurance company in order to seek partial reimbursement for psychiatric or psychotherapeutic services received. Please contact our office to make a request. </p>
                <p>We kindly request 24 business hour notice for any cancellations of rescheduling requests. Any cancellations outside of this window will be charged fee of $100.</p>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}
