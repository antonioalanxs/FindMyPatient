import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useTitle } from "@/core/hooks/useTitle";
import { groupService } from "@/core/services/GroupService";
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
    groupService
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
        title="Visualize a group (role)"
        subtitle="Here you can visualize a group (role)."
        link={ROUTES.IN.GROUPS.BASE}
      />

      {loading ? (
        <Load />
      ) : (
        <div className="row">
          <div className="col-lg-9 col-xxl-7">
            <BaseCard>
              <form className="row gy-3">
                <div className="col-sm-6 form-group">
                  <label htmlFor="id" className="form-label">
                    ID
                  </label>
                  <p id="id" className="form-control-static">
                    {group?.id}
                  </p>
                </div>

                <div className="col-sm-6 form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <p id="name" className="form-control-static">
                    {textPipe.transform(group?.name)}
                  </p>
                </div>
              </form>

              <div className="mt-3 row justify-content-end">
                <div className="col d-flex gap-3 flex-column flex-sm-row justify-content-sm-end">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      notificationService.showConfirmDialog(
                        "Really delete this role (group)?",
                        "This action could be irreversible.",
                        async () =>
                          await groupService.destroy(id).then(() => {
                            navigate(ROUTES.IN.GROUPS.BASE);
                          })
                      );
                    }}
                  >
                    <i className="me-2 bi bi-trash"></i>
                    <span>Delete group</span>
                  </button>

                  <Link
                    to={ROUTES.IN.GROUPS.ABSOLUTE.EDIT(id)}
                    className="btn btn-primary"
                  >
                    <i className="me-2 bi bi-pencil"></i>
                    <span>Edit group</span>
                  </Link>
                </div>
              </div>
            </BaseCard>
          </div>
        </div>
      )}
    </>
  );
}

export default GroupPage;
