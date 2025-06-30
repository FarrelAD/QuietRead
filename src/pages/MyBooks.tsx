import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Camera, Plus, Search, Star } from "lucide-react";
import { useState } from "react";

interface Book {
  title: string;
  author: string;
  cover: string;
  isbn: string;
  description: string;
  pages: number;
  publishedDate: string;
}

function MyBooks() {
  const [showAddBook, setShowAddBook] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newNote, setNewNote] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [manualISBN, setManualISBN] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const [bookPreview, setBookPreview] = useState<Book | null>(null);
  const [isLoadingBook, setIsLoadingBook] = useState(false);

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

  const saveNote = async (noteData) => {
    // This would save to database/local storage
    console.log("Saving note:", noteData);
    return null;
  };

  const handleAddNote = () => {
    console.log("ahahah");
    if (newNote.trim() && noteTitle.trim()) {
      const noteData = {
        bookId: currentBook?.id,
        title: noteTitle,
        content: newNote,
        dateCreated: new Date().toISOString().split("T")[0],
      };
      saveNote(noteData);
      setNewNote("");
      setNoteTitle("");
      setShowAddNote(false);
    }
  };

  const resetAddBookForm = () => {
    setManualISBN("");
    setScanResult("");
    setBookPreview(null);
    setIsScanning(false);
    setIsLoadingBook(false);
  };

  const fetchBookDetails = async (isbn) => {
    // This would call book API (Google Books, OpenLibrary, etc.)
    console.log("Fetching book details for ISBN:", isbn);
    setIsLoadingBook(true);

    // Mock book data - replace with actual API call
    setTimeout(() => {
      const mockBookData = {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        cover:
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
        isbn: isbn,
        description: "A classic American novel set in the Jazz Age...",
        pages: 180,
        publishedDate: "1925",
      };
      setBookPreview(mockBookData);
      setIsLoadingBook(false);
    }, 1500);

    return null;
  };

  const scanISBN = async () => {
    // This would integrate with camera/barcode scanner
    setIsScanning(true);
    console.log("Starting ISBN scan...");

    // Simulate scanning delay
    setTimeout(() => {
      const mockISBN = "9780743273565"; // Mock scanned ISBN
      setScanResult(mockISBN);
      setManualISBN(mockISBN);
      setIsScanning(false);
      fetchBookDetails(mockISBN);
    }, 2000);

    return null;
  };

  const saveBook = async (bookData) => {
    // This would save to database/local storage
    console.log("Saving book:", bookData);
    return null;
  };

  const handleAddBookSubmit = async () => {
    if (bookPreview) {
      await saveBook(bookPreview);
      setShowAddBook(false);
      resetAddBookForm();
      // In real app, refresh book list here
    }
  };

  const handleManualISBNSubmit = () => {
    if (manualISBN.trim()) {
      fetchBookDetails(manualISBN.trim());
    }
  };

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

          {/* Add Book Modal */}
          {showAddBook && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    Add New Book
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddBook(false);
                      resetAddBookForm();
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Scanning Section */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Scan ISBN Barcode
                  </h4>
                  <button
                    onClick={scanISBN}
                    disabled={isScanning || isLoadingBook}
                    className="w-full bg-blue-500 text-white py-4! px-6! rounded-xl! font-medium hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  >
                    {isScanning ? (
                      <>
                        <div className="animate-spin rounded-full! h-5! w-5! border-b-2 border-white"></div>
                        <span>Scanning...</span>
                      </>
                    ) : (
                      <>
                        <Camera className="h-5! w-5!" />
                        <span>Start Camera Scan</span>
                      </>
                    )}
                  </button>

                  {scanResult && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-700">
                          Scanned: {scanResult}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Manual Entry Section */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">
                    Or Enter ISBN Manually
                  </h4>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter 10 or 13 digit ISBN"
                      value={manualISBN}
                      onChange={(e) => setManualISBN(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={isScanning || isLoadingBook}
                    />
                    <button
                      onClick={handleManualISBNSubmit}
                      disabled={
                        !manualISBN.trim() || isScanning || isLoadingBook
                      }
                      className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    ISBN can be found on the back cover or copyright page
                  </p>
                </div>

                {/* Loading State */}
                {isLoadingBook && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="text-blue-700">
                        Looking up book details...
                      </span>
                    </div>
                  </div>
                )}

                {/* Book Preview */}
                {bookPreview && !isLoadingBook && (
                  <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <h4 className="font-semibold text-gray-700 mb-3">
                      Book Preview
                    </h4>
                    <div className="flex space-x-4">
                      <img
                        src={bookPreview.cover}
                        alt={bookPreview.title}
                        className="w-16 h-24 object-cover rounded-lg shadow-sm"
                      />
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-800 mb-1">
                          {bookPreview.title}
                        </h5>
                        <p className="text-gray-600 text-sm mb-1">
                          {bookPreview.author}
                        </p>
                        <p className="text-gray-500 text-xs mb-2">
                          ISBN: {bookPreview.isbn}
                        </p>
                        {bookPreview.pages && (
                          <p className="text-gray-500 text-xs">
                            {bookPreview.pages} pages
                          </p>
                        )}
                      </div>
                    </div>
                    {bookPreview.description && (
                      <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                        {bookPreview.description.substring(0, 150)}...
                      </p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowAddBook(false);
                      resetAddBookForm();
                    }}
                    className="flex-1 py-3! px-4! text-gray-600 border border-gray-200 rounded-xl! font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddBookSubmit}
                    disabled={!bookPreview || isLoadingBook}
                    className="flex-1 py-3! px-4! bg-blue-500 text-white rounded-xl! font-medium hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {bookPreview ? "Add to Library" : "Add Book"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add Note Modal */}
          {showAddNote && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  Add Note
                </h3>

                {currentBook && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={currentBook.cover}
                        alt={currentBook.title}
                        className="w-10 h-14 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium text-gray-800 text-sm">
                          {currentBook.title}
                        </h4>
                        <p className="text-gray-600 text-xs">
                          {currentBook.author}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Note title"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  <textarea
                    placeholder="Write your note here..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />

                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        setShowAddNote(false);
                        setNewNote("");
                        setNoteTitle("");
                      }}
                      className="flex-1 py-3 px-4 text-gray-600 border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddNote}
                      className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                    >
                      Save Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default MyBooks;
