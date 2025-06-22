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
          view: {
            path: (id) => ROUTES.IN.APPOINTMENTS.ABSOLUTE.DETAIL(id),
          },
          edit: {
            path: (id) => ROUTES.IN.APPOINTMENTS.ABSOLUTE.EDIT(id),
          },
          delete: {
            action: (id) => appointmentService.cancel(id),
            tooltip: "Cancel",
            icon: (
              <i className="d-inline-block mt-1 bi bi-x-circle text-primary"></i>
            ),
            verb: "cancel",
          },
        }}
      />
    </>
  );
}

export default AppointmentsPage;
