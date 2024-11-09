import React, { useState } from 'react';
import { subjects } from '../data/subjects';

interface SubjectGrade {
  subjectId: number;
  grade: string;
  credits: number;
}

// IITM BS Grade Points
const gradePoints: Record<string, number> = {
  'S': 10,
  'A': 9,
  'B': 8,
  'C': 7,
  'D': 6,
  'E': 5,
  'F': 0,
};

export default function CGPACalculator() {
  const [subjectGrades, setSubjectGrades] = useState<SubjectGrade[]>([]);

  const addSubject = () => {
    setSubjectGrades(prev => [
      ...prev,
      { subjectId: subjects[0].id, grade: 'S', credits: 4 }
    ]);
  };

  const removeSubject = (index: number) => {
    setSubjectGrades(prev => prev.filter((_, i) => i !== index));
  };

  const updateSubjectGrade = (index: number, field: keyof SubjectGrade, value: any) => {
    setSubjectGrades(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const calculateCGPA = () => {
    if (subjectGrades.length === 0) return 0;

    const totalPoints = subjectGrades.reduce((sum, subject) => 
      sum + (gradePoints[subject.grade] * subject.credits), 0);
    
    const totalCredits = subjectGrades.reduce((sum, subject) => 
      sum + subject.credits, 0);

    return totalPoints / totalCredits;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">CGPA Calculator</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
            <h3 className="font-medium mb-2">IITM BS Grade Points</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              {Object.entries(gradePoints).map(([grade, points]) => (
                <div key={grade} className="flex justify-between px-2">
                  <span>{grade}:</span>
                  <span>{points}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={addSubject}
          className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Add Subject
        </button>

        {subjectGrades.map((subject, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <select
              value={subject.subjectId}
              onChange={(e) => updateSubjectGrade(index, 'subjectId', Number(e.target.value))}
              className="flex-1 rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <select
              value={subject.grade}
              onChange={(e) => updateSubjectGrade(index, 'grade', e.target.value)}
              className="w-24 rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
            >
              {Object.keys(gradePoints).map((grade) => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>

            <input
              type="number"
              value={subject.credits}
              onChange={(e) => updateSubjectGrade(index, 'credits', Number(e.target.value))}
              min="1"
              max="6"
              className="w-24 rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
            />

            <button
              onClick={() => removeSubject(index)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your CGPA</p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {calculateCGPA().toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}