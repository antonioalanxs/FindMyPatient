import "@/modules/in/components/Header/Header.styles.scss";

function Header({ title, subtitle }) {
  return (
    <>
      <h2 className="fs-3 text-primary">{title}</h2>
      <p className="text-secondary">{subtitle}</p>
    </>
  );
}

export default Header;
