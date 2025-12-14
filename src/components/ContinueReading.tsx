import { IonIcon } from "@ionic/react";
import { bookmarkOutline, timeOutline, bookOutline, playCircleOutline } from "ionicons/icons";

interface ContinueReadingProps {
  title: string;
  author: string;
  progress: number;
  lastRead: string;
  currentPage: string;
  totalNotes: number;
  onContinue?: () => void;
}

export default function ContinueReading({
  title,
  author,
  progress,
  lastRead,
  currentPage,
  totalNotes,
  onContinue,
}: ContinueReadingProps) {
  return (
    <div className="continue-reading-card">
      <div className="card-header">
        <div className="header-title">
          <IonIcon icon={bookmarkOutline} />
          <span>Continue Reading</span>
        </div>
        <div className="progress-badge">{progress}%</div>
      </div>

      <div className="reading-content">
        <div className="book-info">
          <div className="book-icon">📖</div>
          <div className="book-details">
            <h3 className="book-title">{title}</h3>
            <p className="book-author">by {author}</p>
            <div className="reading-meta">
              <span className="meta-item">
                <IonIcon icon={timeOutline} />
                {lastRead}
              </span>
              <span className="meta-item">
                <IonIcon icon={bookOutline} />
                {currentPage}
              </span>
              <span className="meta-item">{totalNotes} notes</span>
            </div>
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <button className="continue-button" onClick={onContinue}>
          <IonIcon icon={playCircleOutline} />
          <span>Continue Reading</span>
        </button>
      </div>
    </div>
  );
}
