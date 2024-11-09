import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, Calculator, GraduationCap, FileText, Book } from 'lucide-react';

const navigation = [
  { name: 'Subjects', path: '/subjects', icon: BookOpen },
  { name: 'Grade Calculator', path: '/grade-calculator', icon: Calculator },
  { name: 'CGPA Calculator', path: '/cgpa-calculator', icon: GraduationCap },
  { name: 'Score Calculator', path: '/score-calculator', icon: Calculator },
  { name: 'Notes', path: '/notes', icon: FileText },
  { name: 'Weekly Assignments', path: '/assignments', icon: Book },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-800 h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`
                }
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}