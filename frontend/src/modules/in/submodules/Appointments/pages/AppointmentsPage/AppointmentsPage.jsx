import { useTitle } from "@/core/hooks/useTitle";
import { appointmentService } from "@/core/services/AppointmentService";
import Header from "@/modules/in/components/Header/Header";
import GenericList from "@/shared/components/GenericList/GenericList";
import { genericEntityAdapter } from "@/core/adapters/GenericEntityAdapter";
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
        adapter={genericEntityAdapter}
        actions={{
          search: {
            label: "Search for an appointment",
          },
          view: {
            path: (id) => ROUTES.IN.APPOINTMENTS.ABSOLUTE.DETAIL(id),
          },
          delete: {
            action: (id) => appointmentService.cancel(id),
          }
        }}
      />
    </>
  );
}

export default AppointmentsPage;
