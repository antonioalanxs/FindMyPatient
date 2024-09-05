import { IonNav } from "@ionic/react";

import HelloWorld from "@/components/HelloWorld";

/**
 * The application component. This is the entry point of the application.
 *
 * @returns {JSX.Element} - The entry point of the application.
 */
function App() {
  return <IonNav root={() => <HelloWorld />} />;
}

export default App;
