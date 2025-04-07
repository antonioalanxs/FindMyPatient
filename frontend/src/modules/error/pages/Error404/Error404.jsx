import { useTitle } from "@/core/hooks/useTitle";
import Header from "@/modules/error/components/Header/Header";

function Error404() {
  useTitle({ title: "404" });

  return (
    <Header
      title="Oops! An error has occurred…"
      subtitle="The page or the resource you are interacting with is not available. Please, check the URI or try again later."
    />
  );
}

export default Error404;
