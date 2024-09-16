import { IonContent } from "@ionic/react";

/**
 * Layout used for privated pages.
 *
 * @param {React.ReactNode} children - The children to render.
 */
function AuthenticationLayout({ children }) {
  return <IonContent fullscreen={true}>{children}</IonContent>;
}

export default AuthenticationLayout;
