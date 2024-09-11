import { IonNav } from "@ionic/react";

import Login from "@/pages/Login/Login";
import { AuthenticationProvider } from "@/contexts/AuthenticationContext";

function App() {
  return (
    <AuthenticationProvider>
      <IonNav
        root={() => <Login />}
        style={{ maxWidth: "640px", marginInline: "auto" }}
      />
    </AuthenticationProvider>
  );
}

export default App;
