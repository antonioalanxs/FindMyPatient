import { Route } from "react-router-dom";

import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";

import Index from "@/pages/Index/Index";
import Home from "@/pages/Home/Home";

function Router() {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" exact component={Index} />
        <Route path="/home" exact component={Home} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
}

export default Router;
