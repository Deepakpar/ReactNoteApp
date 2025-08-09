import React from "react";

export default function NoteModal({
  note,
  onClose,
  onUpdateNote,
  onDeleteNote,
  onPinNote,
  onArchiveNote,
}) {
  if (!note) return null;

  const handlePin = () => {
    if (onPinNote) {
      onPinNote(note.id);
      alert(note.pinned ? "Note unpinned" : "Note pinned");
    }
  };

  const handleArchive = () => {
    if (onArchiveNote) {
      onArchiveNote(note.id);
      alert(note.archived ? "Note unarchived" : "Note archived");
    }
  };

  const handleDelete = () => {
    if (onDeleteNote) {
      onDeleteNote(note.id);
      alert("Note moved to trash");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-lg relative shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 text-xl hover:text-black">✖</button>
        
        <h2 className="text-xl font-bold mb-2">{note.title}</h2>
        <p className="text-gray-700">{note.description}</p>

        <div className="mt-4 flex justify-between">
          <button onClick={handlePin} className="text-yellow-600 hover:underline">
            {note.pinned ? "📌 Unpin" : "📌 Pin"}
          </button>
          <button onClick={handleArchive} className="text-blue-600 hover:underline">
            {note.archived ? "🗂 Unarchive" : "🗂 Archive"}
          </button>
          <button onClick={handleDelete} className="text-red-600 hover:underline">
            🗑 Delete
          </button>
        </div>
      </div>
    </div>
  );
}
