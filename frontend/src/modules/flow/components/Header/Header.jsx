function Header({ title, subtitle }) {
  return (
    <>
      <h2 className="fs-1 text-primary">{title}</h2>
      <p className="fs-5 mb-4 text-secondary">{subtitle}</p>
    </>
  );
}

export default Header;
