import { useEffect } from "react";

import { BRAND_NAME } from "@/core/constants/brand";

export const useTitle = ({ title }) => {
  useEffect(() => {
    document.title = title ? `${title} | ${BRAND_NAME}` : BRAND_NAME;
  }, [title]);
};
