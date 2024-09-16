import { usePrivateRouteGuard } from "@/hooks/guards/usePrivateRouteGuard";
import { useTitle } from "@/hooks/useTitle";
import Layout from "@/layouts/Layout/Layout";

function Home() {
  const user = usePrivateRouteGuard();

  useTitle({ title: "Home" });

  return (
    <Layout>
      <div>Home</div>

      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

      {user && <pre>{JSON.stringify(user)}</pre>}
    </Layout>
  );
}

export default Home;
