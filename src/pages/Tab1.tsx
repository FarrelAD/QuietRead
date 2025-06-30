import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { CameraComponent } from "../components/CameraComponent";
import { BookInfo } from "../components/BookInfo";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <CameraComponent />

        <hr />

        <BookInfo />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
