import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
} from "@ionic/react";
import { 
  moonOutline, 
  notificationsOutline, 
  downloadOutline, 
  trashOutline,
  informationCircleOutline,
} from "ionicons/icons";
import { useState, useContext } from "react";
import { DarkModeContext } from "../App";
import SettingsItem from "@/components/SettingsItem";
import SettingsSection from "@/components/SettingsSection";
import "./Settings.css";

export default function Settings() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [notifications, setNotifications] = useState(true);

  const handleExportData = () => {
    // TODO: Implement export functionality
    console.log("Exporting data...");
  };

  const handleClearData = () => {
    // TODO: Implement clear data with confirmation dialog
    console.log("Clearing data...");
  };

  const handleVersionClick = () => {
    // TODO: Show app info or changelog
    console.log("Version info clicked");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonList lines="none" className="settings-list">
          {/* Appearance Section */}
          <SettingsSection title="Appearance">
            <SettingsItem
              icon={moonOutline}
              iconColor="#3880ff"
              iconBackground="#3880ff15"
              title="Dark Mode"
              description="Toggle dark theme"
              type="toggle"
              checked={darkMode}
              onToggle={toggleDarkMode}
            />
          </SettingsSection>

          {/* Notifications Section */}
          <SettingsSection title="Notifications">
            <SettingsItem
              icon={notificationsOutline}
              iconColor="#ffc409"
              iconBackground="#ffc40915"
              title="Enable Notifications"
              description="Receive reading reminders"
              type="toggle"
              checked={notifications}
              onToggle={setNotifications}
            />
          </SettingsSection>

          {/* Data Management Section */}
          <SettingsSection title="Data Management">
            <SettingsItem
              icon={downloadOutline}
              iconColor="#2dd36f"
              iconBackground="#2dd36f15"
              title="Export Data"
              description="Download your notes"
              type="button"
              onClick={handleExportData}
            />
            <SettingsItem
              icon={trashOutline}
              iconColor="#eb445a"
              iconBackground="#eb445a15"
              title="Clear All Data"
              description="Delete all your notes"
              type="button"
              onClick={handleClearData}
            />
          </SettingsSection>

          {/* About Section */}
          <SettingsSection title="About">
            <SettingsItem
              icon={informationCircleOutline}
              iconColor="#92949c"
              iconBackground="#92949c15"
              title="Version"
              description="1.0.0"
              type="button"
              onClick={handleVersionClick}
            />
          </SettingsSection>

          {/* Footer */}
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--ion-color-medium)' }}>
            <p style={{ fontSize: '14px', margin: 0 }}>
              Made with ❤️ for better reading notes
            </p>
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  );
}