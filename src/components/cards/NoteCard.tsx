import {
  IonChip,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import {
  bookOutline,
  globeOutline,
  documentTextOutline,
} from "ionicons/icons";
import { NoteWithBook } from "../../models/note";
import "./NoteCard.css";

interface NoteCardProps {
  note: NoteWithBook;
  onClick?: () => void;
}

export default function NoteCard({ note, onClick }: NoteCardProps) {
  const getSourceIcon = (type: string) => {
    switch (type) {
      case "book":
        return bookOutline;
      case "blog":
        return globeOutline;
      case "article":
        return documentTextOutline;
      default:
        return bookOutline;
    }
  };

  const getSourceColor = (type: string) => {
    switch (type) {
      case "book":
        return "primary";
      case "blog":
        return "success";
      case "article":
        return "warning";
      default:
        return "medium";
    }
  };

  return (
    <div className="note-card" onClick={onClick}>
      {note.imageUrl && (
        <div className="note-card-image">
          <img src={note.imageUrl} alt={note.bookTitle} />
        </div>
      )}
      <div className="note-card-content">
        <div className="note-card-header">
          <IonChip className="note-chip" color={getSourceColor(note.sourceType || "book")}>
            <IonIcon icon={getSourceIcon(note.sourceType || "book")} />
            <IonLabel>{note.sourceType || "book"}</IonLabel>
          </IonChip>
          {note.page && (
            <IonChip className="note-chip page-chip">
              <IonLabel>p. {note.page}</IonLabel>
            </IonChip>
          )}
        </div>
        <div className="note-card-source">{note.bookTitle}</div>
        <h3 className="note-card-title">{note.title}</h3>
        <p className="note-card-text">{note.content}</p>
        {note.tags && note.tags.length > 0 && (
          <div className="note-card-tags">
            {note.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div className="note-card-date">
          {new Date(note.createdAt).toLocaleDateString()} •{" "}
          {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
