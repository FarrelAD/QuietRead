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
        <IonToolbar>
          <IonSearchbar
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value!)}
            placeholder="Search notes..."
          />
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="ion-padding">
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
              <IonCard key={note.id} button>
                <IonCardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <IonChip color={getSourceColor(note.sourceType || "book")}>
                      <IonIcon icon={getSourceIcon(note.sourceType || "book")} />
                      <IonLabel className="text-xs">
                        {note.sourceType || "book"}
                      </IonLabel>
                    </IonChip>
                    {note.page && (
                      <IonChip color="medium">
                        <IonLabel className="text-xs">p. {note.page}</IonLabel>
                      </IonChip>
                    )}
                  </div>
                  <IonCardSubtitle className="text-xs mb-1">
                    {note.bookTitle}
                  </IonCardSubtitle>
                  <IonCardTitle className="text-base">{note.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <p className="text-sm text-gray-700 mb-3">{note.content}</p>
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {note.tags.map((tag, index) => (
                        <IonChip key={index} color="light" className="text-xs">
                          #{tag}
                        </IonChip>
                      ))}
                    </div>
                  )}
                  <div className="text-xs text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString()} at{" "}
                    {new Date(note.createdAt).toLocaleTimeString()}
                  </div>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
        </div>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
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
