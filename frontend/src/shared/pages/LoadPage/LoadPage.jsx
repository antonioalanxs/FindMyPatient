import Load from "@/shared/components/Load/Load";
import Theme from "@/shared/components/Theme/Theme";
import { BRAND_NAME } from "@/core/constants/brand";

function LoadPage() {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ zIndex: 9999 }}
    >
      <div className="d-none">
        <Theme />
      </div>

      <h1 className="d-none">{BRAND_NAME}</h1>

      <Load />
    </div>
  );
}

export default LoadPage;
