import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/react";

function AnotherPage() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>

          <IonTitle>Another page!</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">
        <div>Another page!</div>
      </IonContent>
    </>
  );
}

export default AnotherPage;
