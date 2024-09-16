import { Link } from "react-router-dom";

import { IonContent } from "@ionic/react";

import "@/layouts/AuthenticationLayout/AuthenticationLayout.styles.scss";

import LogoIcon from "@/icons/LogoIcon/LogoIcon";

/**
 * Layout used for authentication-related pages.
 *
 * @param {string} title - The title of the page.
 * @param {string} subtitle - The subtitle of the page.
 * @param {React.ReactNode} children - The children to render.
 */
function AuthenticationLayout({ title, subtitle, children }) {
  return (
    <IonContent fullscreen={true}>
      <div id="authentication">
        <div className="row h-100">
          <div id="authentication-left" className="col-lg-6 col-xl-5 col-12">
            <Link to="/">
              <h1 className="authentication-logo">
                <LogoIcon />
              </h1>
            </Link>

            <h2 className="authentication-title">{title}</h2>
            <p className="authentication-subtitle mb-4">{subtitle}</p>

            {children}
          </div>

          <div
            id="authentication-right"
            className="col-lg-6 col-xl-7 d-none d-lg-block"
          ></div>
        </div>
      </div>
    </IonContent>
  );
}

export default AuthenticationLayout;
