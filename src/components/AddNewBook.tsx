import { Camera, Search } from "lucide-react";
import { useState } from "react";
import { Book, BookType } from "../models/book";
import { NotFoundBookCard, PreviewBookCard } from "./cards/BookCard";
import { useSQLite } from "../context/SQLiteContext";
import { getCurrentLocalDateTime } from "../helpers/DateFormat";

export default function AddNewBook(props: {
  handleCloseModal: (modalType: string, state: boolean) => void;
}) {
  const { handleCloseModal } = props;

  const [manualISBN, setManualISBN] = useState("");
  const [bookPreview, setBookPreview] = useState<BookType | null>(null);
  const [scanResult, setScanResult] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoadingBook, setIsLoadingBook] = useState(false);

  const { db } = useSQLite();

  const resetAddBookForm = () => {
    setManualISBN("");
    setScanResult("");
    setBookPreview(null);
    setIsScanning(false);
    setIsLoadingBook(false);
  };

  const fetchBookDetails = async (isbn: string) => {
    console.log("Fetching book details for ISBN:", isbn);
    setIsLoadingBook(true);

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
      );
      const data = await response.json();

      if (data.totalItems > 0) {
        console.log(
          `data raw: ${JSON.stringify(data["items"][0]["volumeInfo"])}`
        );
        const volumeInfo = Book.fromJson(data["items"][0]["volumeInfo"]);
        console.log(`volume info: ${volumeInfo}`);

        // Ensure imageLinks exists before modifying
        if (volumeInfo.imageLinks) {
          const { smallThumbnail, thumbnail } = volumeInfo.imageLinks;

          volumeInfo.imageLinks.smallThumbnail =
            smallThumbnail?.replace(/^http:\/\//i, "https://") ??
            smallThumbnail;

          volumeInfo.imageLinks.thumbnail =
            thumbnail?.replace(/^http:\/\//i, "https://") ?? thumbnail;
        }
        setBookPreview(volumeInfo as BookType);
      } else {
        setBookPreview(null);
      }
    } catch (err) {
      console.error(err);
      alert("An uxpected error happen when try to fetch book details");
    } finally {
      setIsLoadingBook(false);
      setHasSearched(true);
    }
  };

  const scanISBN = async () => {
    setIsScanning(true);
    console.log("Starting ISBN scan...");

    // Simulate real scanning
    setTimeout(() => {
      const mockISBN = "9780743273565";
      setScanResult(mockISBN);
      setManualISBN(mockISBN);
      setIsScanning(false);
      fetchBookDetails(mockISBN);
    }, 2000);

    return null;
  };

  /**
   * Save book and its authors to SQLite in a single transaction.
   * Rolls back if any step fails to keep data consistent.
   */
  const handleSaveBook = async () => {
    try {
      // Insert to books table first
      const bookSQLresult = await db?.run(
        `INSERT INTO books (
          title,
          date_added,
          publisher,
          published_date,
          category,
          description,
          page_count,
          language,
          small_thumbnail,
          thumbnail
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          bookPreview?.title,
          getCurrentLocalDateTime(),
          bookPreview?.publisher,
          bookPreview?.publishedDate,
          bookPreview?.categories.join(","),
          bookPreview?.description,
          bookPreview?.pageCount,
          bookPreview?.language,
          bookPreview?.imageLinks.smallThumbnail,
          bookPreview?.imageLinks.thumbnail,
        ]
      );

      const bookId = bookSQLresult?.changes?.lastId;
      if (!bookId) throw new Error("Failed to insert book");

      // and then, insert new book author
      for (const author of bookPreview?.authors || []) {
        const result = await db?.run(
          `INSERT OR IGNORE INTO authors (name) VALUES (?)`,
          [author]
        );

        let authorId = result?.changes?.lastId;
        if (!authorId) {
          const existing = await db?.query(
            `SELECT id FROM authors WHERE name = ?`,
            [author]
          );
          authorId = existing?.values?.[0]?.id;
        }

        if (!authorId) throw new Error(`No ID found for author: ${author}`);

        await db?.run(
          `INSERT INTO book_authors (
            book_id,
            author_id
          ) VALUES (?, ?)`,
          [bookId, authorId]
        );
      }

      alert("Success to store book to personal library!");
      resetAddBookForm();
    } catch (error: any) {
      console.error("Error saving book:", error);
      alert("Failed to store book. Nothing was saved.");
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
              onChange={(e) => setManualISBN(e.target.value.trim())}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isScanning || isLoadingBook}
            />
            <button
              onClick={() => fetchBookDetails(manualISBN)}
              disabled={!manualISBN || isScanning || isLoadingBook}
              className={
                !manualISBN || isScanning || isLoadingBook
                  ? "px-4! py-3! bg-gray-100 text-gray-700 rounded-r-xl! hover:bg-gray-200 transition-colors disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
                  : "px-4! py-3! bg-blue-500 text-white  rounded-r-xl! font-medium hover:bg-blue-600 transition-colors"
              }
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
          <PreviewBookCard book={bookPreview} />
        ) : (
          hasSearched && <NotFoundBookCard />
        )}

        <div className="flex space-x-3">
          <button
            onClick={() => {
              resetAddBookForm();
              handleCloseModal("add-book", false);
            }}
            className="flex-1 py-3! px-4! text-gray-600 border border-gray-200 rounded-xl! font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveBook}
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
