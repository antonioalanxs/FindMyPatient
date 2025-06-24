import { useTitle } from "@/core/hooks/useTitle";
import { appointmentService } from "@/core/services/AppointmentService";
import Header from "@/modules/in/components/Header/Header";
import GenericList from "@/shared/components/GenericList/GenericList";
import { appointmentAdapter } from "@/core/adapters/AppointmentAdapter";
import { ROUTES } from "@/core/constants/routes";

function AppointmentsPage() {
  useTitle({ title: "Appointments" });

  return (
    <>
      <Header
        title="Appointments"
        subtitle="All of your appointments are listed here."
      />

      <GenericList
        fetchService={appointmentService.appointments}
        adapter={appointmentAdapter}
        actions={{
          search: {
            label: "Search for an appointment",
          },
          edit: {
            path: (id) => ROUTES.IN.APPOINTMENTS.ABSOLUTE.EDIT(id),
          },
        }}
      />
    </>
  );
}

export default AppointmentsPage;
