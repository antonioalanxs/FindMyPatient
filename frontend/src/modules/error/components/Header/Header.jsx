function Header({ title, subtitle }) {
  return (
    <>
      <h2 className="mb-3">{title}</h2>
      <p className="mw-65ch mx-auto text-center mb-4 fs-5 text-subtitle text-muted">
        {subtitle}
      </p>
    </>
  );
}

export default Header;
