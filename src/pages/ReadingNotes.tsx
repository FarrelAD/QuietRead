import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonChip,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import {
  add,
  bookOutline,
  globeOutline,
  documentTextOutline,
} from "ionicons/icons";
import { useState } from "react";
import { NoteWithBook } from "../models/note";
import "./ReadingNotes.css";

type SourceType = "all" | "book" | "blog" | "article";

export default function ReadingNotes() {
  // Mock data - will be replaced with actual CRUD operations
  const [notes, setNotes] = useState<NoteWithBook[]>([
    {
      id: 1,
      bookTitle: "Clean Code",
      title: "Functions should do one thing",
      content:
        "Functions should do one thing. They should do it well. They should do it only.",
      page: 35,
      createdAt: new Date().toISOString(),
      sourceType: "book",
      tags: ["functions", "best-practices"],
      imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200",
    },
    {
      id: 2,
      bookTitle: "Understanding React Hooks - Dev.to",
      title: "useState basics",
      content:
        "useState is a Hook that lets you add React state to function components.",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      sourceType: "blog",
      tags: ["react", "hooks"],
      url: "https://dev.to/react-hooks",
    },
    {
      id: 3,
      bookTitle: "The Future of AI in Software Development",
      title: "AI in code generation",
      content:
        "AI-powered tools are revolutionizing how developers write and review code.",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      sourceType: "article",
      tags: ["ai", "development"],
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=200",
    },
  ]);

  const [showAddNote, setShowAddNote] = useState<boolean>(false);
  const [searchText, setSearchText] = useState("");
  const [selectedSource, setSelectedSource] = useState<SourceType>("all");

  const filteredNotes = notes.filter((note) => {
    const matchesType =
      selectedSource === "all" || note.sourceType === selectedSource;
    const matchesSearch =
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.content.toLowerCase().includes(searchText.toLowerCase()) ||
      note.bookTitle.toLowerCase().includes(searchText.toLowerCase());
    return matchesType && matchesSearch;
  });

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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Reading Notes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="ion-padding">
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value!)}
            placeholder="Search..."
            className="custom-searchbar"
            searchIcon={undefined}
          />

          <IonSegment
            value={selectedSource}
            onIonChange={(e) =>
              setSelectedSource(e.detail.value as SourceType)
            }
          >
            <IonSegmentButton value="all">
              <IonLabel>All</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="book">
              <IonLabel>Books</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="blog">
              <IonLabel>Blogs</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="article">
              <IonLabel>Articles</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <div className="ion-margin-top">
            {filteredNotes.map((note) => (
              <div key={note.id} className="note-card" onClick={() => {}}>
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
                    {new Date(note.createdAt).toLocaleDateString()} • {" "}
                    {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <IonFab slot="fixed" vertical="bottom" horizontal="end" className="custom-fab">
          <IonFabButton onClick={() => setShowAddNote(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        {/* TODO: Create new AddNewNote modal component for multi-source notes */}
        {showAddNote && <div>Add Note Modal - To be implemented</div>}
      </IonContent>
    </IonPage>
  );
}
