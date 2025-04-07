import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useTitle } from "@/core/hooks/useTitle";
import { groupsService } from "@/core/services/GroupsService";
import { notificationService } from "@/core/services/NotificationService";
import { textPipe } from "@/core/pipes/textPipe";
import Load from "@/shared/components/Load/Load";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import { ROUTES } from "@/core/constants/routes";

function GroupPage() {
  useTitle({ title: "Group (role)" });

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    setLoading(true);
    groupsService
      .group(id)
      .then(({ data }) => {
        setGroup(data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const navigate = useNavigate();

  return (
    <>
      <Header
        title="Visualize a group"
        subtitle="Here you can visualize a group (role)."
        link={ROUTES.IN.GROUPS.BASE}
      />

      {loading ? (
        <Load />
      ) : (
        <div className="row gx-4 gy-4">
          <div className="col-12 col-xl-9">
            <BaseCard
              title="Detail"
              subtitle="Detailed information about this group (role) and its properties."
            >
              <div className="row">
                <div className="col-md-6 form-group">
                  <label htmlFor="id">ID</label>
                  <p id="id" className="form-control-static">
                    {group?.id}
                  </p>
                </div>

                <div className="col-md-6 form-group">
                  <label htmlFor="name">Name</label>
                  <p id="name" className="form-control-static">
                    {textPipe.transform(group?.name)}
                  </p>
                </div>
              </div>
            </BaseCard>
          </div>

          <div className="col-12 col-xl-3">
            <BaseCard
              title="Actions"
              subtitle="You can edit or delete this group (role)."
            >
              <div className="d-flex flex-column gap-3 justify-content-center">
                <Link
                  to={ROUTES.IN.GROUPS.ABSOLUTE.EDIT(id)}
                  className="btn btn-primary"
                >
                  <i className="bi bi-pencil-square me-2"></i>
                  <span>Edit group</span>
                </Link>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    notificationService.showConfirmDialog(
                      "Really delete this role (group)?",
                      "This action could be irreversible.",
                      async () =>
                        await groupsService.destroy(id).then(() => {
                          navigate(ROUTES.IN.GROUPS.BASE);
                        })
                    );
                  }}
                >
                  <i className="bi bi-trash me-2"></i>
                  <span>Delete group</span>
                </button>
              </div>
            </BaseCard>
          </div>
        </div>
      )}
    </>
  );
}

export default GroupPage;
