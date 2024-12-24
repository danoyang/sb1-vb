import React from 'react';
import { ChevronRight } from 'lucide-react';
import { AudioButton } from './AudioButton';

interface ConfirmationCardProps {
  word: string;
  phrase: {
    text: string;
    translation: string;
  };
  meaning: string;
  onContinue: () => void;
}

export function ConfirmationCard({
  word,
  phrase,
  meaning,
  onContinue,
}: ConfirmationCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full">
      <div className="flex flex-col items-center gap-6">
        {/* Word Section */}
        <div className="flex items-center gap-3">
          <AudioButton text={word} />
          <span className="text-lg font-medium">{word}</span>
          <span className="text-gray-500">({meaning})</span>
        </div>
        
        {/* Phrase Section */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <AudioButton text={phrase.text} />
            <span className="text-gray-600 italic">{phrase.text}</span>
          </div>
          <span className="text-gray-500">({phrase.translation})</span>
        </div>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="mt-4 flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          继续 <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}