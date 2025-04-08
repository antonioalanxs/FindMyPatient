import { useTitle } from "@/core/hooks/useTitle";
import { medicalSpecialtiesService } from "@/core/services/MedicalSpecialtiesService";
import { medicalSpecialtiesAdapter } from "@/core/adapters/MedicalSpecialtiesAdapter";
import Header from "@/modules/in/components/Header/Header";
import GenericList from "@/shared/components/GenericList/GenericList";
import { ROUTES } from "@/core/constants/routes";

function MedicalSpecialtiesPage() {
  useTitle({ title: "Medical specialties" });

  return (
    <>
      <Header
        title="Medical specialties"
        subtitle="All of the medical specialties are listed here."
      />

      <GenericList
        fetchService={medicalSpecialtiesService.medicalSpecialties}
        adapter={medicalSpecialtiesAdapter}
        actions={{
          search: {
            label: "Search a specialty",
          },
          create: {
            link: {
              label: "Create a specialty",
              path: ROUTES.IN.MEDICAL_SPECIALTIES.ABSOLUTE.CREATE,
              icon: "bi-diagram-2-fill",
            },
          },
          view: {
            path: (id) => ROUTES.IN.MEDICAL_SPECIALTIES.ABSOLUTE.DETAIL(id),
          },
          edit: {
            path: (id) => ROUTES.IN.MEDICAL_SPECIALTIES.ABSOLUTE.EDIT(id),
          },
          delete: {
            action: (id) => medicalSpecialtiesService.destroy(id),
          },
        }}
      />
    </>
  );
}

export default MedicalSpecialtiesPage;
