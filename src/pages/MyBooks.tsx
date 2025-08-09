import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Plus, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import AddNewBook from "../components/AddNewBook";
import AddNewNote from "../components/AddNewNote";
import { AddNewNoteContext } from "../context/AddNewNoteContext";
import CurrentReadingBook from "../components/CurrentReadingBook";
import { BigBookCard } from "../components/cards/BookCard";
import { useSQLite } from "../context/SQLiteContext";
import { BookType } from "../models/book";

export default function MyBooks() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [showAddBook, setShowAddBook] = useState<boolean>(false);
  const [, setShowAddNote] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { db } = useSQLite();

  useEffect(() => {
    const loadBooks = async () => {
      if (!db) return;

      try {
        const result = await db?.query(`
          SELECT 
            b.id,
            b.title,
            b.date_added,
            b.last_read,
            b.publisher,
            b.published_date,
            b.category,
            b.description,
            b.page_count,
            b.progress,
            b.is_currently_reading,
            b.language,
            b.small_thumbnail,
            b.thumbnail,
            b.isbn_10,
            b.isbn_13,
            GROUP_CONCAT(a.name, ', ') AS authors
          FROM books b
          LEFT JOIN book_authors ba ON b.id = ba.book_id
          LEFT JOIN authors a ON ba.author_id = a.id
          GROUP BY b.id
          ORDER BY b.date_added DESC;
        `);

        if (!result?.values) return;

        const mappedBooks = result.values.map((row) => ({
          ...row,
          industryIdentifiers: [
            {
              type: "ISBN_10",
              identifier: row.isbn_10
            },
            {
              type: "ISBN_13",
              identifier: row.isbn_13
            },
          ],
          authors: row.authors
            ? row.authors.split(",").map((a: string) => a.trim())
            : [],
          imageLinks: {
            smallThumbnail: row.small_thumbnail,
            thumbnail: row.thumbnail
          }
        })) as BookType[];

        setBooks(mappedBooks);
      } catch (error: any) {
        console.error("Error to load books data from database");
        console.error(error);
        alert("Error to load books data from database");
      }
    };

    loadBooks();
  }, [db]);

  const addNewNoteCtx = useContext(AddNewNoteContext);
  if (!addNewNoteCtx) {
    throw new Error("AppNote button must be used within AddNewNoteProvider");
  }
  const { isNewNoteShow, toggleAddNewNote } = addNewNoteCtx;

  const currentBook = books.find((book) => book.isCurrentlyReading);
  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const authorMatch = book.authors?.some((author) =>
      author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return titleMatch || authorMatch;
  });

  const handleCloseModal = (modalType: string, state: boolean) => {
    switch (modalType) {
      case "add-book":
        setShowAddBook(state);
        break;
      case "add-note":
        setShowAddNote(state);
        break;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BookNest</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="p-4 pb-20">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search your library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {currentBook && (
            <CurrentReadingBook
              book={currentBook}
              setShowAddNote={setShowAddNote}
              toggleAddNewNote={toggleAddNewNote}
            />
          )}

          <section className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">My Library</h2>
            <div className="grid grid-cols-2 gap-4">
              {books.map((book, index) => (
                <BigBookCard key={index} book={book} />
              ))}
            </div>
          </section>

          <button
            onClick={() => setShowAddBook(true)}
            className="fixed bottom-20 right-4 w-14 h-14 bg-blue-500 text-white rounded-full! shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            <Plus className="h-6 w-6" />
          </button>

          {showAddBook && <AddNewBook handleCloseModal={handleCloseModal} />}
          {isNewNoteShow && currentBook && <AddNewNote book={currentBook} />}
        </div>
      </IonContent>
    </IonPage>
  );
}
