import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Unit } from '../data/types';
import { UnitCard } from '../components/UnitCard';

interface UnitListPageProps {
  units: Unit[];
  onStudyModeSelect: (unitId: number) => void;
  onListModeSelect: (unitId: number) => void;
}

export function UnitListPage({ units, onStudyModeSelect, onListModeSelect }: UnitListPageProps) {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-8">
          <GraduationCap size={28} className="text-indigo-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Spanish Vocabulary Trainer</h1>
        </div>
        
        <div className="space-y-4">
          {units.map((unit) => (
            <UnitCard 
              key={unit.id}
              unit={unit}
              onStudyModeSelect={onStudyModeSelect}
              onListModeSelect={onListModeSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}