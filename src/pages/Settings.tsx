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
  IonListHeader,
} from "@ionic/react";
import { 
  moonOutline, 
  notificationsOutline, 
  downloadOutline, 
  trashOutline,
  informationCircleOutline 
} from "ionicons/icons";
import { useState, useContext } from "react";
import { DarkModeContext } from "../App";

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

      <IonContent fullscreen>
        <IonList>
          <IonListHeader>
            <IonLabel>Appearance</IonLabel>
          </IonListHeader>
          
          <IonItem>
            <IonIcon icon={moonOutline} slot="start" />
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle
              checked={darkMode}
              onIonChange={toggleDarkMode}
            />
          </IonItem>

          <IonItem>
            <IonLabel>Default View</IonLabel>
            <IonSelect
              value={defaultView}
              onIonChange={(e) => setDefaultView(e.detail.value)}
            >
              <IonSelectOption value="all">All Sources</IonSelectOption>
              <IonSelectOption value="book">Books Only</IonSelectOption>
              <IonSelectOption value="blog">Blogs Only</IonSelectOption>
              <IonSelectOption value="article">Articles Only</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonListHeader>
            <IonLabel>Notifications</IonLabel>
          </IonListHeader>

          <IonItem>
            <IonIcon icon={notificationsOutline} slot="start" />
            <IonLabel>Enable Notifications</IonLabel>
            <IonToggle
              checked={notifications}
              onIonChange={(e) => setNotifications(e.detail.checked)}
            />
          </IonItem>

          <IonListHeader>
            <IonLabel>Data Management</IonLabel>
          </IonListHeader>

          <IonItem button>
            <IonIcon icon={downloadOutline} slot="start" />
            <IonLabel>Export Data</IonLabel>
          </IonItem>

          <IonItem button lines="none">
            <IonIcon icon={trashOutline} slot="start" color="danger" />
            <IonLabel color="danger">Clear All Data</IonLabel>
          </IonItem>

          <IonListHeader>
            <IonLabel>About</IonLabel>
          </IonListHeader>

          <IonItem button>
            <IonIcon icon={informationCircleOutline} slot="start" />
            <IonLabel>
              <h2>Version</h2>
              <p>1.0.0</p>
            </IonLabel>
          </IonItem>

          <IonItem lines="none">
            <IonLabel className="ion-text-center ion-padding">
              <p style={{ fontSize: '14px', color: 'var(--ion-color-medium)' }}>
                Made with ❤️ for better reading notes
              </p>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
}