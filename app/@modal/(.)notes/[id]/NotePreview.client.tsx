"use client";

import { useRouter } from "next/navigation";
import NotePreview from "@/components/NotePreview/NotePreview";
import { useEffect, useState } from "react";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";

interface Props {
  params: { id: string };
}

export default function NotePreviewModal({ params }: Props) {
  const [note, setNote] = useState<Note | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchNoteById(params.id).then((fetchedNote) => setNote(fetchedNote));
  }, [params.id]);

  if (!note) return <p>Loading note...</p>;

  return (
    <div onClick={() => router.back()}>
      <NotePreview note={note} />
    </div>
  );
}