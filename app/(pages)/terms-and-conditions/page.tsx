'use client';

export default function Terms() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12 mt-10">
      <div className="mx-auto max-w-5xl px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 md:p-10">
          {/* Header */}
          <div className="mb-10 border-b border-gray-200 dark:border-gray-700 pb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Terms of Service</h1>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none dark:prose-invert">
            <h2>1. Introduction</h2>
            <p>
              Welcome to <strong>Dolcera Information Technology Services Pvt Ltd.</strong>
              (“Company”, “we”, “our”, “us”).
            </p>
            <p>
              These Terms govern your use of{' '}
              <a href="http://dolcera.com/" target="_blank" rel="noopener noreferrer">
                http://dolcera.com
              </a>
              .
            </p>
            <p>By accessing or using our Service, you agree to these Terms and our Privacy Policy.</p>

            <h2>2. Communications</h2>
            <p>
              By using our Service, you agree to receive communications from us. You may opt out at any time by emailing <a href="mailto:info@dolcera.com">info@dolcera.com</a>.
            </p>

            <h2>3. Purchases</h2>
            <p>When making a purchase, you represent that the payment information provided is accurate and authorized.</p>

            <h2>4. Promotions</h2>
            <p>Promotions may be governed by additional rules. In case of conflict, promotion rules prevail.</p>

            <h2>5. Subscriptions</h2>
            <p>Subscriptions are billed in advance and renew automatically unless cancelled.</p>

            <h2>6. Free Trial</h2>
            <p>Free trials may convert to paid subscriptions unless cancelled before expiration.</p>

            <h2>7. Fee Changes</h2>
            <p>Subscription fees may change with prior notice. Continued use implies acceptance.</p>

            <h2>8. Refunds</h2>
            <p>We do not offer refunds.</p>

            <h2>9. Content</h2>
            <p>You are responsible for any content you post and grant us a license to use it.</p>

            <h2>10. Prohibited Uses</h2>
            <ul>
              <li>Violation of laws or regulations</li>
              <li>Fraudulent, abusive, or harmful activity</li>
              <li>Unauthorized access or interference</li>
              <li>Malware, spam, or malicious code</li>
            </ul>

            <h2>11. Analytics</h2>
            <p>We may use third-party analytics services to monitor Service usage.</p>

            <h2>12. No Use by Minors</h2>
            <p>The Service is intended only for users aged 18 or older.</p>

            <h2>13. Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account and its information.</p>

            <h2>14. Intellectual Property</h2>
            <p>All content and functionality are the exclusive property of Dolcera Information Technology Services Pvt Ltd.</p>

            <h2>15. Copyright & DMCA</h2>
            <p>
              Copyright infringement claims should be sent to <a href="mailto:info@dolcera.com">info@dolcera.com</a>.
            </p>

            <h2>16. Feedback</h2>
            <p>Feedback you provide may be used freely without compensation.</p>

            <h2>17. External Links</h2>
            <p>We are not responsible for third-party websites or their policies.</p>

            <h2>18. Disclaimer</h2>
            <p className="uppercase text-sm">The Service is provided “as is” without warranties of any kind.</p>

            <h2>19. Limitation of Liability</h2>
            <p className="text-sm">Liability is limited to the maximum extent permitted by law.</p>

            <h2>20. Termination</h2>
            <p>We may suspend or terminate access for violations of these Terms.</p>

            <h2>21. Governing Law</h2>
            <p>These Terms are governed by the laws of the United States.</p>

            <h2>22. Changes & Amendments</h2>
            <p>Continued use of the Service constitutes acceptance of revised Terms.</p>

            <h2>23. Waiver & Severability</h2>
            <p>Invalid provisions will not affect remaining Terms.</p>

            <h2>24. Acknowledgement</h2>
            <p>By using the Service, you acknowledge that you agree to these Terms.</p>

            <h2>25. Contact Us</h2>
            <p>
              Email us at <a href="mailto:info@dolcera.com">info@dolcera.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
