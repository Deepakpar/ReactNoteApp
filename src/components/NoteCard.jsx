import React from "react";

export default function NoteCard({
  note,
  onClick,
  onDeleteNote,
  onRestoreNote,
  onArchiveNote,
  onPinNote,
}) {
  return (
    <div
      className="border p-4 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold">{note.title}</h3>
      <p className="text-sm mt-1">{note.content}</p>

      <div className="flex gap-2 mt-4">
        {/* Pin / Unpin */}
        {!note.trashed && (
          <button
            className="px-2 py-1 text-sm bg-yellow-300 rounded"
            onClick={(e) => {
              e.stopPropagation();
              onPinNote?.(note.id);
            }}
          >
            {note.pinned ? "Unpin" : "Pin"}
          </button>
        )}

        {/* Archive / Unarchive */}
        {!note.trashed && (
          <button
            className="px-2 py-1 text-sm bg-green-300 rounded"
            onClick={(e) => {
              e.stopPropagation();
              onArchiveNote?.(note.id);
            }}
          >
            {note.archived ? "Unarchive" : "Archive"}
          </button>
        )}

        {/* Restore (only in trash) */}
        {note.trashed && (
          <button
            className="px-2 py-1 text-sm bg-blue-300 rounded"
            onClick={(e) => {
              e.stopPropagation();
              onRestoreNote?.(note.id);
            }}
          >
            Restore
          </button>
        )}

        {/* Delete */}
        <button
          className="px-2 py-1 text-sm bg-red-400 rounded"
          onClick={(e) => {
            e.stopPropagation();
            if (note.trashed) {
              onDeleteNote?.(note.id, true); // Permanent delete
            } else {
              onDeleteNote?.(note.id, false); // Move to trash
            }
          }}
        >
          {note.trashed ? "Delete Permanently" : "Delete"}
        </button>
      </div>
    </div>
  );
}
