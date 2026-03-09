"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { fetchNotes } from "@/lib/api";
import { Note } from "@/types/note";
import NotePreview from "@/components/NotePreview/NotePreview";

export default function NotesClient() {
  const [notes, setNotes] = useState<Note[]>([]);
  const pathname = usePathname();
  const slug = pathname.split("/").pop() || "all";

  useEffect(() => {
    const tag = slug === "all" ? "" : slug;
    fetchNotes(1, 100, tag).then((res) => setNotes(res.notes));
  }, [slug]);

  return (
    <div>
      {notes.map((note) => (
        <NotePreview key={note.id} note={note} />
      ))}
    </div>
  );
}