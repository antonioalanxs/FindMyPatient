import { Link } from "react-router-dom";

import TooltipTrigger from "@/shared/components/Tooltip/TooltipTrigger/TooltipTrigger";

function Header({ title, subtitle, link }) {
  return (
    <>
      <header className="ms-1 mb-4_75 d-flex gap-4 align-items-center">
        {link && (
          <TooltipTrigger tooltip="Go back">
            <Link to={link} className="text-decoration-none">
              <i className="bi bi-arrow-left fs-4"></i>
            </Link>
          </TooltipTrigger>
        )}

        <div>
          <h3 className="fs-3" dangerouslySetInnerHTML={{ __html: title }}></h3>

          {subtitle && (
            <p className={`${!link && "mt-1"} text-subtitle text-muted`}>
              {subtitle}
            </p>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
