import { useTitle } from "@/core/hooks/useTitle";
import Header from "@/modules/in/components/Header/Header";
import TreatmentsList from "@/modules/in/components/TreatmentsList/TreatmentsList";

function TreatmentsPage() {
  useTitle({ title: "Treatments" });

  return (
    <>
      <Header
        title="Treatments"
        subtitle="All of your medical treatments are listed here."
      />

      <TreatmentsList />
    </>
  );
}

export default TreatmentsPage;
