import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import AddNewNote from "../components/AddNewNote";
import { NoteCard } from "../components/cards/NoteCard";
import { Plus } from "lucide-react";
import { useSQLite } from "../context/SQLiteContext";
import { NoteWithBook } from "../models/note";

export default function ReadingNotes() {
  const [notes, setNotes] = useState<NoteWithBook[]>([]);
  const [showAddNote, setShowAddNote] = useState<boolean>(false);

  const { db } = useSQLite();

  const loadNotes = async () => {
    try {
      if (!db) return;

      const result = await db.query(`
          SELECT 
            n.*,
            b.title AS book_title
          FROM notes n
          INNER JOIN books b ON n.book_id = b.id;
        `);

      const mappedNotes: NoteWithBook[] = (result.values ?? []).map((row) => ({
        id: row.id,
        bookId: row.book_id,
        bookTitle: row.book_title,
        title: row.title,
        content: row.content,
        page: row.page,
        createdAt: row.created_at,
      }));

      setNotes(mappedNotes);
    } catch (error: any) {
      console.error("Error to load notes data from database");
      console.error(error);
      alert("Error to load notes data from database");
    }
  };

  useEffect(() => {
    loadNotes();
  }, [db]);

  const handleCloseModal = (state: boolean) => {
    setShowAddNote(state);
  };

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
          </div>

          <section className="space-y-4">
            {notes.map((note, index) => (
              <NoteCard key={index} noteWithBook={note} />
            ))}
          </section>

          <button
            onClick={() => setShowAddNote(true)}
            className="fixed bottom-20 right-4 w-14 h-14 bg-blue-500 text-white rounded-full! shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            <Plus className="h-6 w-6" />
          </button>

          {showAddNote && (
            <AddNewNote
              handleCloseModal={handleCloseModal}
              loadNotes={loadNotes}
            />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
