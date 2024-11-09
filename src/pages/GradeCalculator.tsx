import React, { useState } from 'react';
import { subjects } from '../data/subjects';

interface GradeInput {
  assignments: number;
  quizzes: number;
  midterm: number;
  endterm: number;
}

const initialGrades: GradeInput = {
  assignments: 0,
  quizzes: 0,
  midterm: 0,
  endterm: 0,
};

// Updated IITM BS Degree grading system based on acegrade.in
const getGrade = (score: number): string => {
  if (score >= 90) return 'S (10)';
  if (score >= 80) return 'A (9)';
  if (score >= 70) return 'B (8)';
  if (score >= 60) return 'C (7)';
  if (score >= 50) return 'D (6)';
  if (score >= 40) return 'E (4)';
  return 'U (0)';
};

// Component weights based on acegrade.in
const weights = {
  assignments: 0.30, // 30%
  quizzes: 0.30,    // 30%
  midterm: 0.20,    // 20%
  endterm: 0.20     // 20%
};

export default function GradeCalculator() {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [grades, setGrades] = useState<GradeInput>(initialGrades);

  const calculateGrade = () => {
    const total = 
      (grades.assignments * weights.assignments) +
      (grades.quizzes * weights.quizzes) +
      (grades.midterm * weights.midterm) +
      (grades.endterm * weights.endterm);

    return getGrade(total);
  };

  const handleInputChange = (field: keyof GradeInput, value: string) => {
    const numValue = Math.min(100, Math.max(0, Number(value) || 0));
    setGrades(prev => ({ ...prev, [field]: numValue }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Grade Calculator</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Subject</label>
          <select
            value={selectedSubject.id}
            onChange={(e) => setSelectedSubject(subjects.find(s => s.id === Number(e.target.value)) || subjects[0])}
            className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
          >
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">IITM BS Grading System</h3>
            <ul className="text-sm space-y-1">
              <li>S: ≥90% (10 points)</li>
              <li>A: ≥80% (9 points)</li>
              <li>B: ≥70% (8 points)</li>
              <li>C: ≥60% (7 points)</li>
              <li>D: ≥50% (6 points)</li>
              <li>E: ≥40% (4 points)</li>
              <li>U: &lt;40% (0 points)</li>
            </ul>
          </div>
        </div>

        {Object.entries(grades).map(([field, value]) => (
          <div key={field} className="mb-4">
            <label className="block text-sm font-medium mb-2 capitalize">
              {field} Score (0-100)
              <span className="text-gray-500 dark:text-gray-400 ml-2">
                ({(weights[field as keyof GradeInput] * 100)}%)
              </span>
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => handleInputChange(field as keyof GradeInput, e.target.value)}
              min="0"
              max="100"
              className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
            />
          </div>
        ))}

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Final Grade</p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {calculateGrade()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}