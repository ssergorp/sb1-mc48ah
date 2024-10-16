import React, { useState, useEffect } from 'react';

const Notes: React.FC = () => {
  const [notes, setNotes] = useState(['', '', '']);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const updateNote = (index: number, value: string) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
  };

  return (
    <div className="notes">
      <h2>Notes</h2>
      <textarea
        value={notes[0]}
        onChange={(e) => updateNote(0, e.target.value)}
        placeholder="General Notes"
      />
      <textarea
        value={notes[1]}
        onChange={(e) => updateNote(1, e.target.value)}
        placeholder="To-Do List"
      />
      <textarea
        value={notes[2]}
        onChange={(e) => updateNote(2, e.target.value)}
        placeholder="Ideas"
      />
    </div>
  );
};

export default Notes;