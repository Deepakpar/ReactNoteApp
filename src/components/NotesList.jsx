import React from "react";
import NoteCard from "./NoteCard";

export default function NotesList({
  notes,
  onNoteClick,
  onDeleteNote,
  onRestoreNote,
  onArchiveNote,
  onPinNote,
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onClick={() => onNoteClick?.(note)}
          onDeleteNote={onDeleteNote}
          onRestoreNote={onRestoreNote}
          onArchiveNote={onArchiveNote}
          onPinNote={onPinNote}
        />
      ))}
    </div>
  );
}
