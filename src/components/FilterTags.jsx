import React from "react";

export default function FilterTags({ notes, selectedTag, setSelectedTag }) {
  const allTags = Array.from(
    new Set(notes.flatMap((note) => note.tags))
  );

  return (
    <div className="mb-4">
      <span className="font-medium mr-2">Filter by tag:</span>
      <select
        value={selectedTag}
        onChange={(e) => setSelectedTag(e.target.value)}
        className="border p-2"
      >
        <option value="">All</option>
        {allTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}