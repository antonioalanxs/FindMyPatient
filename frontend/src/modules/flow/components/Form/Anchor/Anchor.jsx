import { Link } from "react-router-dom";

function Anchor({ link, text }) {
  return (
    <Link
      to={link}
      className="d-block text-center fs-5 fw-bold text-decoration-none"
    >
      {text}
    </Link>
  );
}

export default Anchor;
