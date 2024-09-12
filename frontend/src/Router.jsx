import { Route } from "react-router-dom";

import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";

import Index from "@/pages/Index/Index";
import Home from "@/pages/Home/Home";
import PasswordResetRequest from "@/pages/PasswordResetRequest/PasswordResetRequest";

function Router() {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" exact component={Index} />
        <Route path="/home" exact component={Home} />
        <Route path="/reset" exact component={PasswordResetRequest} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
}

export default Router;
