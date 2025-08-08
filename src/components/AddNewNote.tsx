import { useContext, useState } from "react";
import Note from "../interfaces/note";
import Book from "../interfaces/book";
import { AddNewNoteContext } from "../context/AddNewNoteContext";

type AddNewNoteProps = {
  book: Book
}

export default function AddNewNote(props: AddNewNoteProps) {
  const { book } = props;

  const [newNote, setNewNote] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [, setShowAddNote] = useState(true);

  const addNewNoteCtx = useContext(AddNewNoteContext);
  if (!addNewNoteCtx) {
    throw new Error("AppNote button must be used within AddNewNoteProvider");
  }
  const { toggleAddNewNote } = addNewNoteCtx;

  const saveNote = async (noteData: Note) => {
    console.log("Saving note:", noteData);
    return null;
  };

  const handleAddNote = () => {
    if (book && newNote.trim() && noteTitle.trim()) {
      const noteData: Note = {
        id: Math.random(),
        bookId: book.id!,
        title: noteTitle,
        content: newNote,
        page: Math.random(),
        dateCreated: new Date().toISOString().split("T")[0],
      };
      saveNote(noteData);
      setNewNote("");
      setNoteTitle("");
      setShowAddNote(false);
    }
  };

  const closeModal = () => {
    setShowAddNote(false);
    setNewNote("");
    setNoteTitle("");
    toggleAddNewNote();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Add Note</h3>

        {book && (
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center space-x-3">
              <img
                src={book.imageLinks.smallThumbnail}
                alt={book.title}
                className="w-10 h-14 object-cover rounded"
              />
              <div>
                <h4 className="font-medium text-gray-800 text-sm">
                  {book.title}
                </h4>
                {book.authors.map((author, index) => (
                  <p key={index} className="text-gray-600 mb-3">
                    {author}
                  </p>
                ))}
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
              onClick={closeModal}
              className="flex-1 py-3! px-4! text-gray-600 border border-gray-200 rounded-xl! font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddNote}
              className="flex-1 py-3! px-4! bg-blue-500 text-white rounded-xl! font-medium hover:bg-blue-600 transition-colors"
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
