import { useTitle } from "@/core/hooks/useTitle";
import { patientService } from "@/core/services/PatientService";
import { userAdapter } from "@/core/adapters/UserAdapter";
import Header from "@/modules/in/components/Header/Header";
import GenericList from "@/shared/components/GenericList/GenericList";
import { ROUTES } from "@/core/constants/routes";
import { userService } from "@/core/services/UserService";

function PatientsPage() {
  useTitle({ title: "Patients" });

  return (
    <>
      <Header
        title="Patients"
        subtitle="All of your patients are listed here."
      />

      <GenericList
        fetchService={patientService.patients}
        adapter={userAdapter}
        actions={{
          search: {
            label: "Search for a patient",
          },
          view: {
            path: (id) => ROUTES.IN.PATIENTS.ABSOLUTE.DETAIL(id),
          },
          create: {
            link: {
              label: "Create a patient",
              path: ROUTES.IN.PATIENTS.ABSOLUTE.CREATE,
              icon: "bi-person-fill-add",
            },
          },
          edit: {
            path: (id) => ROUTES.IN.PATIENTS.ABSOLUTE.DETAIL(id),
          },
          delete: {
            action: (id) => userService.destroy(id),
          },
        }}
      />
    </>
  );
}

export default PatientsPage;
