import Spinner from "@/core/components/Spinner/Spinner";
import Phrases from "@/core/components/Phrases/Phrases";

import { MESSAGES } from "@/core/constants/messages";

function Load({ large }) {
  return (
    <div
      className="d-flex gap-3 flex-column justify-content-center align-items-center"
      style={{
        marginBottom: "-.75rem",
      }}
    >
      <Spinner large={large} primary />
      <Phrases large={large} phrases={MESSAGES.LOADING} />
    </div>
  );
}

export default Load;
