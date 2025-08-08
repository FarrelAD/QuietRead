import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useContext, useState } from "react";
import books from "../data/books";
import notes from "../data/notes";
import { AddNewNoteContext } from "../context/AddNewNoteContext";
import AddNewNote from "../components/AddNewNote";
import { MediumBookCard } from "../components/cards/BookCard";
import { NoteCard } from "../components/cards/NoteCard";

export default function ReadingNotes() {
  const [, setShowAddNote] = useState(false);

  const currentBook = books.find((book) => book.isCurrentlyReading);

  const addNewNoteCtx = useContext(AddNewNoteContext);
  if (!addNewNoteCtx) {
    throw new Error("AppNote button must be used within AddNewNoteProvider");
  }
  const { isNewNoteShow, toggleAddNewNote } = addNewNoteCtx;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reading Notes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="p-4 pb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Reading Notes</h2>
            {currentBook && (
              <button
                onClick={() => {
                  setShowAddNote(true);
                  toggleAddNewNote();
                }}
                className="bg-blue-500 text-white px-4! py-2! rounded-lg! text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                New Note
              </button>
            )}
          </div>

          {currentBook && <MediumBookCard book={currentBook} />}

          {isNewNoteShow && currentBook && <AddNewNote book={currentBook} />}

          <section className="space-y-4">
            {notes
              .filter((note) => !currentBook || note.bookId === currentBook.id)
              .map((note, index) => {
                const book = books.find((b) => b.id === note.bookId);
                return <NoteCard key={index} note={note} book={book!} /> ;
              })}
          </section>
        </div>
      </IonContent>
    </IonPage>
  );
}
