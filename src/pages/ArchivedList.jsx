import React from "react";
import NotesList from "../components/NotesList";

export default function ArchivedList({
  notes,
  onNoteClick,
  onDeleteNote,
  onArchiveNote,
  onPinNote
}) {
  const archivedNotes = notes.filter(
    (note) => note.archived && !note.trashed
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Archived Notes</h1>
      <NotesList
        notes={archivedNotes}
        onNoteClick={onNoteClick}
        onDeleteNote={onDeleteNote}
        onArchiveNote={onArchiveNote}
        onPinNote={onPinNote}
      />
    </div>
  );
}
