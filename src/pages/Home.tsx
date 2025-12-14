import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import {
  bookOutline,
  trendingUpOutline,
  flameOutline,
  addCircleOutline,
  libraryOutline,
} from "ionicons/icons";
import { useState, useEffect } from "react";
import noxCharacter from "@/assets/nox-character.png";
import "./Home.css";

export default function Home() {
  const [greeting, setGreeting] = useState("");
  const [noxMessage, setNoxMessage] = useState("");
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
      setNoxMessage("Ready to start your reading journey today?");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
      setNoxMessage("Perfect time for some quiet reading...");
    } else {
      setGreeting("Good Evening");
      setNoxMessage("Let's unwind with a good book tonight.");
    }

    // Show message again after 3 seconds
    const timer = setTimeout(() => setShowMessage(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mock data - replace with actual data from database later
  const stats = {
    totalNotes: 25,
    sourcesCount: 8,
    thisWeekNotes: 7,
    readingStreak: 3,
    todayMinutes: 45,
    weeklyGoal: 300,
    weeklyProgress: 180,
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>QuietRead</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Nox's House Section */}
        <div className="nox-house">
          <div className="house-background">
            <div className="moon">🌙</div>
            <div className="stars">
              <span className="star">✨</span>
              <span className="star">✨</span>
              <span className="star">✨</span>
            </div>

            {/* Nox Character */}
            <div className="nox-container">
              <img
                src={noxCharacter}
                alt="Nox the Owl"
                className="nox-character"
              />

              {/* Speech Bubble */}
              {showMessage && (
                <div
                  className="speech-bubble"
                  onClick={() => setShowMessage(false)}
                >
                  <div className="greeting-text">{greeting}! 🦉</div>
                  <div className="message-text">{noxMessage}</div>
                </div>
              )}
            </div>

            {/* Perch/Branch */}
            <div className="perch"></div>
          </div>

          {/* Welcome Text */}
          <div className="welcome-section">
            <h1 className="welcome-title">Welcome to Your Reading Space</h1>
            <p className="welcome-subtitle">Nox is here to guide your journey</p>
          </div>
        </div>

        {/* Reading Statistics Dashboard */}
        <div className="stats-dashboard">
          <h2 className="section-title">Your Reading Journey</h2>

          {/* Primary Stats Grid */}
          <div className="primary-stats">
            <div className="stat-card streak-card">
              <div className="stat-icon">
                <IonIcon icon={flameOutline} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{stats.readingStreak} Days</div>
                <div className="stat-label">Reading Streak</div>
              </div>
            </div>

            <div className="stat-card notes-card">
              <div className="stat-icon">
                <IonIcon icon={bookOutline} />
              </div>
              <div className="stat-content">
                <div className="stat-value">{stats.totalNotes}</div>
                <div className="stat-label">Notes Saved</div>
              </div>
            </div>
          </div>

          {/* Weekly Progress Card */}
          <div className="progress-card">
            <div className="progress-header">
              <div className="progress-title">
                <IonIcon icon={trendingUpOutline} />
                <span>This Week</span>
              </div>
              <div className="progress-value">
                {stats.weeklyProgress} / {stats.weeklyGoal} min
              </div>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${(stats.weeklyProgress / stats.weeklyGoal) * 100}%`,
                }}
              ></div>
            </div>
            <div className="progress-details">
              <div className="detail-item">
                <span className="detail-label">Today</span>
                <span className="detail-value">{stats.todayMinutes} min</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">New Notes</span>
                <span className="detail-value">{stats.thisWeekNotes}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Sources</span>
                <span className="detail-value">{stats.sourcesCount}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <button className="action-button primary">
              <IonIcon icon={addCircleOutline} />
              <span>Add Note</span>
            </button>
            <button className="action-button secondary">
              <IonIcon icon={libraryOutline} />
              <span>Add Source</span>
            </button>
          </div>

          {/* Nox's Tip */}
          <div className="nox-tip">
            <div className="tip-icon">💡</div>
            <div className="tip-content">
              <div className="tip-title">Nox's Tip</div>
              <div className="tip-text">
                Reading before bed can improve sleep quality and reduce stress.
                Try reading for 15 minutes tonight!
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
