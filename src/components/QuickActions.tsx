import { IonIcon } from "@ionic/react";
import { addCircleOutline, libraryOutline } from "ionicons/icons";

interface QuickActionsProps {
  onAddNote?: () => void;
  onAddSource?: () => void;
}

export default function QuickActions({ onAddNote, onAddSource }: QuickActionsProps) {
  return (
    <div className="quick-actions">
      <button className="action-button primary" onClick={onAddNote}>
        <IonIcon icon={addCircleOutline} />
        <span>Add Note</span>
      </button>
      <button className="action-button secondary" onClick={onAddSource}>
        <IonIcon icon={libraryOutline} />
        <span>Add Source</span>
      </button>
    </div>
  );
}
