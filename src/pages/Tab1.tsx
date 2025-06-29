import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Ionic</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <img src="https://placebear.com/300/200" alt="Bear" />
          <IonCardContent>
            <IonCardHeader>
              <IonCardTitle>Card title</IonCardTitle>
            </IonCardHeader>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
