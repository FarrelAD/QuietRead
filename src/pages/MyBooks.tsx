import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Plus, Search } from "lucide-react";
import { useContext, useState } from "react";
import books from "../data/books";
import AddNewBook from "../components/AddNewBook";
import AddNewNote from "../components/AddNewNote";
import { AddNewNoteContext } from "../context/AddNewNoteContext";

function MyBooks() {
  const [showAddBook, setShowAddBook] = useState(false);
  const [, setShowAddNote] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const addNewNoteCtx = useContext(AddNewNoteContext);
  if (!addNewNoteCtx) {
    throw new Error("AppNote button must be used within AddNewNoteProvider");
  }

  const { isNewNoteShow, toggleAddNewNote } = addNewNoteCtx;

  return (
    <IonPage>
      <IonHeader className="px-4!">
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
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Currently Reading
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-start space-x-4">
                  <img
                    src={currentBook.imageLinks.thumbnail}
                    alt={currentBook.title}
                    className="w-20 h-28 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      {currentBook.title}
                    </h3>
                    {currentBook.authors.map((author, index) => (
                      <p key={index} className="text-gray-600 mb-3">
                        {author}
                      </p>
                    ))}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{currentBook.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${currentBook.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setShowAddNote(true);
                        toggleAddNewNote();
                      }}
                      className="bg-blue-500 text-white px-4! py-2! rounded-lg! text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <section className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">My Library</h2>
            <div className="grid grid-cols-2 gap-4">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <img
                    src={book.imageLinks.thumbnail}
                    alt={book.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm leading-tight">
                      {book.title}
                    </h3>
                    {book.authors.map((author, index) => (
                      <p key={index} className="text-gray-600 mb-3">
                        {author}
                      </p>
                    ))}
                    <div className="flex items-center justify-between">
                      {book.progress < 100 && (
                        <span className="text-xs text-blue-600 font-medium">
                          {book.progress}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
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

export default MyBooks;
