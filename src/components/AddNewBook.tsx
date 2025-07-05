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
  const [hasSearched, setHasSearched] = useState(false);
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

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
      );
      const data = await response.json();
      console.log("data: ", data);

      if (data.totalItems > 0) {
        const volumeInfo: Book = data["items"][0]["volumeInfo"];
        setBookPreview(volumeInfo);
      } else {
        setBookPreview(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingBook(false);
      setHasSearched(true);
    }
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
        </div>

        <section className="mb-6">
          <p className="font-medium text-gray-700 my-4 text-center">
            Scan ISBN barcode
          </p>
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
          <p className="font-medium text-gray-700 text-center my-4">
            or enter ISBN manually
          </p>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter 10 or 13 digit ISBN"
              value={manualISBN}
              onChange={(e) => setManualISBN(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isScanning || isLoadingBook}
            />
            <button
              onClick={handleManualISBNSubmit}
              disabled={!manualISBN.trim() || isScanning || isLoadingBook}
              className="px-4! py-3! bg-gray-100 text-gray-700 rounded-r-xl! hover:bg-gray-200 transition-colors disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
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

        {bookPreview && !isLoadingBook ? (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
            <h4 className="font-semibold text-gray-700 mb-3">Book Preview</h4>
            <div className="flex space-x-4">
              <img
                src={bookPreview.imageLinks.thumbnail}
                alt={bookPreview.title}
                className="w-16 h-24 object-cover rounded-lg shadow-sm"
              />
              <div className="flex-1">
                <h5 className="font-semibold text-gray-800 mb-1">
                  {bookPreview.title}
                </h5>
                {bookPreview.authors.map((author, index) => (
                  <p key={index} className="text-gray-600 text-sm mb-1">
                    {author}
                  </p>
                ))}
                <ul className="text-gray-500 text-xs mb-2">
                  {bookPreview.industryIdentifiers.map((idn, index) => (
                    <li key={index}>
                      {idn.type} - {idn.identifier}
                    </li>
                  ))}
                </ul>
                {bookPreview.pageCount && (
                  <p className="text-gray-500 text-xs">
                    {bookPreview.pageCount} pages
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
        ) : (
          hasSearched && (
            <div className="flex items-center justify-center p-4">
              <div className="flex items-center gap-4 bg-white rounded-lg shadow-md border border-gray-200 p-4 max-w-md">
                <div className="flex-1">
                  <h5 className="text-lg font-semibold text-gray-800 mb-1">
                    Book Not Found
                  </h5>
                  <p className="text-sm text-gray-600">
                    The book you're looking for doesn't exist.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-500 text-sm font-bold">!</span>
                  </div>
                </div>
              </div>
            </div>
          )
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
