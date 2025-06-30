import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { BookOpen, Calendar } from "lucide-react";
import { useState } from "react";

function ReadingNotes() {
	const [showAddNote, setShowAddNote] = useState(false);

  const [books] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
      isbn: "9780743273565",
      rating: 4,
      dateAdded: "2024-06-15",
      lastRead: "2024-06-28",
      isCurrentlyReading: true,
      progress: 65,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      cover:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop",
      isbn: "9780061120084",
      rating: 5,
      dateAdded: "2024-06-01",
      lastRead: "2024-06-20",
      isCurrentlyReading: false,
      progress: 100,
    },
  ]);

  const [notes] = useState([
    {
      id: 1,
      bookId: 1,
      title: "Symbolism in Chapter 7",
      content:
        "The green light represents Gatsby's dreams and the American Dream itself...",
      dateCreated: "2024-06-28",
      page: 180,
    },
    {
      id: 2,
      bookId: 1,
      title: "Character Analysis - Nick Carraway",
      content:
        "Nick serves as both narrator and moral compass throughout the story...",
      dateCreated: "2024-06-25",
      page: 95,
    },
  ]);

  const currentBook = books.find((book) => book.isCurrentlyReading);

  return (
    <IonPage>
      <IonHeader className="px-4!">
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
                onClick={() => setShowAddNote(true)}
                className="bg-blue-500 text-white px-4! py-2! rounded-lg! text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                New Note
              </button>
            )}
          </div>

          {currentBook && (
            <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
              <div className="flex items-center space-x-3">
                <img
                  src={currentBook.cover}
                  alt={currentBook.title}
                  className="w-12 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {currentBook.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{currentBook.author}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {notes
              .filter((note) => !currentBook || note.bookId === currentBook.id)
              .map((note) => {
                const book = books.find((b) => b.id === note.bookId);
                return (
                  <div
                    key={note.id}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-800">
                        {note.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{note.dateCreated}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {note.content}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-gray-400" />
                        <span className="text-xs text-gray-600">
                          {book?.title}
                        </span>
                      </div>
                      {note.page && (
                        <span className="text-xs text-gray-500">
                          Page {note.page}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ReadingNotes;
