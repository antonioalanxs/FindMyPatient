import { IonNavLink, IonText } from "@ionic/react";

/**
 * NavLink component. It displays a clickable link.
 *
 * @param {string} text Link text.
 * @param {React.Component} children Component to navigate to.
 *
 * @returns {JSX.Element} - The component.
 */
function NavLink({ text, children }) {
  return (
    <>
      <IonNavLink
        routerDirection="forward"
        component={() => children}
        style={{ cursor: "pointer" }}
      >
        <IonText color="primary" className="ion-text-center">
          <span
            style={{
              display: "block",
              fontWeight: "425",
            }}
          >
            {text}
          </span>
        </IonText>
      </IonNavLink>
    </>
  );
}

export default NavLink;
