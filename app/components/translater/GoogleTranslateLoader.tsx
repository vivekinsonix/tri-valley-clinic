'use client';

import { useEffect } from 'react';

export default function GoogleTranslateLoader() {
  useEffect(() => {
    if (document.getElementById('google-translate-script')) return;

    // Initialize Google Translate
    // @ts-ignore
    window.googleTranslateElementInit = () => {
      // @ts-ignore
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Hide the top Google Translate banner via CSS
    const style = document.createElement('style');
    style.innerHTML = `
      .goog-te-banner-frame.skiptranslate, 
      body > .skiptranslate { 
        display: none !important; 
      }
      body { top: 0px !important; }
    `;
    document.head.appendChild(style);
  }, []);

  return <div id="google_translate_element" style={{ display: 'none' }} />;
}
