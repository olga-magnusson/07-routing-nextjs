
import NotePreview from "@/components/NotePreview/NotePreview";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

interface NoteModalProps {
  params: { id: string };
}

export default async function NoteModal({ params }: NoteModalProps) {
  
  const queryClient = new QueryClient();

  const note: Note = await fetchNoteById(params.id);

  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview note={note} />
    </HydrationBoundary>
  );
}