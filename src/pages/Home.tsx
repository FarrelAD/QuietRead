import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonChip,
  IonLabel,
} from "@ionic/react";
import {
  timeOutline,
  trendingUpOutline,
} from "ionicons/icons";
import { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Home() {
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock data - replace with actual data from database later
  const stats = {
    totalNotes: 25,
    sourcesCount: 8,
    thisWeekNotes: 7,
    readingStreak: 3,
  };

  const recentActivity = [
    {
      id: "1",
      type: "book",
      title: "Clean Code",
      action: "Added 3 notes",
      time: "2 hours ago",
    },
    {
      id: "2",
      type: "blog",
      title: "React Best Practices",
      action: "New source added",
      time: "1 day ago",
    },
  ];

  const motivationalQuotes = [
    "Reading is to the mind what exercise is to the body. 📚",
    "The more that you read, the more things you will know. 🌟",
    "A book is a dream you hold in your hands. ✨",
    "Today a reader, tomorrow a leader. 🚀",
  ];

  const [quote] = useState(
    motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>NoteNest</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Hero Section with Character Greeting */}
        <div
          className="ion-padding"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "20px",
            color: "white",
            marginBottom: "20px",
          }}
        >
          {/* Lottie Animation - Reading Character */}
          <div style={{ width: "120px", height: "120px", margin: "0 auto" }}>
            <Player
              autoplay
              loop
              src="https://lottie.host/4c7c6c8c-8e4a-4c85-9c4e-2d8f3b5a1e9f/9KxqxqxqxQ.json"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              textAlign: "center",
              margin: "10px 0",
            }}
          >
            {greeting}!
          </h1>
          <p
            style={{
              textAlign: "center",
              opacity: 0.9,
              fontSize: "16px",
              margin: "10px 0 20px",
            }}
          >
            Ready to capture some brilliant ideas today?
          </p>

          {/* Quick Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "15px",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                {stats.totalNotes}
              </div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>Total Notes</div>
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                padding: "15px",
                borderRadius: "12px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                {stats.readingStreak} 🔥
              </div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>Day Streak</div>
            </div>
          </div>
        </div>

        {/* Motivational Quote Card */}
        <IonCard style={{ marginBottom: "20px", borderRadius: "16px" }}>
          <IonCardContent>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "40px", height: "40px", flexShrink: 0 }}>
                <Player
                  autoplay
                  loop
                  src="https://lottie.host/embed/dd8f2e9e-8c8d-4c9b-9b8e-3d4f5a6b7c8d/9KxqxqxqxQ.json"
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
              <p
                style={{
                  margin: 0,
                  fontStyle: "italic",
                  color: "#666",
                  flex: 1,
                }}
              >
                {quote}
              </p>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Quick Actions */}
        <div style={{ marginBottom: "20px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            Quick Actions
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "12px",
            }}
          >
            <IonButton
              expand="block"
              style={{
                height: "100px",
                "--border-radius": "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <div style={{ width: "40px", height: "40px" }}>
                  <Player
                    autoplay
                    loop
                    src="https://lottie.host/embed/a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6/AddNote.json"
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
                <span style={{ fontSize: "12px" }}>Add Note</span>
              </div>
            </IonButton>

            <IonButton
              expand="block"
              color="secondary"
              style={{
                height: "100px",
                "--border-radius": "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <div style={{ width: "40px", height: "40px" }}>
                  <Player
                    autoplay
                    loop
                    src="https://lottie.host/embed/b2c3d4e5-f6g7-8h9i-0j1k-l2m3n4o5p6q7/AddBook.json"
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
                <span style={{ fontSize: "12px" }}>Add Source</span>
              </div>
            </IonButton>
          </div>
        </div>

        {/* This Week Progress */}
        <IonCard style={{ borderRadius: "16px", marginBottom: "20px" }}>
          <IonCardHeader>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div style={{ width: "30px", height: "30px" }}>
                  <Player
                    autoplay
                    loop
                    src="https://lottie.host/embed/c3d4e5f6-g7h8-9i0j-1k2l-m3n4o5p6q7r8/Trophy.json"
                    style={{ height: "100%", width: "100%" }}
                  />
                </div>
                <IonCardTitle style={{ fontSize: "16px" }}>
                  This Week
                </IonCardTitle>
              </div>
              <IonChip color="success">
                <IonIcon icon={trendingUpOutline} />
                <IonLabel>+{stats.thisWeekNotes}</IonLabel>
              </IonChip>
            </div>
          </IonCardHeader>
          <IonCardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#666" }}>
                Notes created
              </span>
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                {stats.thisWeekNotes}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "14px", color: "#666" }}>
                Active sources
              </span>
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                {stats.sourcesCount}
              </span>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Recent Activity */}
        <div style={{ marginBottom: "80px" }}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "15px",
            }}
          >
            Recent Activity
          </h2>
          {recentActivity.length > 0 ? (
            recentActivity.map((activity) => (
              <IonCard
                key={activity.id}
                button
                style={{ marginBottom: "12px", borderRadius: "12px" }}
              >
                <IonCardContent>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "32px",
                        width: "48px",
                        height: "48px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#f0f0f0",
                        borderRadius: "12px",
                      }}
                    >
                      {activity.type === "book" ? "📚" : "🌐"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: "bold",
                          fontSize: "14px",
                          marginBottom: "4px",
                        }}
                      >
                        {activity.title}
                      </div>
                      <div style={{ fontSize: "12px", color: "#666" }}>
                        {activity.action}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        color: "#999",
                      }}
                    >
                      <IonIcon
                        icon={timeOutline}
                        style={{ fontSize: "14px" }}
                      />
                      <span style={{ fontSize: "12px" }}>{activity.time}</span>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  margin: "0 auto 20px",
                }}
              >
                <Player
                  autoplay
                  loop
                  src="https://lottie.host/embed/d4e5f6g7-h8i9-0j1k-2l3m-n4o5p6q7r8s9/EmptyState.json"
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
              <p style={{ color: "#999", fontSize: "14px" }}>
                No activity yet! Start by adding your first note 📝
              </p>
            </div>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}
