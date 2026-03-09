"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";

interface NoteClientProps {
  initialNotes: FetchNotesResponse;
  tag: string;
}

export default function NotesClient({initialNotes, tag}: NoteClientProps) {
  const { data } = useQuery({
    queryKey: ["notes", 1, tag],
    queryFn: () => fetchNotes(1, 12, tag === "all" ? "" : tag),
    initialData: initialNotes, // <--- використовуємо initialNotes
  });

  return (
    <div>
      {data?.notes.map((note) => (
        <NotePreview key={note.id} note={note} />
      ))}
    </div>
  );
}