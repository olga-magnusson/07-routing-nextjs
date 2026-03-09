"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import NotePreview from "@/components/NotePreview/NotePreview";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/app/@modal/default";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { Note, NoteTag } from "@/types/note";

interface NotesClientProps {
  tag: NoteTag | "all";
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);


  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);


  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ["notes", page, tag, debouncedSearch],
    queryFn: () => fetchNotes({
        page,
        perPage: 12,
        tag: tag === "all" ? undefined : tag,
        search: debouncedSearch,
      }),
    staleTime: 1000 * 60, 
  });


  const openModal = (id: string): void => {
    setSelectedNoteId(id);
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setSelectedNoteId(null);
    setModalOpen(false);
  };

  const totalPages: number = data?.totalPages ?? 1;


  return (
    <div>
 
      <SearchBox value={search} onSearch={setSearch} />


      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes.</p>}


      <div>
        {data?.notes.map((note: Note) => (
          <div key={note.id} onClick={() => openModal(note.id)}>
            <NotePreview note={note} />
          </div>
        ))}
      </div>


      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />


      {modalOpen && selectedNoteId && (
        <Modal>
          <NoteForm noteId={selectedNoteId} closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}