import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Book, Settings, Users } from 'lucide-react';

const adminMenuItems = [
  { icon: FileText, name: 'Manage Notes', path: '/admin/notes' },
  { icon: Book, name: 'Manage Assignments', path: '/admin/assignments' },
  { icon: Users, name: 'Manage Users', path: '/admin/users' },
  { icon: Settings, name: 'Settings', path: '/admin/settings' },
];

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.path}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-full">
                  <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}