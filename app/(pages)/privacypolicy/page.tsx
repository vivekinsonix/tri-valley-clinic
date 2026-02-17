'use client';

import SeoHead from '@/app/components/seo/seoHead';
import { ALTERNATE_UI_URL } from '@/app/constants/appconstants';

export default function Policy() {
  const seoTitle = 'Privacy Policy – Dolcera';
  const seoDescription = 'Learn how Dolcera Information Technology Services Pvt Ltd collects, uses, stores, and protects your personal data.';
  const seoKeywords = 'Dolcera Privacy Policy, Data Protection, GDPR, CCPA, Cookies Policy';
  const seoUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ALTERNATE_UI_URL}/privacy-policy`;
  const seoImage = '/default-og.jpg';

  return (
    <>
      <SeoHead title={seoTitle} description={seoDescription} keywords={seoKeywords} url={seoUrl} image={seoImage} />

      <section className="bg-gray-50 dark:bg-gray-900 py-12 mt-10">
        <div className="mx-auto max-w-5xl px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-10">
            {/* Header */}
            <div className="mb-10 border-b border-gray-200 dark:border-gray-700 pb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
              <p className="mt-3 text-gray-600 dark:text-gray-400 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
            </div>

            {/* Content */}
            <div className="prose prose-gray max-w-none dark:prose-invert">
              <h2>1. Introduction</h2>
              <p>
                Welcome to <strong>Dolcera Information Technology Services Pvt Ltd.</strong>
              </p>
              <p>
                Dolcera Information Technology Services Pvt Ltd. (“us”, “we”, or “our”) operates{' '}
                <a href="http://dolcera.com/" target="_blank" rel="noopener noreferrer">
                  http://dolcera.com
                </a>{' '}
                (the “Service”).
              </p>
              <p>This Privacy Policy explains how we collect, use, safeguard, and disclose information resulting from your use of our Service.</p>

              <h2>2. Definitions</h2>
              <ul>
                <li>
                  <strong>Service:</strong> The Dolcera website
                </li>
                <li>
                  <strong>Personal Data:</strong> Information identifying an individual
                </li>
                <li>
                  <strong>Usage Data:</strong> Data collected automatically
                </li>
                <li>
                  <strong>Cookies:</strong> Small data files stored on your device
                </li>
                <li>
                  <strong>Data Controller:</strong> Dolcera Information Technology Services Pvt Ltd
                </li>
              </ul>

              <h2>3. Information Collection and Use</h2>
              <p>We collect different types of information for various purposes to provide and improve our Service.</p>

              <h2>4. Types of Data Collected</h2>
              <h3>Personal Data</h3>
              <ul>
                <li>Email address</li>
                <li>First and last name</li>
                <li>Phone number</li>
                <li>Address and location details</li>
                <li>Cookies and usage data</li>
              </ul>

              <h3>Usage Data</h3>
              <p>Usage Data may include IP address, browser type, visited pages, and diagnostic data.</p>

              <h3>Cookies</h3>
              <ul>
                <li>
                  <strong>Session Cookies:</strong> Operate our Service
                </li>
                <li>
                  <strong>Preference Cookies:</strong> Save user preferences
                </li>
                <li>
                  <strong>Security Cookies:</strong> Security purposes
                </li>
                <li>
                  <strong>Advertising Cookies:</strong> Relevant ads
                </li>
              </ul>

              <h2>5. Use of Data</h2>
              <ul>
                <li>Provide and maintain the Service</li>
                <li>Customer support</li>
                <li>Analytics and improvements</li>
                <li>Legal and compliance obligations</li>
                <li>Marketing communications (opt-out available)</li>
              </ul>

              <h2>6. Retention of Data</h2>
              <p>We retain Personal Data only as long as necessary for legal, business, and operational purposes.</p>

              <h2>7. Transfer of Data</h2>
              <p>Your information may be transferred to servers outside your jurisdiction, including the United States.</p>

              <h2>8. Security</h2>
              <p>We use reasonable security measures, but no online transmission is 100% secure.</p>

              <h2>9. GDPR & CCPA Rights</h2>
              <p>Depending on your location, you may have rights to access, correct, delete, or restrict your personal data.</p>
              <p>
                Contact us at <a href="mailto:info@dolcera.com">info@dolcera.com</a>
              </p>

              <h2>10. Children’s Privacy</h2>
              <p>Our Service does not address anyone under the age of 18.</p>

              <h2>11. Changes to This Policy</h2>
              <p>We may update this Privacy Policy periodically. Updates are effective when posted.</p>

              <h2>12. Contact Us</h2>
              <p>
                Email us at <a href="mailto:info@dolcera.com">info@dolcera.com</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
