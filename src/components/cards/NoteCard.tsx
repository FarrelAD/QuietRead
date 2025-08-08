import { BookOpen, Calendar } from "lucide-react";
import Note from "../../interfaces/note";
import Book from "../../interfaces/book";

type NoteCard = {
  note: Note;
  book: Book;
};

export function NoteCard(props: NoteCard) {
  const { note, book } = props;

  return (
    <div
      key={note.id}
      className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-800">{note.title}</h3>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          <span>{note.dateCreated}</span>
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-3 leading-relaxed">
        {note.content}
      </p>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-600">{book.title}</span>
        </div>
        {note.page && (
          <span className="text-xs text-gray-500">Page {note.page}</span>
        )}
      </div>
    </div>
  );
}
