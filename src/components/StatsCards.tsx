import { IonIcon } from "@ionic/react";
import { flameOutline, bookOutline } from "ionicons/icons";

interface StatsCardsProps {
  readingStreak: number;
  totalNotes: number;
}

export default function StatsCards({ readingStreak, totalNotes }: StatsCardsProps) {
  return (
    <div className="primary-stats">
      <div className="stat-card streak-card">
        <div className="stat-icon">
          <IonIcon icon={flameOutline} />
        </div>
        <div className="stat-content">
          <div className="stat-value">{readingStreak} Days</div>
          <div className="stat-label">Reading Streak</div>
        </div>
      </div>

      <div className="stat-card notes-card">
        <div className="stat-icon">
          <IonIcon icon={bookOutline} />
        </div>
        <div className="stat-content">
          <div className="stat-value">{totalNotes}</div>
          <div className="stat-label">Notes Saved</div>
        </div>
      </div>
    </div>
  );
}
