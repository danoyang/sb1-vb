import React, { useState } from 'react';
import { AudioButton } from './AudioButton';
import { MaskableText } from './MaskableText';
import { CheckCircle, XCircle } from 'lucide-react';
import { shuffleArray } from '../utils/arrayUtils';
import { ConfirmationCard } from './ConfirmationCard';
import { playCorrectSound } from '../utils/sounds';

interface QuizCardProps {
  word: string;
  phrase: {
    text: string;
    translation: string;
  };
  options: string[];
  correctAnswer: string;
  onAnswer: (correct: boolean) => void;
  onContinue: () => void;
}

export function QuizCard({
  word,
  phrase,
  options,
  correctAnswer,
  onAnswer,
  onContinue,
}: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentOptions] = useState(() => shuffleArray(options));

  const handleOptionClick = async (option: string) => {
    setSelectedAnswer(option);
    setShowResult(true);
    const isCorrect = option === correctAnswer;
    onAnswer(isCorrect);
    
    if (isCorrect) {
      await playCorrectSound();
      setTimeout(() => {
        setShowConfirmation(true);
      }, 1000);
    } else {
      setTimeout(() => {
        setShowResult(false);
        setSelectedAnswer(null);
      }, 500);
    }
  };

  const handleContinue = () => {
    setShowConfirmation(false);
    onContinue();
  };

  if (showConfirmation) {
    return (
      <ConfirmationCard
        word={word}
        phrase={phrase}
        meaning={correctAnswer}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <AudioButton text={word} />
          <MaskableText 
            text={word} 
            translation={correctAnswer}
            className="text-lg font-medium" 
            wordId={word}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <AudioButton text={phrase.text} />
          <MaskableText 
            text={phrase.text} 
            translation={phrase.translation}
            className="text-gray-600 italic" 
            wordId={word}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 w-full mt-6">
          {currentOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={showResult}
              className={`p-4 rounded-lg text-center transition-all ${
                showResult
                  ? option === selectedAnswer
                    ? option === correctAnswer
                      ? 'bg-green-100 border-green-500'
                      : 'bg-red-100 border-red-500'
                    : 'bg-gray-100'
                  : 'bg-gray-100 hover:bg-gray-200'
              } border-2 ${
                showResult && option === selectedAnswer
                  ? option === correctAnswer
                    ? 'border-green-500'
                    : 'border-red-500'
                  : 'border-transparent'
              }`}
            >
              {option}
              {showResult && option === selectedAnswer && (
                <span className="inline-block ml-2">
                  {option === correctAnswer ? (
                    <CheckCircle className="inline text-green-500" size={20} />
                  ) : (
                    <XCircle className="inline text-red-500" size={20} />
                  )}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}