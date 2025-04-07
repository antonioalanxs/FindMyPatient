import Spinner from "@/shared/components/Spinner/Spinner";
import Phrases from "@/shared/components/Load/Phrases/Phrases";

function Load({ center }) {
  return (
    <div
      className={`d-flex flex-column gap-2_5 justify-content-center align-items-center ${
        center && "mt-7"
      }`}
    >
      <Spinner />
      <Phrases />
    </div>
  );
}

export default Load;
