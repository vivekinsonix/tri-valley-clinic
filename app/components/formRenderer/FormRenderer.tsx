/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FormRendererProps } from '@/app/utils/Interfaces';
import { TextInput, Textarea, Checkbox, Label, Select, FileInput, Radio, HelperText } from 'flowbite-react';
import { useCallback, useMemo } from 'react';

export default function FormRenderer({ fields, formData, setFormData, errors = {} }: FormRendererProps) {
  const handleChange = useCallback(
    (key: string, value: any) => {
      if (key === 'phone_number') {
        const digitsOnly = value.replace(/\D/g, ''); // remove non-digits
        if (digitsOnly.length > 10) return; // prevent typing more than 10
        value = digitsOnly;
      }
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    [setFormData]
  );

  const renderedFields = useMemo(
    () =>
      fields.map((field) => {
        const { text, label, type, required, options } = field;
        const value = formData[text] ?? '';
        const error = errors[text]; // Show only submit errors

        switch (type) {
          case 'text':
          case 'email':
          case 'number':
          case 'url':
          case 'password':
            return (
              <div key={text}>
                <Label htmlFor={text}>{label}</Label>

                <TextInput id={text} type={type} required={required} value={value} color={error ? 'failure' : undefined} onChange={(e) => handleChange(text, e.target.value)} />

                {error && <HelperText color="failure">{error}</HelperText>}
              </div>
            );

          case 'textarea':
            return (
              <div key={text}>
                <Label htmlFor={text}>{label}</Label>
                <Textarea id={text} required={required} value={value} onChange={(e) => handleChange(text, e.target.value)} />
                {error && <HelperText color="failure">{error}</HelperText>}
              </div>
            );

          case 'checkbox':
            return (
              <div key={text} className="flex items-center gap-2">
                <Checkbox id={text} checked={!!value} onChange={(e) => handleChange(text, e.target.checked)} />
                <Label htmlFor={text}>{label}</Label>
                {error && <HelperText color="failure">{error}</HelperText>}
              </div>
            );

          case 'select':
            return (
              <div key={text}>
                <Label htmlFor={text}>{label}</Label>
                <Select id={text} value={value} onChange={(e) => handleChange(text, e.target.value)} required={required}>
                  <option value="">Select an option</option>
                  {options?.map((op) => (
                    <option key={op} value={op}>
                      {op}
                    </option>
                  ))}
                </Select>
                {error && <HelperText color="failure">{error}</HelperText>}
              </div>
            );

          case 'radio':
            return (
              <div key={text}>
                <Label>{label}</Label>
                <div className="flex flex-col gap-2 mt-2">
                  {options?.map((op) => (
                    <label key={op} className="flex items-center gap-2">
                      <Radio name={text} value={op} checked={value === op} onChange={(e) => handleChange(text, e.target.value)} />
                      {op}
                    </label>
                  ))}
                </div>
                {error && <HelperText color="failure">{error}</HelperText>}
              </div>
            );

          case 'file':
            return (
              <div key={text}>
                <Label htmlFor={text}>{label}</Label>
                <FileInput id={text} onChange={(e) => handleChange(text, e.target.files?.[0] ?? null)} />
                {error && <HelperText color="failure">{error}</HelperText>}
              </div>
            );

          case 'date':
            return (
              <div key={text}>
                <Label htmlFor={text}>{label}</Label>
                <TextInput id={text} type="date" value={value} required={required} onChange={(e) => handleChange(text, e.target.value)} />
                {error && <HelperText color="failure">{error}</HelperText>}
              </div>
            );

          default:
            return null;
        }
      }),
    [fields, formData, handleChange, errors]
  );

  return <>{renderedFields}</>;
}
