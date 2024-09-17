import { usePrivateRouteGuard } from "@/hooks/guards/usePrivateRouteGuard";
import { useTitle } from "@/hooks/useTitle";
import Layout from "@/layouts/Layout/Layout";

function Home() {
  const user = usePrivateRouteGuard();

  useTitle({ title: "Home" });

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
      title={`${getGreeting()}, ${user.first_name}!`}
      subtitle="Here is everything you need to get started."
    >
      {user && <pre>{JSON.stringify(user)}</pre>}
    </Layout>
  );
}

export default Home;
