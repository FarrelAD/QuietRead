import { Camera, Search } from "lucide-react";
import { useState } from "react";
import Book from "../interfaces/book";

function AddNewBook({
  handleCloseModal,
}: {
  handleCloseModal: (modalType: string, state: boolean) => void;
}) {
  const [, setShowAddBook] = useState(true);
  const [manualISBN, setManualISBN] = useState("");
  const [bookPreview, setBookPreview] = useState<Book | null>(null);
  const [scanResult, setScanResult] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [isLoadingBook, setIsLoadingBook] = useState(false);

  const resetAddBookForm = () => {
    setManualISBN("");
    setScanResult("");
    setBookPreview(null);
    setIsScanning(false);
    setIsLoadingBook(false);
  };

  const scanISBN = async () => {
    setIsScanning(true);
    console.log("Starting ISBN scan...");

    setTimeout(() => {
      const mockISBN = "9780743273565";
      setScanResult(mockISBN);
      setManualISBN(mockISBN);
      setIsScanning(false);
      fetchBookDetails(mockISBN);
    }, 2000);

    return null;
  };

  const fetchBookDetails = async (isbn: string) => {
    console.log("Fetching book details for ISBN:", isbn);
    setIsLoadingBook(true);

    setTimeout(() => {
      const mockBookData: Book = {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        cover:
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop",
        isbn: isbn,
        description: "A classic American novel set in the Jazz Age...",
        pages: 180,
        publishedDate: "1925",
        id: 0,
        rating: 0,
        dateAdded: new Date().toISOString().split("T")[0],
        lastRead: new Date().toISOString().split("T")[0],
        isCurrentlyReading: false,
        progress: 0,
      };
      setBookPreview(mockBookData);
      setIsLoadingBook(false);
    }, 1500);

    return null;
  };

  const handleManualISBNSubmit = () => {
    if (manualISBN.trim()) {
      fetchBookDetails(manualISBN.trim());
    }
  };

  const saveBook = async (bookData: Book) => {
    console.log("Saving book:", bookData);
    return null;
  };

  const handleAddBookSubmit = async () => {
    if (bookPreview) {
      await saveBook(bookPreview);
      setShowAddBook(false);
      resetAddBookForm();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Add New Book</h3>
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

        <section className="mb-6">
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
        </section>

        <section className="mb-6">
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
              disabled={!manualISBN.trim() || isScanning || isLoadingBook}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            ISBN can be found on the back cover or copyright page
          </p>
        </section>

        {isLoadingBook && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-blue-700">Looking up book details...</span>
            </div>
          </div>
        )}

        {bookPreview && !isLoadingBook && (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <h4 className="font-semibold text-gray-700 mb-3">Book Preview</h4>
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

        <div className="flex space-x-3">
          <button
            onClick={() => {
              setShowAddBook(false);
              resetAddBookForm();
							handleCloseModal("add-book", false);
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
  );
}

export default AddNewBook;
