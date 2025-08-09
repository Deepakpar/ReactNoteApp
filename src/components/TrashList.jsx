import React, { useEffect, useState } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

export default function TrashList() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedNotes = loadFromStorage("notes");
    setNotes(savedNotes.filter((note) => note.trashed));
  }, []);

  const handleRestore = (id) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, trashed: false } : note
    );
    saveToStorage("notes", [...loadFromStorage("notes").filter(n => !n.trashed), ...updatedNotes]);
    setNotes(updatedNotes.filter(n => n.trashed));
  };

  const handlePermanentDelete = (id) => {
    const remainingNotes = loadFromStorage("notes").filter((note) => note.id !== id);
    saveToStorage("notes", remainingNotes);
    setNotes(notes.filter((note) => note.id !== id));
  };

  if (notes.length === 0) return <p>No trashed notes.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {notes.map((note) => (
        <div key={note.id} className="border p-4 rounded shadow">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-semibold">{note.title}</h2>
            <div className="space-x-2">
              <button onClick={() => handleRestore(note.id)} className="text-green-600">
                ♻ Restore
              </button>
              <button onClick={() => handlePermanentDelete(note.id)} className="text-red-600">
                🗑 Delete
              </button>
            </div>
          </div>
          <p>{note.description}</p>
          <div className="mt-2 text-sm text-gray-600">
            Tags: {note.tags.join(", ")}
          </div>
        </div>
      ))}
    </div>
  );
}