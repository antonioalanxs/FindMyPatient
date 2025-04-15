import Spinner from "@/shared/components/Spinner/Spinner";
import Phrases from "@/shared/components/Load/Phrases/Phrases";

function Load({ center, classes }) {
  return (
    <div
      className={`d-flex flex-column gap-2_5 justify-content-center align-items-center ${
        center && "mt-7"
      } ${classes && classes}`}
    >
      <Spinner />
      <Phrases />
    </div>
  );
}

export default Load;
