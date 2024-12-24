import React from 'react';

interface UnitSelectorProps {
  units: { id: number; title: string }[];
  selectedUnit: number;
  onUnitSelect: (unitId: number) => void;
}

export function UnitSelector({
  units,
  selectedUnit,
  onUnitSelect,
}: UnitSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {units.map((unit) => (
        <button
          key={unit.id}
          onClick={() => onUnitSelect(unit.id)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedUnit === unit.id
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Unit {unit.id}
        </button>
      ))}
    </div>
  );
}