import { useEffect } from "react";

import { BRAND_NAME } from "@/core/constants";

/**
 * Sets the title of the page.
 *
 * @param {Object} title - The title of the page.
 */
export const useTitle = ({ title }) => {
  useEffect(() => {
    document.title = title ? `${title} | ${BRAND_NAME}` : BRAND_NAME;
  }, [title]);
};
