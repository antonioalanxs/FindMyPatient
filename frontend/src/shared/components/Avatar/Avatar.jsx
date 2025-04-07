import { useContext } from "react";

import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { DEFAULT_INITIAL_LETTER } from "@/core/constants/default";

const Avatar = () => {
  const colors = ["bg-primary", "bg-danger", "bg-warning"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  const { user } = useContext(AuthenticationContext);

  const initialLetter = user?.first_name?.[0] || DEFAULT_INITIAL_LETTER;

  return (
    <span className={`avatar avatar-md2 ${color}`} role="img">
      <span className="avatar-content">{initialLetter}</span>
    </span>
  );
};

export default Avatar;
