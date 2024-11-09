import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Subjects from '../pages/Subjects';
import GradeCalculator from '../pages/GradeCalculator';
import CGPACalculator from '../pages/CGPACalculator';
import ScoreCalculator from '../pages/ScoreCalculator';
import Notes from '../pages/Notes';
import Assignments from '../pages/Assignments';
import Login from '../pages/Login';
import AdminDashboard from '../pages/AdminDashboard';
import AdminRoute from '../components/AdminRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Subjects />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/grade-calculator" element={<GradeCalculator />} />
      <Route path="/cgpa-calculator" element={<CGPACalculator />} />
      <Route path="/score-calculator" element={<ScoreCalculator />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/assignments" element={<Assignments />} />
      <Route path="/login" element={<Login />} />
      
      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <Routes>
              <Route path="notes" element={<Notes />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </AdminRoute>
        }
      />
    </Routes>
  );
}