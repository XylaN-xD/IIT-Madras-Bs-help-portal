import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, LogIn, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  children?: React.ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="font-bold text-xl">Xylearn</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {children}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/admin"
                  className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Settings className="h-5 w-5" />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}