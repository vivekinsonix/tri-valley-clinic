'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'What services does your clinic provide?',
    answer: 'We offer a wide range of healthcare services including Psychiatry, IV hydration therapy, mental health support, Medical Weight Management, Attention Deficit/Hyperactivity Disorder,Trauma and Stress, Psychosis and Anxiety,  and Bipolar Disorder.',
  },
  {
    question: 'How can I book an appointment?',
    answer: "You can book an appointment through our website's appointment section or contact our clinic directly during working hours.",
  },
  {
    question: 'Do you accept insurance?',
    answer: 'Yes, we accept major insurance providers. Please contact our front desk for a full list of accepted insurance plans.',
  },
  {
    question: 'What are the clinic hours?',
    answer: 'Our clinic is open Monday to Friday from 9:30 AM – 5:30 PM and Saturday/Sunday closed.',
  },
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-24 dark:bg-foreground">
      <main className="px-6 mx-auto container">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center">
            <p className="text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">TRY-VALLEY CLINIC </p>

            <div className="flex items-center justify-center gap-4 my-0 relative">
              <div className="h-[1px] w-24 bg-secondary relative">
                <img className="w-10 absolute -right-2.5 -top-2.5" src="/service/d-v.png" />
              </div>
              <h1>Frequently Asked Questions</h1>
              <div className="h-[1px] w-24 bg-secondary"></div>
            </div>
          </header>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 bg-white rounded-xl shadow-sm">
                {/* Question */}
                <button onClick={() => toggleFAQ(index)} className="w-full px-6 py-4 flex justify-between items-center text-left">
                  <span className="text-lg text-primary">{faq.question}</span>

                  {openIndex === index ? <Minus className="text-primary" size={22} /> : <Plus className="text-primary" size={22} />}
                </button>

                {/* Answer */}
                {openIndex === index && <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </main>
    </section>
  );
}
