import { IonIcon, IonToggle, IonButton } from "@ionic/react";
import { sparklesOutline, timeOutline, addCircleOutline } from "ionicons/icons";

export interface Ritual {
  id: number;
  name: string;
  time: string;
  duration: string;
  icon: string;
  description: string;
  isActive: boolean;
}

interface ReadingRitualsProps {
  rituals: Ritual[];
  onToggle: (id: number, checked: boolean) => void;
  onManage?: () => void;
  onCreate?: () => void;
}

export default function ReadingRituals({
  rituals,
  onToggle,
  onManage,
  onCreate,
}: ReadingRitualsProps) {
  return (
    <div className="ritual-section">
      <div className="section-header">
        <div className="header-title">
          <IonIcon icon={sparklesOutline} />
          <h2>Reading Rituals</h2>
        </div>
        <button className="manage-button" onClick={onManage}>
          Manage
        </button>
      </div>
      <p className="section-description">
        Build consistent reading habits with scheduled sessions
      </p>

      <div className="rituals-list">
        {rituals.map((ritual) => (
          <div
            key={ritual.id}
            className={`ritual-card ${ritual.isActive ? "active" : ""}`}
          >
            <div className="ritual-icon">{ritual.icon}</div>
            <div className="ritual-info">
              <h3 className="ritual-name">{ritual.name}</h3>
              <p className="ritual-description">{ritual.description}</p>
              <div className="ritual-schedule">
                <span className="schedule-time">
                  <IonIcon icon={timeOutline} />
                  {ritual.time}
                </span>
                <span className="schedule-duration">{ritual.duration}</span>
              </div>
            </div>
            <div className="ritual-toggle">
              <IonToggle
                checked={ritual.isActive}
                onIonChange={(e) => onToggle(ritual.id, e.detail.checked)}
              />
            </div>
          </div>
        ))}
      </div>

      <IonButton
        expand="block"
        className="create-ritual-button"
        onClick={onCreate}
      >
        <IonIcon icon={addCircleOutline} slot="start" />
        Create New Ritual
      </IonButton>
    </div>
  );
}
