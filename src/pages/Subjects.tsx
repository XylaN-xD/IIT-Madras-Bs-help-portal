import React from 'react';
import { subjects } from '../data/subjects';
import { Book } from 'lucide-react';

export default function Subjects() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Course Subjects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                <Book className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{subject.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Semester {subject.semester}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}