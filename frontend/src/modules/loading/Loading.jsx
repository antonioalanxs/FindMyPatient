import LogoIcon from "@/core/icons/LogoIcon/LogoIcon";

import Load from "@/core/components/Load/Load";

function Loading() {
  return (
    <div className="h-100 p-3 d-flex gap-5 flex-column align-items-center">
      <h1 className="mb-4">
        <LogoIcon />
      </h1>

      <Load large />
    </div>
  );
}

export default Loading;
