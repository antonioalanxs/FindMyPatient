import { useTitle } from "@/core/hooks/useTitle";
import WelcomeCard from "@/modules/in/submodules/Home/components/WelcomeCard/WelcomeCard";

function HomePage() {
  useTitle({ title: "Home" });

  return <WelcomeCard />;
}

export default HomePage;
