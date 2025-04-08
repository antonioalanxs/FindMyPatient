import { useTitle } from "@/core/hooks/useTitle";
import { administratorService } from "@/core/services/AdministratorService";
import { userAdapter } from "@/core/adapters/UserAdapter";
import Header from "@/modules/in/components/Header/Header";
import GenericList from "@/shared/components/GenericList/GenericList";
import { ROUTES } from "@/core/constants/routes";

function AdministratorsPage() {
  useTitle({ title: "Administrators" });

  return (
    <>
      <Header
        title="Administrators"
        subtitle="All of the administrators are listed here."
      />

      <GenericList
        fetchService={administratorService.administrators}
        adapter={userAdapter}
        actions={{
          search: {
            label: "Search for an administrator",
          },
          view: {
            path: (id) => ROUTES.IN.ADMINISTRATORS.ABSOLUTE.DETAIL(id),
          },
          create: {
            link: {
              label: "Create an administrator",
              path: ROUTES.IN.ADMINISTRATORS.ABSOLUTE.CREATE,
              icon: "bi-person-fill-add",
            },
          },
          edit: {
            path: (id) => ROUTES.IN.ADMINISTRATORS.ABSOLUTE.EDIT(id),
          },
          delete: {
            action: (id) => patientService.destroy(id),
          },
        }}
      />
    </>
  );
}

export default AdministratorsPage;
