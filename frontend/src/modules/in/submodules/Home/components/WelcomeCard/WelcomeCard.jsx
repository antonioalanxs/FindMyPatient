import { useContext, useState, useEffect } from "react";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { DEFAULT_NAME } from "@/core/constants/default";

function WelcomeCard() {
  const { user } = useContext(AuthenticationContext);

  const [name, setName] = useState(user?.first_name || DEFAULT_NAME);
  const [greetings, setGreetings] = useState("Hello");
  const [message, setMessage] = useState("Hope you have a great session!");

  function initialize() {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) {
      setGreetings("Good morning");
      setMessage("May your day be full of energy and achievements!");
    } else if (currentHour >= 12 && currentHour < 20) {
      setGreetings("Good afternoon");
      setMessage(
        "May your afternoon be filled with productivity and satisfaction!"
      );
    } else {
      setGreetings("Good evening");
      setMessage("May your night be filled with peace and sweet dreams!");
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  return (
    <article className="card shadow-sm">
      <header className="px-4_5 py-5">
        <h3 className="mb-1">
          {greetings}, <span className="text-primary">{name}</span>
        </h3>
        <p className="text-subtitle">{message}</p>
      </header>
    </article>
  );
}

export default WelcomeCard;
