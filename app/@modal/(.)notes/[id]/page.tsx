
import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

interface NoteModalProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModal({ params }: NoteModalProps) {
  const resolvedParams = await params;
  const noteId = resolvedParams.id;

  const queryClient = new QueryClient();

  const note: Note = await fetchNoteById(noteId);

  await queryClient.prefetchQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview note={note} />
    </HydrationBoundary>
  );
}