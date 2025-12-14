import { IonIcon } from "@ionic/react";
import { trendingUpOutline } from "ionicons/icons";

interface WeeklyProgressProps {
  weeklyProgress: number;
  weeklyGoal: number;
  todayMinutes: number;
  thisWeekNotes: number;
  sourcesCount: number;
}

export default function WeeklyProgress({
  weeklyProgress,
  weeklyGoal,
  todayMinutes,
  thisWeekNotes,
  sourcesCount,
}: WeeklyProgressProps) {
  const progressPercentage = (weeklyProgress / weeklyGoal) * 100;

  return (
    <div className="progress-card">
      <div className="progress-header">
        <div className="progress-title">
          <IonIcon icon={trendingUpOutline} />
          <span>This Week</span>
        </div>
        <div className="progress-value">
          {weeklyProgress} / {weeklyGoal} min
        </div>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <div className="progress-details">
        <div className="detail-item">
          <span className="detail-label">Today</span>
          <span className="detail-value">{todayMinutes} min</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">New Notes</span>
          <span className="detail-value">{thisWeekNotes}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Sources</span>
          <span className="detail-value">{sourcesCount}</span>
        </div>
      </div>
    </div>
  );
}
