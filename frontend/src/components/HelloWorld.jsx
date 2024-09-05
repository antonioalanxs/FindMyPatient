import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonDatetime,
  IonProgressBar,
  IonAvatar,
  IonChip,
  IonLabel,
  IonButton,
  IonNavLink,
} from "@ionic/react";

import Error from "@/components/Error";

function HelloWorld() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hello, World!</IonTitle>
          <IonProgressBar type="indeterminate"></IonProgressBar>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">
        <IonDatetime></IonDatetime>

        <div>Hello, World!</div>

        <IonChip>
          <IonAvatar>
            <img
              alt="Silhouette of a person's head"
              src="https://ionicframework.com/docs/img/demos/avatar.svg"
            />
          </IonAvatar>
          <IonLabel>Chip Avatar</IonLabel>
        </IonChip>

        <IonNavLink routerDirection="forward" component={() => <Error />}>
          <IonButton>Go to Error page</IonButton>
        </IonNavLink>
      </IonContent>
    </>
  );
}

export default HelloWorld;
