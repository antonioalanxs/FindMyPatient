import { IonImg } from "@ionic/react";

/**
 * Logo component. It displays the logo of the application.
 *
 * @param {string} maximumWidth Maximum width of the logo. Default is "500px".
 *
 * @returns {JSX.Element} - The component.
 */
function Logo({ maximumWidth = "500px" }) {
  return (
    <h1
      style={{
        maxWidth: maximumWidth,
        cursor: "pointer",
        pointerEvents: "none",
      }}
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

export default Logo;
