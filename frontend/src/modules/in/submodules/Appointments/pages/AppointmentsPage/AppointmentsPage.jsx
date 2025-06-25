import { useContext } from "react";
import AuthenticationContext from "@/core/contexts/AuthenticationContext";
import { useTitle } from "@/core/hooks/useTitle";
import { appointmentService } from "@/core/services/AppointmentService";
import Header from "@/modules/in/components/Header/Header";
import GenericList from "@/shared/components/GenericList/GenericList";
import { appointmentAdapter } from "@/core/adapters/AppointmentAdapter";
import { ROUTES } from "@/core/constants/routes";
import { ROLES } from "@/core/constants/roles";

function AppointmentsPage() {
  useTitle({ title: "Appointments" });

  const { user } = useContext(AuthenticationContext);

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
          touch: {
            path: (id) =>
              user?.role !== ROLES.PATIENT &&
              ROUTES.IN.APPOINTMENTS.ABSOLUTE.DETAIL(id),
          },
        }}
      />
    </>
  );
}

export default AppointmentsPage;
