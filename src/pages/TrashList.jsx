import React from "react";
import NoteCard from "../components/NoteCard";


export default function TrashList({ notes, onRestoreNote, onDeleteNote, onOpenNote }) {
  const trashedNotes = notes.filter((note) => note.trashed);

  if (trashedNotes.length === 0) {
    return <p className="text-center text-gray-500">Trash is empty.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {trashedNotes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onClick={onOpenNote}
          onRestoreNote={onRestoreNote}
          onDeleteNote={onDeleteNote}
        />
      ))}
    </div>
  );
}
