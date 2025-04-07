import { useTitle } from "@/core/hooks/useTitle";
import Header from "@/modules/error/components/Header/Header";

function Error403() {
  useTitle({ title: "403" });

  return (
    <Header
      title="Forbidden"
      subtitle="You are unauthorized to see this page."
    />
  );
}

export default Error403;
