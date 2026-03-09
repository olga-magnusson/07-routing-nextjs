"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes, FetchNotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebouncedCallback} from "use-debounce";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

interface NotesClientProps{
  initialNotes?: FetchNotesResponse;
}

export default function NotesClient({initialNotes}: NotesClientProps) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const perPage = 12;

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", page, search],
    queryFn: () => fetchNotes(page, perPage, search),
    placeholderData: initialNotes,
  });

  return (
    <div>
      <SearchBox value={search} onSearch={(val) => debouncedSearch(val)} />

      <button onClick={()=> setIsModalOpen(true)}>Create Note</button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm closeModal={() => setIsModalOpen(false)}/>
        </Modal>
      )}

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading notes</p>}

      {data && <NoteList notes={data.notes} />}

      {data && data.totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
