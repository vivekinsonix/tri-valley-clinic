'use client';

import { useState } from 'react';
import { Button, Card, Textarea } from 'flowbite-react';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import QuestionText from './QuestionText';

export default function StepperPlainText() {
  const steps = ['Introduction', 'Details', 'Review', 'Confirmation'];
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const options = ['B2B Services', 'Retail', 'Manufacturing', 'Logistics', 'Real Estate'];
  const options2 = ['Improve lead conversion', 'Automate sales processes', 'Enhance customer engagement', 'Streamline support', 'Get better insights/reports', 'All of the above', 'Other (please specify)'];

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) => (prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]));
  };
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);
  return (
    <div className="max-w-xl mx-auto  bg-transparent   rounded-lg ">
      {/* Stepper Header */}
      {/* <div className="flex justify-between mb-8">
        {steps.map((label, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${idx === currentStep
                ? "bg-blue-100"
                : idx < currentStep
                  ? "bg-green-500"
                  : "bg-gray-300"
                }`}
            >
              {idx + 1}
            </div>
            <span className="mt-2 text-sm">{label}</span>
            {idx < steps.length - 1 && (
              <div
                className={`absolute top-5 left-1/2 w-full h-0.5 ${idx < currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
              ></div>
            )}
          </div>
        ))}
      </div> 

      {/* Step Content */}
      <div className="min-h-[120px] mb-5 pb-6">
        {currentStep === 0 && (
          <>
            <QuestionText phrase="What kind of business do you run?" />

            <div className="block gap-3  mb-2 mt-5">
              {options.map((option, index) => {
                const id = `opt-${index}`;
                const isSelected = selectedOptions.includes(option);

                return (
                  <div key={id} className="mb-3">
                    {/* Hidden checkbox with peer class */}
                    <input id={id} type="checkbox" className="sr-only peer" checked={isSelected} onChange={() => toggleOption(option)} />

                    <label
                      htmlFor={id}
                      className="flex items-center bg-white text-lg text-left font-semibold w-full gap-2 px-4 py-3 text-black dark:bg-gradient-to-r from-teal-300 to-gray-400 shadow border border-gray-200 rounded-lg cursor-pointer select-none transition-all
                         peer-checked:bg-gradient-to-r from-teal-200 to-blue-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-blue-200  peer-checked:text-black peer-checked:border-green-50 peer-checked:shadow-lg"
                    >
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="..."> {option}</div>
                        <div className="flex justify-end">
                          {' '}
                          {/* Tick icon with fade/scale animation */}
                          {isSelected ? (
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                            </svg>
                          ) : (
                            // empty checkbox outline icon
                            <svg className="w-0 h-0 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <rect x="4" y="4" width="16" height="16" rx="2" ry="2" strokeWidth="2" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
          </>
        )}
        {currentStep === 1 && (
          <>
            <QuestionText phrase="Should we schedule a follow-up meeting?" />
            <div className="block gap-3  mb-2 mt-5">
              <div className="flex gap-6 justify-center items-center py-8">
                <Card onClick={() => setAnswer('yes')} className={`w-40 cursor-pointer hover:shadow-lg transition-all ${answer === 'yes' ? 'border-2 border-green-500 bg-green-50' : 'border border-gray-200'}`}>
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircleIcon className="text-green-600" size={28} />
                    <span className="font-semibold">Yes</span>
                  </div>
                </Card>

                <Card onClick={() => setAnswer('no')} className={`w-40 cursor-pointer hover:shadow-lg transition-all ${answer === 'no' ? 'border-2 border-red-500 bg-red-50' : 'border border-gray-200'}`}>
                  <div className="flex flex-col items-center gap-2">
                    <XCircleIcon className="text-red-600" size={28} />
                    <span className="font-semibold">No</span>
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <QuestionText phrase="Could you briefly describe your project and its vision?" />
            <div className="block gap-3  mb-2 mt-5">
              <Textarea id="comments" placeholder="Type your comments here..." rows={4} />
            </div>
          </>
        )}
        {currentStep === 3 && (
          <>
            <p className="text-gray-700">This is the confirmation step. Review everything before finishing.</p>
          </>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button outline onClick={prevStep} disabled={currentStep === 0} type="button">
          Previous
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button onClick={nextStep} type="button">
            Next Question...
          </Button>
        ) : (
          <Button type="button" className="bg-blue-100 border-0 text-black hover:scale-105 focus:border-0 rounded-full uppercase" onClick={() => alert('Process Completed!')}>
            Finish
          </Button>
        )}
      </div>
    </div>
  );
}
