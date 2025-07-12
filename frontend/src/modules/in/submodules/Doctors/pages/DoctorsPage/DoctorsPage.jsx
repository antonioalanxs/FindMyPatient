import { useTitle } from "@/core/hooks/useTitle";
import { userService } from "@/core/services/UserService";
import { userAdapter } from "@/core/adapters/UserAdapter";
import Header from "@/modules/in/components/Header/Header";
import GenericList from "@/shared/components/GenericList/GenericList";
import { ROUTES } from "@/core/constants/routes";
import { doctorService } from "@/core/services/DoctorService";

function DoctorsPage() {
  useTitle({ title: "Doctors" });

  return (
    <>
      <Header title="Doctors" subtitle="All of the doctors are listed here." />

      <GenericList
        fetchService={doctorService.doctors}
        adapter={userAdapter}
        actions={{
          search: {
            label: "Search for a doctor",
          },
          view: {
            path: (id) => ROUTES.IN.DOCTORS.ABSOLUTE.DETAIL(id),
          },
          create: {
            link: {
              label: "Create a doctor",
              path: ROUTES.IN.DOCTORS.ABSOLUTE.CREATE,
              icon: "bi-people-fill",
            },
          },
          edit: {
            path: (id) => ROUTES.IN.DOCTORS.ABSOLUTE.EDIT(id),
          },
          delete: {
            action: (id) => userService.destroy(id),
          },
        }}
      />
    </>
  );
}

export default DoctorsPage;
