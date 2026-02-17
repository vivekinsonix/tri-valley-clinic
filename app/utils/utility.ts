/* eslint-disable @typescript-eslint/no-explicit-any */

import { DynamicField } from './Interfaces';

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const truncateContent = (content: string, wordLimit = 20) => {
  const words = content.split(/\s+/); // split into words
  if (words.length <= wordLimit) return content;
  return words.slice(0, wordLimit).join(' ') + '...';
};

/**************************************************************
 * Validation helpers
 **************************************************************/
// Email validator
const validateEmail = (email: string) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email) && email.length >= 5 && email.length <= 35;
};
// Phone validator (7–10 digits)
const validatePhone = (phone: string) => /^[0-9]{7,10}$/.test(phone);

// Form validation before submit
// MULTIPLE ERROR VALIDATION
export const validateForm = (fields: DynamicField[], formData: Record<string, any>) => {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const value = formData[field.text];

    // Required validation
    if (field.required && (!value || value === '')) {
      errors[field.text] = `${field.label} is required.`;
      continue;
    }

    // Email validation
    if (field.type === 'email' && value && !validateEmail(value)) {
      errors[field.text] = 'Invalid email (5–35 chars).';
      continue;
    }

    // Phone validation
    if ((field.type === 'tel' || field.text === 'phone_number') && value && !validatePhone(value)) {
      errors[field.text] = 'Phone must be 7–10 digits.';
      continue;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
