import { IonSpinner } from "@ionic/react";

import { usePrivateRouteGuard } from "@/hooks/guards/usePrivateRouteGuard";
import { useTitle } from "@/hooks/useTitle";
import Layout from "@/components/Layout/Layout";

function Home() {
  const user = usePrivateRouteGuard();

  useTitle({ title: "Home" });

  return (
    <Layout>
      <div>Home</div>

      {user ? <pre>{JSON.stringify(user)}</pre> : <IonSpinner />}
    </Layout>
  );
}

export default Home;
