import React, { useState } from 'react';
import { subjects } from '../data/subjects';

interface ScoreBreakdown {
  currentScore: number;
  maxPossible: number;
  weight: number;
}

interface ScoreComponent {
  name: string;
  breakdown: ScoreBreakdown;
}

const initialComponents: ScoreComponent[] = [
  { name: 'Assignments', breakdown: { currentScore: 0, maxPossible: 100, weight: 20 } },
  { name: 'Quizzes', breakdown: { currentScore: 0, maxPossible: 100, weight: 20 } },
  { name: 'Midterm', breakdown: { currentScore: 0, maxPossible: 100, weight: 30 } },
  { name: 'Final', breakdown: { currentScore: 0, maxPossible: 100, weight: 30 } },
];

export default function ScoreCalculator() {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [components, setComponents] = useState<ScoreComponent[]>(initialComponents);

  const calculateCurrentScore = () => {
    return components.reduce((total, component) => {
      const { currentScore, maxPossible, weight } = component.breakdown;
      return total + (currentScore / maxPossible) * weight;
    }, 0);
  };

  const calculateMaxPossibleScore = () => {
    const completedWeight = components.reduce((total, component) => {
      const { currentScore, weight } = component.breakdown;
      return total + (currentScore > 0 ? weight : 0);
    }, 0);

    const remainingWeight = 100 - completedWeight;

    return calculateCurrentScore() + remainingWeight;
  };

  const updateComponent = (index: number, field: keyof ScoreBreakdown, value: number) => {
    setComponents(prev => prev.map((component, i) => 
      i === index 
        ? { ...component, breakdown: { ...component.breakdown, [field]: value } }
        : component
    ));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Score Calculator</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Subject</label>
          <select
            value={selectedSubject.id}
            onChange={(e) => setSelectedSubject(subjects.find(s => s.id === Number(e.target.value)) || subjects[0])}
            className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
          >
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        {components.map((component, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-medium mb-3">{component.name}</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Score</label>
                <input
                  type="number"
                  value={component.breakdown.currentScore}
                  onChange={(e) => updateComponent(index, 'currentScore', Number(e.target.value))}
                  min="0"
                  max={component.breakdown.maxPossible}
                  className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Maximum Score</label>
                <input
                  type="number"
                  value={component.breakdown.maxPossible}
                  onChange={(e) => updateComponent(index, 'maxPossible', Number(e.target.value))}
                  min={component.breakdown.currentScore}
                  className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Weight (%)</label>
                <input
                  type="number"
                  value={component.breakdown.weight}
                  onChange={(e) => updateComponent(index, 'weight', Number(e.target.value))}
                  min="0"
                  max="100"
                  className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="mt-6 grid grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current Score</p>
              <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {calculateCurrentScore().toFixed(2)}%
              </p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Maximum Possible</p>
              <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                {calculateMaxPossibleScore().toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}