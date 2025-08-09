import React from "react";
import NotesList from "../components/NotesList";

export default function PinnedList({ 
  notes, 
  onNoteClick,
  onDeleteNote,
  onArchiveNote,
  onPinNote }) {
  const pinnedNotes = notes.filter(
    (note) => note.pinned && !note.archived && !note.trashed
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pinned Notes</h1>
      <NotesList 
      notes={pinnedNotes} 
      onNoteClick={onNoteClick}
      onDeleteNote={onDeleteNote}
      onArchiveNote={onArchiveNote}
      onPinNote={onPinNote} />
    </div>
  );
}
