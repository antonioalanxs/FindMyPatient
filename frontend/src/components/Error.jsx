import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonNavLink,
} from "@ionic/react";

import AnotherPage from "@/components/AnotherPage";

/**
 * Error component. It is displayed when an error occurs.
 *
 * @returns {JSX.Element} - The error component.
 */
function Error() {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>

          <IonTitle>Error</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">
        <div>Oops! An error occurred...</div>

        <IonNavLink routerDirection="forward" component={() => <AnotherPage />}>
          <IonButton>Go to Another page</IonButton>
        </IonNavLink>
      </IonContent>
    </>
  );
}

export default Error;
