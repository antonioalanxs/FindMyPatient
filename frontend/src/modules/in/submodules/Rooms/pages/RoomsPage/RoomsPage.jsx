import { useTitle } from "@/core/hooks/useTitle";
import { roomService } from "@/core/services/RoomService";
import { genericEntityAdapter } from "@/core/adapters/GenericEntityAdapter";
import Header from "@/modules/in/components/Header/Header";
import GenericList from "@/shared/components/GenericList/GenericList";
import { ROUTES } from "@/core/constants/routes";

function RoomsPage() {
  useTitle({ title: "Rooms" });

  return (
    <>
      <Header
        title="Rooms"
        subtitle="All of the rooms of the hospital are listed here."
      />

      <GenericList
        fetchService={roomService.rooms}
        adapter={genericEntityAdapter}
        actions={{
          search: {
            label: "Search for a room",
          },
          create: {
            link: {
              label: "Create a room",
              path: ROUTES.IN.ROOMS.ABSOLUTE.CREATE,
              icon: "bi-buildings-fill",
            },
          },
          view: {
            path: (id) => ROUTES.IN.ROOMS.ABSOLUTE.DETAIL(id),
          },
          edit: {
            path: (id) => ROUTES.IN.ROOMS.ABSOLUTE.EDIT(id),
          },
          delete: {
            action: (id) => roomService.destroy(id),
          },
        }}
      />
    </>
  );
}

export default RoomsPage;
