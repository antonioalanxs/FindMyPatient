import { IonContent, IonPage } from "@ionic/react";

function Layout({ children }) {
  return (
    <IonPage>
      <IonContent fullscreen={true}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: -10,
            height: "100%",
            width: "100%",
            backgroundColor: "#f2f7ff",
            backgroundImage:
              "linear-gradient(to right, #e3e3e3, transparent 1px), linear-gradient(to bottom, #e3e3e3, transparent 1px)",
            backgroundSize: "6rem 4rem",
          }}
          aria-label="Background"
          aria-hidden="true"
        ></div>

        <div
          className="ion-padding"
          style={{
            marginInline: "auto",
            maxWidth: "500px",
          }}
          aria-label="Wrapper"
          aria-hidden="true"
        >
          {children}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Layout;
