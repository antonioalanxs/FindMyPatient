import { useEffect } from "react";

import { usePrivateRouteGuard } from "@/hooks/guards/usePrivateRouteGuard";
import { useTitle } from "@/hooks/useTitle";
import Layout from "@/layouts/Layout/Layout";
import Map from "@/components/Map/Map";

function Home() {
  const user = usePrivateRouteGuard();

  useTitle({ title: "Home" });

  useEffect(() => {
    const f = () => {
      const url = `ws://localhost:8000/ws/WebSocket-server`;

      console.log(url);

      const webSocket = new WebSocket(url);

      webSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
      };
    };

    f();
  }, []);

  /**
   * Get the greeting message based on the current time.
   *
   * @returns {string} The greeting message
   */
  function getGreeting() {
    const hours = new Date().getHours();

    if (hours < 12) {
      return "Good morning";
    } else if (hours < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }

  return (
    <Layout
      title={`${getGreeting()}, ${user?.first_name}!`}
      subtitle="Here is everything you need to get started."
    >
      {user && (
        <p className="text-success text-truncate">{JSON.stringify(user)}</p>
      )}

      <Map />
    </Layout>
  );
}

export default Home;
