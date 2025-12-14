import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import NoxOwl from "@/components/NoxOwl";
import ContinueReading from "@/components/ContinueReading";
import ReadingRituals, { Ritual } from "@/components/ReadingRituals";
import StatsCards from "@/components/StatsCards";
import WeeklyProgress from "@/components/WeeklyProgress";
import QuickActions from "@/components/QuickActions";
import NoxTip from "@/components/NoxTip";
import "./Home.css";

export default function Home() {
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

  // Mock current reading data
  const currentReading = {
    title: "Atomic Habits",
    author: "James Clear",
    type: "Book",
    progress: 65,
    lastRead: "2 hours ago",
    currentPage: "Chapter 12",
    totalNotes: 8,
  };

  // Mock ritual data
  const [rituals, setRituals] = useState<Ritual[]>([
    {
      id: 1,
      name: "Morning Wisdom",
      time: "07:00 AM",
      duration: "15 min",
      icon: "☀️",
      description: "Start your day with inspiring reads",
      isActive: true,
    },
    {
      id: 2,
      name: "Lunch Break Reading",
      time: "12:30 PM",
      duration: "20 min",
      icon: "📚",
      description: "Quick knowledge boost during lunch",
      isActive: false,
    },
    {
      id: 3,
      name: "Evening Wind Down",
      time: "09:00 PM",
      duration: "30 min",
      icon: "🌙",
      description: "Relax with your favorite book",
      isActive: true,
    },
  ]);

  const handleRitualToggle = (id: number, checked: boolean) => {
    setRituals(
      rituals.map((ritual) =>
        ritual.id === id ? { ...ritual, isActive: checked } : ritual
      )
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>QuietRead</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <NoxOwl />

        <div className="stats-dashboard">
          <h2 className="section-title">Your Reading Journey</h2>

          <ContinueReading
            title={currentReading.title}
            author={currentReading.author}
            progress={currentReading.progress}
            lastRead={currentReading.lastRead}
            currentPage={currentReading.currentPage}
            totalNotes={currentReading.totalNotes}
            onContinue={() => console.log("Continue reading")}
          />

          <ReadingRituals
            rituals={rituals}
            onToggle={handleRitualToggle}
            onManage={() => console.log("Manage rituals")}
            onCreate={() => console.log("Create ritual")}
          />

          <StatsCards
            readingStreak={stats.readingStreak}
            totalNotes={stats.totalNotes}
          />

          <WeeklyProgress
            weeklyProgress={stats.weeklyProgress}
            weeklyGoal={stats.weeklyGoal}
            todayMinutes={stats.todayMinutes}
            thisWeekNotes={stats.thisWeekNotes}
            sourcesCount={stats.sourcesCount}
          />

          <QuickActions
            onAddNote={() => console.log("Add note")}
            onAddSource={() => console.log("Add source")}
          />

          <NoxTip tip="Reading before bed can improve sleep quality and reduce stress. Try reading for 15 minutes tonight!" />
        </div>
      </IonContent>
    </IonPage>
  );
}
