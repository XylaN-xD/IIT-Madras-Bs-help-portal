import React, { useState, useEffect } from 'react';
import { subjects } from '../data/subjects';
import { Lock, Unlock, Clock, Upload, Download, Trash2 } from 'lucide-react';
import { format, isBefore } from 'date-fns';
import { Assignment, generateAssignments, updateAssignment } from '../data/assignments';
import { useAuth } from '../contexts/AuthContext';

const COURSE_START_DATE = new Date(2024, 0, 1);

export default function Assignments() {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const { isAdmin } = useAuth();
  const today = new Date();

  useEffect(() => {
    setAssignments(generateAssignments(COURSE_START_DATE));
  }, []);

  const handleDateUpdate = (week: number, newDate: string, newTime: string) => {
    if (!isAdmin()) return;
    
    const [hours, minutes] = newTime.split(':').map(Number);
    const date = new Date(newDate);
    date.setHours(hours, minutes);
    
    const updatedAssignments = updateAssignment(assignments, week, { unlockDate: date });
    setAssignments(updatedAssignments);
  };

  const handleFileUpload = async (week: number, file: File) => {
    if (!isAdmin()) return;

    const pdfUrl = URL.createObjectURL(file);
    const updatedAssignments = updateAssignment(assignments, week, { 
      pdfUrl,
      title: file.name 
    });
    setAssignments(updatedAssignments);
  };

  const removeFile = (week: number) => {
    if (!isAdmin()) return;

    const updatedAssignments = updateAssignment(assignments, week, { 
      pdfUrl: null,
      title: `Week ${week} Assignment`
    });
    setAssignments(updatedAssignments);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Weekly Assignments</h1>
        <div className="flex space-x-4">
          <select
            value={selectedSubject.id}
            onChange={(e) => setSelectedSubject(subjects.find(s => s.id === Number(e.target.value)) || subjects[0])}
            className="rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
          >
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assignments.map((assignment) => {
          const isUnlocked = isBefore(assignment.unlockDate, today);
          
          return (
            <div
              key={assignment.week}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 relative group transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Week {assignment.week}</h3>
                {isUnlocked ? (
                  <Unlock className="h-5 w-5 text-green-500" />
                ) : (
                  <Lock className="h-5 w-5 text-red-500" />
                )}
              </div>

              {isAdmin() && (
                <div className="mb-4 space-y-2">
                  <input
                    type="date"
                    onChange={(e) => handleDateUpdate(
                      assignment.week,
                      e.target.value,
                      format(assignment.unlockDate, 'HH:mm')
                    )}
                    className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
                  />
                  <input
                    type="time"
                    onChange={(e) => handleDateUpdate(
                      assignment.week,
                      format(assignment.unlockDate, 'yyyy-MM-dd'),
                      e.target.value
                    )}
                    className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
                  />
                  
                  {!assignment.pdfUrl ? (
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(assignment.week, e.target.files[0])}
                        className="hidden"
                        id={`pdf-upload-${assignment.week}`}
                      />
                      <label
                        htmlFor={`pdf-upload-${assignment.week}`}
                        className="flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors cursor-pointer"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload PDF
                      </label>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
                      <span className="truncate flex-1 mr-2">{assignment.title}</span>
                      <button
                        onClick={() => removeFile(assignment.week)}
                        className="p-1 text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
              
              {!isUnlocked && (
                <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
                  <div className="text-center text-white p-4">
                    <Clock className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-semibold">Unlocks on</p>
                    <p>{format(assignment.unlockDate, 'PPP')}</p>
                    <p>{format(assignment.unlockDate, 'h:mm a')}</p>
                  </div>
                </div>
              )}

              {isUnlocked && assignment.pdfUrl && (
                <a
                  href={assignment.pdfUrl}
                  download={assignment.title}
                  className="flex items-center justify-center mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Assignment
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}