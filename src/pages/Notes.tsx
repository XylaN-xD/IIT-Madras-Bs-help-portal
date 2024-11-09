import React, { useState } from 'react';
import { subjects } from '../data/subjects';
import { FileText, Plus, Trash2, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

interface Note {
  id: number;
  content: string;
  timestamp: Date;
  subject: number;
}

export default function Notes() {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { isAdmin } = useAuth();

  const addNote = () => {
    if (!newNote.trim() || !isAdmin()) return;

    setNotes(prev => [
      ...prev,
      {
        id: Date.now(),
        content: newNote,
        timestamp: new Date(),
        subject: selectedSubject.id,
      },
    ]);
    setNewNote('');
  };

  const deleteNote = (noteId: number) => {
    if (!isAdmin()) return;
    setNotes(prev => prev.filter(note => note.id !== noteId));
  };

  const filteredNotes = notes
    .filter(note => note.subject === selectedSubject.id)
    .filter(note => 
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Subject Notes</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={selectedSubject.id}
            onChange={(e) => setSelectedSubject(subjects.find(s => s.id === Number(e.target.value)) || subjects[0])}
            className="md:w-64 rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
          >
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2"
            />
          </div>
        </div>
      </div>

      {isAdmin() && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-2">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a new note..."
              className="flex-1 rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 resize-none"
              rows={3}
            />
            <button
              onClick={addNote}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors self-start"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500 dark:text-gray-400">No notes found</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md relative group hover:shadow-lg transition-shadow"
            >
              <p className="mb-3 whitespace-pre-wrap">{note.content}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(note.timestamp), 'PPp')}
              </p>
              {isAdmin() && (
                <button
                  onClick={() => deleteNote(note.id)}
                  className="absolute top-2 right-2 p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}