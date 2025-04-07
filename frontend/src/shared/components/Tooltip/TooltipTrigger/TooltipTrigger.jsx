import { useState, useRef } from "react";
import ReactDOM from "react-dom";

import Tooltip from "@/shared/components/Tooltip/Tooltip/Tooltip";

const TooltipTrigger = ({ tooltip, tooltipOffsetTop = 10, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const triggerReference = useRef(null);

  const showTooltip = () => {
    if (triggerReference.current) {
      const rect = triggerReference.current.getBoundingClientRect();

      const left = rect.left + rect.width / 2;
      const top = rect.bottom + tooltipOffsetTop;

      setPosition({ left, top });
    }
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  return (
    <div
      ref={triggerReference}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      className="d-inline-block"
    >
      {children}
      {isVisible &&
        ReactDOM.createPortal(
          <Tooltip tooltip={tooltip} left={position.left} top={position.top} />,
          document.body
        )}
    </div>
  );
};

export default TooltipTrigger;
