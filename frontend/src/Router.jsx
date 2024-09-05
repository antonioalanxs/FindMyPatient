import { BrowserRouter, Routes, Route } from "react-router-dom";

import Error from "@/components/Error";
import HelloWorld from "@/components/HelloWorld";

/**
 * Main router.
 *
 * @returns {JSX.Element} - The main router.
 */
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HelloWorld />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
