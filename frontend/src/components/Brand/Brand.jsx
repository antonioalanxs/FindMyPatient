import { IonImg } from "@ionic/react";

/**
 * Displays the logo of the application.
 *
 * @param {string} maximumWidth Maximum width of the logo. Default is "500px".
 *
 * @returns {JSX.Element} - The component.
 */
function Brand({ maximumWidth = "325px" }) {
  return (
    <h1
      style={{
        maxWidth: maximumWidth,
        marginInline: "auto",
        cursor: "pointer",
        pointerEvents: "none",
      }}
      className="ion-text-center"
    >
      <IonImg
        src="/logo.webp"
        alt="Logo"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </h1>
  );
}

export default Brand;
