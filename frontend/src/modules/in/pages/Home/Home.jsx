import { useContext } from "react";

import { useTitle } from "@/core/hooks/useTitle";
import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import Header from "@/modules/in/components/Header/Header";
import { greetingText } from "@/core/utilities/text";

function Home() {
  useTitle({ title: "Home" });

  const { user } = useContext(AuthenticationContext);

  return (
    <>
      <Header
        title={`${greetingText()}, ${user?.first_name}!`}
        subtitle="Here is everything you need to get started."
      />

      {user && (
        <p className="text-success text-truncate">{JSON.stringify(user)}</p>
      )}
    </>
  );
}

export default Home;
