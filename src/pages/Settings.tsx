import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from "@ionic/react";
import { 
  moonOutline, 
  notificationsOutline, 
  downloadOutline, 
  trashOutline,
  informationCircleOutline,
  chevronForwardOutline 
} from "ionicons/icons";
import { useState, useContext } from "react";
import { DarkModeContext } from "../App";
import "./Settings.css";

export default function Settings() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [notifications, setNotifications] = useState(true);
  const [defaultView, setDefaultView] = useState('all');

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
          <div className="settings-section">
            <h3 className="section-title">Appearance</h3>
            
            <IonItem button className="setting-item">
              <div className="setting-icon-wrapper" style={{ background: '#3880ff15' }}>
                <IonIcon icon={moonOutline} style={{ color: '#3880ff' }} />
              </div>
              <IonLabel>
                <h2>Dark Mode</h2>
                <p>Toggle dark theme</p>
              </IonLabel>
              <IonToggle
                slot="end"
                checked={darkMode}
                onIonChange={toggleDarkMode}
              />
            </IonItem>
          </div>

          {/* Notifications Section */}
          <div className="settings-section">
            <h3 className="section-title">Notifications</h3>
            
            <IonItem button className="setting-item">
              <div className="setting-icon-wrapper" style={{ background: '#ffc40915' }}>
                <IonIcon icon={notificationsOutline} style={{ color: '#ffc409' }} />
              </div>
              <IonLabel>
                <h2>Enable Notifications</h2>
                <p>Receive reading reminders</p>
              </IonLabel>
              <IonToggle
                slot="end"
                checked={notifications}
                onIonChange={(e) => setNotifications(e.detail.checked)}
              />
            </IonItem>
          </div>

          {/* Data Management Section */}
          <div className="settings-section">
            <h3 className="section-title">Data Management</h3>
            
            <IonItem button className="setting-item">
              <div className="setting-icon-wrapper" style={{ background: '#2dd36f15' }}>
                <IonIcon icon={downloadOutline} style={{ color: '#2dd36f' }} />
              </div>
              <IonLabel>
                <h2>Export Data</h2>
                <p>Download your notes</p>
              </IonLabel>
              <IonIcon icon={chevronForwardOutline} slot="end" />
            </IonItem>

            <IonItem button className="setting-item">
              <div className="setting-icon-wrapper" style={{ background: '#eb445a15' }}>
                <IonIcon icon={trashOutline} style={{ color: '#eb445a' }} />
              </div>
              <IonLabel>
                <h2>Clear All Data</h2>
                <p>Delete all your notes</p>
              </IonLabel>
              <IonIcon icon={chevronForwardOutline} slot="end" />
            </IonItem>
          </div>

          {/* About Section */}
          <div className="settings-section">
            <h3 className="section-title">About</h3>
            
            <IonItem button className="setting-item">
              <div className="setting-icon-wrapper" style={{ background: '#92949c15' }}>
                <IonIcon icon={informationCircleOutline} style={{ color: '#92949c' }} />
              </div>
              <IonLabel>
                <h2>Version</h2>
                <p>1.0.0</p>
              </IonLabel>
              <IonIcon icon={chevronForwardOutline} slot="end" />
            </IonItem>
          </div>

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