"use client"

import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
import Modal from "@/components/Modal/Modal";
import css from "@/components/NotePreview/NotePreview.module.css";
import { Note } from "@/types/note";
import { useRouter } from "next/router";

interface NotePreviewProps {
    note: Note;
}

export default function NotePreview({note}: NotePreviewProps){
    const router = useRouter();
    return(
        <Modal onClose={()=> router.back()}>
            <div className={css.container}>
                <NoteDetailsClient note={note} />
            </div>
        </Modal>
    );
}