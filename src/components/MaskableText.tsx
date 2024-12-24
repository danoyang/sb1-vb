import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface MaskableTextProps {
  text: string;
  translation?: string;
  className?: string;
  wordId?: string; // Used to track word changes
}

export function MaskableText({ text, translation, className = "", wordId }: MaskableTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Reset visibility when word changes
  useEffect(() => {
    setIsVisible(false);
  }, [wordId]);

  return (
    <button
      onClick={() => setIsVisible(!isVisible)}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
        isVisible ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
      } ${className}`}
    >
      {isVisible ? (
        <>
          <span>{text}</span>
          {translation && (
            <span className="text-gray-500 text-sm">({translation})</span>
          )}
          <EyeOff size={16} className="text-gray-500" />
        </>
      ) : (
        <>
          <span className="opacity-0 select-none">{text}</span>
          {translation && (
            <span className="opacity-0 select-none">({translation})</span>
          )}
          <Eye size={16} className="text-gray-500" />
        </>
      )}
    </button>
  );
}