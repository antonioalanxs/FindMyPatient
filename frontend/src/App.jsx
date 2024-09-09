import { IonNav } from "@ionic/react";

import Login from "@/components/pages/Login/Login";

function App() {
  return (
    <IonNav
      root={() => <Login />}
      style={{ maxWidth: "640px", marginInline: "auto" }}
    />
  );
}

export default App;
