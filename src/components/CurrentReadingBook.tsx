import { Dispatch, SetStateAction } from "react";
import Book from "../interfaces/book";

type CurrentReadingBookProps = {
  book: Book;
  setShowAddNote: Dispatch<SetStateAction<boolean>>;
  toggleAddNewNote: () => void;
};

export default function CurrentReadingBook(props: CurrentReadingBookProps) {
  const { book, setShowAddNote, toggleAddNewNote } = props;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Currently Reading
      </h2>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-start space-x-4">
          <img
            src={book.imageLinks.thumbnail}
            alt={book.title}
            className="w-20 h-28 object-cover rounded-lg shadow-md"
          />
          <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-800 mb-1">
              {book.title}
            </h3>
            {book.authors.map((author, index) => (
              <p key={index} className="text-gray-600 mb-3">
                {author}
              </p>
            ))}
            <div className="mb-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{book.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${book.progress}%` }}
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
  );
}
