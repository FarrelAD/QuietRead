import { BookOpen, Calendar } from "lucide-react";
import { NoteWithBook } from "../../models/note";
import { formatDatetimeToDateString } from "../../helpers/DateFormat";

export function NoteCard(props: { noteWithBook: NoteWithBook }) {
  const { noteWithBook } = props;

  return (
    <div
      key={noteWithBook.id}
      className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-800">{noteWithBook.title}</h3>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <span>{formatDatetimeToDateString(noteWithBook.createdAt)}</span>
          <Calendar className="h-3 w-3" />
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-3 leading-relaxed">
        {noteWithBook.content}
      </p>
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-4 w-4 text-gray-400" />
          <span className="text-xs text-gray-600">{noteWithBook.title}</span>
        </div>
        {noteWithBook.page && (
          <span className="text-xs text-gray-500">Page {noteWithBook.page}</span>
        )}
      </div>
    </div>
  );
}
