import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Plus, Search, Star } from "lucide-react";
import { useState } from "react";

function MyBooks() {
	const [showAddNote, setShowAddNote] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddBook, setShowAddBook] = useState(false);

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

  const currentBook = books.find((book) => book.isCurrentlyReading);
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <IonPage>
      <IonHeader className="px-4!">
        <IonToolbar>
          <IonTitle>BookNest</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="p-4 pb-20">
          {/* Search Bar */}
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

          {/* Currently Reading */}
          {currentBook && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Currently Reading
              </h2>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-start space-x-4">
                  <img
                    src={currentBook.cover}
                    alt={currentBook.title}
                    className="w-20 h-28 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">
                      {currentBook.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{currentBook.author}</p>
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
                      onClick={() => setShowAddNote(true)}
                      className="bg-blue-500 text-white px-4! py-2! rounded-lg! text-sm font-medium hover:bg-blue-600 transition-colors"
                    >
                      Add Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Book Grid */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">My Library</h2>
            <div className="grid grid-cols-2 gap-4">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1 text-sm leading-tight">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-xs mb-2">{book.author}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < book.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
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
          </div>

          {/* Add Book Button */}
          <button
            onClick={() => setShowAddBook(true)}
            className="fixed bottom-20 right-4 w-14 h-14 bg-blue-500 text-white rounded-full! shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default MyBooks;
