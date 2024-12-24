import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Unit } from '../data/types';
import { WordList } from '../components/WordList';

interface ListModePageProps {
  unit: Unit;
  onBack: () => void;
}

export function ListModePage({ unit, onBack }: ListModePageProps) {
  const handleBack = () => {
    // Stop any playing audio before navigating back
    const audioElements = document.getElementsByTagName('audio');
    Array.from(audioElements).forEach(audio => {
      audio.pause();
      audio.remove();
    });
    onBack();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const audioElements = document.getElementsByTagName('audio');
      Array.from(audioElements).forEach(audio => {
        audio.pause();
        audio.remove();
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-200 rounded-lg transition-colors"
            aria-label="Back to units"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-2xl font-bold">Unit {unit.id}: {unit.title}</h2>
        </div>

        <WordList words={unit.words} />
      </div>
    </div>
  );
}