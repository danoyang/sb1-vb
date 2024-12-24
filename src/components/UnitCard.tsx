import React from 'react';
import { BookOpen, List } from 'lucide-react';
import { Unit } from '../data/types';

interface UnitCardProps {
  unit: Unit;
  onStudyModeSelect: (unitId: number) => void;
  onListModeSelect: (unitId: number) => void;
}

export function UnitCard({ unit, onStudyModeSelect, onListModeSelect }: UnitCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Unit {unit.id}: {unit.title}</h2>
          <p className="text-gray-600 mt-1">{unit.description}</p>
          <p className="text-sm text-gray-500 mt-2">{unit.words.length} words</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onStudyModeSelect(unit.id)}
            className="group relative"
            aria-label="Study Mode"
          >
            <div className="p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <BookOpen size={24} />
            </div>
            <span className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-2 rounded whitespace-nowrap">
              Study Mode
            </span>
          </button>

          <button
            onClick={() => onListModeSelect(unit.id)}
            className="group relative"
            aria-label="List Mode"
          >
            <div className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <List size={24} />
            </div>
            <span className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-sm py-1 px-2 rounded whitespace-nowrap">
              List Mode
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}