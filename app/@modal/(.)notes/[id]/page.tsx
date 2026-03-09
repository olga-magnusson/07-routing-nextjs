"use client";

import { useEffect, useState } from "react";
import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";

interface Props {
  params: { id: string };
}

export default function NoteModal({ params }: Props) {
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNoteById(params.id).then(setNote);
  }, [params.id]);

  if (!note) return <div>Loading...</div>;

  return <NotePreview note={note} />;
}