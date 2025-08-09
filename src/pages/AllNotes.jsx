import React, { useEffect, useState } from "react";
import NoteForm from "../components/NoteForm";
import NotesList from "../components/NotesList";
import SearchBar from "../components/SearchBar";
import FilterTags from "../components/FilterTags";
import { loadFromStorage, saveToStorage } from "../Instances/storage";

export default function AllNotes() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    const savedNotes = loadFromStorage("notes");
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    saveToStorage("notes", notes);
  }, [notes]);

  const handleAddNote = (note) => {
    setNotes([note, ...notes]);
  };

  const handleUpdateNote = (updatedNote) => {
    setNotes(notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)));
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, trashed: true } : n)));
  };

  const handlePinNote = (id) => {
    console.log("Pin clicked on note ID:", id);
    setNotes((prevNotes) =>
        
      prevNotes.map((n) =>
        n.id === id ? { ...n, pinned: !n.pinned } : n
      )
    );
    alert("Note pinned/unpinned");
  };

  const handleArchiveNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((n) =>
        n.id === id ? { ...n, archived: !n.archived } : n
      )
    );
    alert("Note archived/unarchived");
  };

  const filteredNotes = notes.filter((note) => {
    const matchSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTag = selectedTag ? note.tags.includes(selectedTag) : true;
    return !note.trashed && !note.archived && matchSearch && matchTag;
  });

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">All Notes</h1>
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
        onPinNote={handlePinNote}          
        onArchiveNote={handleArchiveNote}  
        onNoteClick={() => {}}             
      />
    </div>
  );
}
