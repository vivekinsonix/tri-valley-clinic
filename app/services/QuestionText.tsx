import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface QuestionTextProps {
  phrase: string; // question to display
  speed?: number; // typing speed (ms)
  className?: string; // extra styling
}

export default function QuestionText({ phrase, speed = 30, className = '' }: QuestionTextProps) {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(''); // reset when phrase changes
    let index = 0;

    const interval = setInterval(() => {
      setText(phrase.slice(0, index + 1));
      index++;
      if (index === phrase.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [phrase, speed]);

  return (
    <motion.div className={`font-mono md:text-3xl text-2xl font-bold text-black dark:text-white flex items-center ${className}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {text}
      {/* blinking cursor */}
      <motion.span className="border-r-2 border-black dark:border-white ml-1" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.6, repeat: Infinity }} />
    </motion.div>
  );
}
