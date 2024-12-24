import { Unit } from './types';
import { unit1 } from './units/unit1';
import { unit2 } from './units/unit2';
import { unit3 } from './units/unit3';
import { unit4 } from './units/unit4';
import { unit5 } from './units/unit5';
import { unit6 } from './units/unit6';
import { unit7 } from './units/unit7';
import { unit8 } from './units/unit8';
import { unit9 } from './units/unit9';
import { unit10 } from './units/unit10';

export const vocabularyData: Unit[] = [
  unit1,
  unit2,
  unit3,
  unit4,
  unit5,
  unit6,
  unit7,
  unit8,
  unit9,
  unit10
];

export const getUnit = (id: number) => vocabularyData.find(unit => unit.id === id);
export const getUnitCount = () => vocabularyData.length;