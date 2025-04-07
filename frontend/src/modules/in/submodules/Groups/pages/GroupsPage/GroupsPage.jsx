import { useTitle } from "@/core/hooks/useTitle";
import { groupsService } from "@/core/services/GroupsService";
import { groupsAdapter } from "@/core/adapters/GroupsAdapter";
import Header from "@/modules/in/components/Header/Header";
import CreateGroupCard from "@/modules/in/submodules/Groups/components/CreateGroupCard/CreateGroupCard";
import GenericList from "@/shared/components/GenericList/GenericList";
import { ROUTES } from "@/core/constants/routes";

function GroupsPage() {
  useTitle({ title: "Groups (roles)" });

  return (
    <>
      <Header
        title="Groups (roles)"
        subtitle="All of the groups (roles) are listed here."
      />

      <GenericList
        fetchService={groupsService.groups}
        adapter={groupsAdapter}
        showID={true}
        actions={{
          search: {
            label: "Search a group",
          },
          create: {
            component: (onCreate) => (
              <div className="row gx-0">
                <div className="col-lg-8 col-xl-6">
                  <CreateGroupCard onCreate={onCreate} />
                </div>
              </div>
            ),
          },
          view: {
            path: (id) => ROUTES.IN.GROUPS.ABSOLUTE.DETAIL(id),
          },
          edit: {
            path: (id) => ROUTES.IN.GROUPS.ABSOLUTE.EDIT(id),
          },
          delete: {
            action: (id) => groupsService.destroy(id),
          },
        }}
      />
    </>
  );
}

export default GroupsPage;
