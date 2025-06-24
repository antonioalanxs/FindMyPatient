import { useTitle } from "@/core/hooks/useTitle";
import Header from "@/modules/in/components/Header/Header";
import MedicalTestsList from "@/modules/in/components/MedicalTestsList/MedicalTestsList";

function MedicalTestsPage() {
  useTitle({ title: "Medical tests" });

  return (
    <>
      <Header
        title="Medical tests"
        subtitle="All of your medical tests are listed here."
      />

      <MedicalTestsList />
    </>
  );
}

export default MedicalTestsPage;
