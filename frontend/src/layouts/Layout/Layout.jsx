import { IonContent } from "@ionic/react";

import { useLocation } from "@/hooks/useLocation";
import SideBar from "@/components/SideBar/SideBar";

import "@/layouts/Layout/Layout.styles.scss";

/**
 * Layout used for privated pages.
 *
 * @param {string} title - The title of the page.
 * @param {string} subtitle - The subtitle of the page.
 * @param {React.ReactNode} children - The children to render.
 */
function Layout({ title, subtitle, children }) {
  useLocation();

  return (
    <IonContent fullscreen={true}>
      <main>
        <SideBar />

        <header>
          <h2 className="fs-3 text-primary">{title}</h2>
          <p id="subtitle" className="text-secondary">
            {subtitle}
          </p>
        </header>

        <div>{children}</div>
      </main>
    </IonContent>
  );
}

export default Layout;
