import React, { useState } from 'react';
import { vocabularyData } from './data/vocabulary';
import { QuizCard } from './components/QuizCard';
import { ProgressBar } from './components/ProgressBar';
import { UnitListPage } from './pages/UnitListPage';
import { ListModePage } from './pages/ListModePage';
import { ArrowLeft } from 'lucide-react';

type Mode = 'list' | 'study' | 'view';

function App() {
  const [mode, setMode] = useState<Mode>('list');
  const [currentUnit, setCurrentUnit] = useState(1);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);

  const unit = vocabularyData.find((u) => u.id === currentUnit);
  const word = unit?.words[currentWordIndex];

  const handleStudyModeSelect = (unitId: number) => {
    setCurrentUnit(unitId);
    setCurrentWordIndex(0);
    setScore(0);
    setMode('study');
  };

  const handleListModeSelect = (unitId: number) => {
    setCurrentUnit(unitId);
    setMode('view');
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) setScore(score + 1);
  };

  const handleContinue = () => {
    if (currentWordIndex < (unit?.words.length || 0) - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setMode('list');
      setCurrentWordIndex(0);
    }
  };

  if (mode === 'list') {
    return (
      <UnitListPage
        units={vocabularyData}
        onStudyModeSelect={handleStudyModeSelect}
        onListModeSelect={handleListModeSelect}
      />
    );
  }

  if (mode === 'view' && unit) {
    return (
      <ListModePage 
        unit={unit}
        onBack={() => setMode('list')}
      />
    );
  }

  if (!unit || !word) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setMode('list')}
            className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-200 rounded-lg transition-colors"
            aria-label="Back to units"
          >
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold">Unit {unit.id}: {unit.title}</h2>
        </div>

        <div className="mb-6">
          <ProgressBar
            current={currentWordIndex + 1}
            total={unit.words.length}
          />
        </div>

        <QuizCard
          word={word.spanish}
          phrase={word.phrase}
          options={[word.meaning, ...word.distractors]}
          correctAnswer={word.meaning}
          onAnswer={handleAnswer}
          onContinue={handleContinue}
        />

        <div className="mt-6 text-center">
          <p className="text-lg font-semibold">
            Score: {score} / {unit.words.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;