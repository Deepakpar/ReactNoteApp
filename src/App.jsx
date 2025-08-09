import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import SearchBar from "./components/SearchBar";
import FilterTags from "./components/FilterTags";
import NoteModal from "./components/NoteModal";
import { loadFromStorage, saveToStorage } from "./Instances/storage";
import TrashList from "./pages/TrashList";
import ArchivedList from "./pages/ArchivedList";
import PinnedList from "./pages/PinnedList";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const savedNotes = loadFromStorage("notes");
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    saveToStorage("notes", notes);
  }, [notes]);

  const handleAddNote = (note) => setNotes([note, ...notes]);

  const handleUpdateNote = (updatedNote) =>
    setNotes(notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)));

const handleDeleteNote = (id, permanent = false) => {
  if (permanent) {
    // Remove note entirely
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  } else {
    // Move note to trash
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? { ...note, trashed: true, archived: false, pinned: false }
          : note
      )
    );
  }
};

  const handlePinNote = (id) => {
    const updated = notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n));
    setNotes(updated);
    alert(updated.find((n) => n.id === id).pinned ? "Note pinned!" : "Note unpinned!");
  };

  const handleArchiveNote = (id) => {
    const updated = notes.map((n) => (n.id === id ? { ...n, archived: !n.archived } : n));
    setNotes(updated);
    alert(updated.find((n) => n.id === id).archived ? "Note archived!" : "Note unarchived!");
  };


  const handleRestoreNote = (id) => {
  setNotes((prevNotes) =>
    prevNotes.map((note) =>
      note.id === id ? { ...note, trashed: false } : note
    )
  );
};

const onDeleteNote = (id) => {
  setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
};

  const filteredNotes = notes.filter((note) => {
    const matchSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTag = selectedTag ? note.tags.includes(selectedTag) : true;
    return !note.trashed && !note.archived && matchSearch && matchTag;
  });

  return (
    <Router>
      <div className="p-4 max-w-4xl mx-auto">
        <nav className="flex gap-4 mb-4 text-blue-600 font-medium underline">
          <Link to="/">All Notes</Link>
          <Link to="/pinned">Pinned</Link>
          <Link to="/archived">Archived</Link>
          <Link to="/trash">Trash</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="text-3xl font-bold mb-4 no-underline">Notes App</h1>
                <NoteForm onAddNote={handleAddNote} />
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <FilterTags
                  notes={notes}
                  selectedTag={selectedTag}
                  setSelectedTag={setSelectedTag}
                />
                <NotesList
                  notes={filteredNotes}
                  onUpdateNote={handleUpdateNote}
                  onDeleteNote={handleDeleteNote}
                  onPinNote={(id) => {
                  const updated = notes.map((n) =>
                  n.id === id ? { ...n, pinned: !n.pinned } : n
                  );
                  setNotes(updated);
                  alert(
                  updated.find((n) => n.id === id).pinned
                  ? "Note pinned!"
                  : "Note unpinned!"
                  );
                  }}
                  onArchiveNote={(id) => {
                  const updated = notes.map((n) =>
                  n.id === id ? { ...n, archived: !n.archived } : n
                  );
                  setNotes(updated);
                  alert(
                  updated.find((n) => n.id === id).archived
                  ? "Note archived!"
                  : "Note unarchived!"
                  );
                  }}
                  onUnarchiveNote={(id) => {
                  const updated = notes.map((n) =>
                  n.id === id ? { ...n, archived: false } : n
                  );
                  setNotes(updated);
                  alert("Note unarchived!");
                  }}
                  onRestoreNote={(id) => {
                  const updated = notes.map((n) =>
                  n.id === id ? { ...n, trashed: false } : n
                  );
                  setNotes(updated);
                  alert("Note restored from trash!");
                  }}
                  onDeletePermanently={(id) => {
                  const updated = notes.filter((n) => n.id !== id);
                  setNotes(updated);
                  alert("Note permanently deleted!");
                  }}
                  onNoteClick={(note) => setSelectedNote(note)}
                />

              </>
            }
          />
          <Route
            path="/pinned"
            element={
              <PinnedList
                notes={notes}
                onNoteClick={(note) => setSelectedNote(note)}
                onDeleteNote={handleDeleteNote}
                onArchiveNote={handleArchiveNote}
                onPinNote={handlePinNote}
              />
            }
          />
          <Route
            path="/archived"
            element={
              <ArchivedList
                notes={notes}
                onNoteClick={(note) => setSelectedNote(note)}
                onDeleteNote={handleDeleteNote}
                onArchiveNote={handleArchiveNote}
                onPinNote={handlePinNote}
              />
            }
          />
          <Route
            path="/trash"
            element={
              <TrashList
                notes={notes}
                onRestoreNote={handleRestoreNote}
                onDeleteNote={handleDeleteNote}
                onOpenNote={(note) => setSelectedNote(note)}
              />
            }
          />
        </Routes>

        {/* Shared Modal */}
        <NoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onUpdateNote={handleUpdateNote}
          onDeleteNote={handleDeleteNote}
          onPinNote={handlePinNote}
          onArchiveNote={handleArchiveNote}
        />
      </div>
    </Router>
  );
}
