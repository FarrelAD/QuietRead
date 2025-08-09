import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { NoteFormData } from "../models/note";
import { useSQLite } from "../context/SQLiteContext";
import { BookType } from "../models/book";

export default function AddNewNote(props: {
  handleCloseModal: (state: boolean) => void;
  loadNotes: () => Promise<void>
}) {
  const { handleCloseModal, loadNotes } = props;

  const [formData, setFormData] = useState<NoteFormData>({
    bookId: 1,
    content: "",
    page: 0,
    title: "",
  });
  const [books, setBooks] = useState<BookType[]>([]);
  const [, setShowAddNote] = useState(true);

  const { db } = useSQLite();

  useEffect(() => {
    const loadBookOptions = async () => {
      if (!db) return;

      try {
        const result = await db.query(`
          SELECT b.id, b.title
          FROM books b
        `);

        if (!result?.values) return;

        setBooks(result.values);
      } catch (error: any) {
        console.error("Error to load books data from database", error);
        alert("Error to load books data from database");
      }
    };

    loadBookOptions();
  }, [db]);

  const resetAddNoteForm = () => {
    setShowAddNote(false);
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'page' || name === 'bookId' ? Number(value) : value,
    }));
  };

  /**
   * Save new note to SQLite local database
   */
  const handleAddNote = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (
        !formData.bookId ||
        !formData.title.trim() ||
        !formData.content.trim()
      ) {
        alert("Make sure all data not empty!");
        return;
      }

      await db?.run(
        `INSERT INTO notes (
          book_id,
          title,
          content,
          page
        ) VALUES (?, ?, ?, ?)`,
        [formData.bookId, formData.title, formData.content, formData.page]
      );

      alert("Success to store note to personal library!");
      resetAddNoteForm();
      loadNotes();
    } catch (error: any) {
      console.error("Error saving note:", error);
      alert("Failed to store note. Nothing was saved.");
    }
  };

  const closeModal = () => {
    resetAddNoteForm();
    handleCloseModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Add Note</h3>

        <form onSubmit={handleAddNote} className="space-y-4">
          <select
            name="bookId"
            id="book-id"
            value={formData.bookId}
            onChange={handleFormChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl! focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {books.map((book, index) => (
              <option key={index} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="title"
            placeholder="Note title"
            value={formData.title}
            onChange={handleFormChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl! focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <input
            type="number"
            name="page"
            placeholder="Page number"
            value={formData.page}
            onChange={handleFormChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl! focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <textarea
            name="content"
            placeholder="Write your note here..."
            value={formData.content}
            onChange={handleFormChange}
            rows={6}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl! focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-3! px-4! text-gray-600 border border-gray-200 rounded-xl! font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3! px-4! bg-blue-500 text-white rounded-xl! font-medium hover:bg-blue-600 transition-colors"
            >
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
