import React from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Word } from '../data/types';
import { AudioButton } from './AudioButton';
import { useAudioSequence } from '../hooks/useAudioSequence';

interface WordListProps {
  words: Word[];
}

export function WordList({ words }: WordListProps) {
  const { currentIndex, isPlaying, startPlayback, stopPlayback } = useAudioSequence(words);

  return (
    <div>
      <div className="flex justify-center mb-6">
        <button
          onClick={isPlaying ? stopPlayback : startPlayback}
          className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 text-white ${
            isPlaying ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          {isPlaying ? 'Stop' : 'Play All'}
        </button>
      </div>

      <div className="space-y-4">
        {words.map((word, index) => (
          <div 
            key={word.spanish}
            className={`bg-white rounded-lg shadow p-4 transition-colors ${
              index === currentIndex ? 'bg-green-50 border-2 border-green-500' : ''
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <AudioButton text={word.spanish} />
              <span className="text-lg font-medium">{word.spanish}</span>
              <span className="text-gray-500">({word.meaning})</span>
            </div>
            <div className="flex items-center gap-3 ml-12">
              <AudioButton text={word.phrase.text} />
              <div>
                <p className="text-gray-600 italic">{word.phrase.text}</p>
                <p className="text-gray-500">{word.phrase.translation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}