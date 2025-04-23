import { useTitle } from "@/core/hooks/useTitle";
import Header from "@/modules/in/components/Header/Header";

function AppointmentsPage() {
  useTitle({ title: "Appointments" });

  return (
    <>
      <Header
        title="Appointments"
        subtitle="All of your appointments are listed here."
      />
    </>
  );
}

export default AppointmentsPage;
