import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { notificationService } from "@/core/services/NotificationService";
import TooltipTrigger from "@/shared/components/Tooltip/TooltipTrigger/TooltipTrigger";
import TrashIcon from "@/shared/icons/TrashIcon/TrashIcon";
import EyeIcon from "@/shared/icons/EyeIcon/EyeIcon";
import PencilIcon from "@/shared/icons/PencilIcon/PencilIcon";
import { sort } from "@/core/utilities/structures";

const ORDER = {
  ASCENDENT: "\t▲",
  DESCENDENT: "\t▼",
};

const Table = ({
  data = [],
  showID = false,
  actions = null,
  onDelete,
  striped = false,
}) => {
  const columns =
    data.length > 0
      ? Object.keys(data[0])
          .filter((key) => showID || !/^id$/i.test(key))
          .map((key) => ({
            header: key,
            field: key,
          }))
      : [];

  const [sortedColumn, setSortedColumn] = useState(null);
  const [order, setOrder] = useState(ORDER.ASCENDENT);
  const containerReference = useRef(null);

  const sortedData = useMemo(() => {
    if (!sortedColumn) return data;

    const sorted = [...data].sort((a, b) =>
      sort(a[sortedColumn], b[sortedColumn])
    );

    return order === ORDER.ASCENDENT ? sorted : sorted.reverse();
  }, [data, sortedColumn, order]);

  const handleSort = (columnField) => {
    if (sortedColumn === columnField) {
      setOrder((previousOrder) =>
        previousOrder === ORDER.ASCENDENT ? ORDER.DESCENDENT : ORDER.ASCENDENT
      );
    } else {
      setSortedColumn(columnField);
      setOrder(ORDER.ASCENDENT);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      !containerReference?.current?.contains(event?.target) &&
        setSortedColumn(null) &&
        setOrder(ORDER.ASCENDENT);
    };

    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("touchend", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("touchend", handleClickOutside, true);
    };
  }, []);

  const hasData = sortedData?.length > 0;

  const handleDeleteClick = (id) => {
    notificationService.showConfirmDialog(
      `Really ${actions?.delete?.verb ? actions?.delete?.verb : "delete"}?`,
      "This action could be irreversible.",
      async () =>
        await actions?.delete
          ?.action(id)
          .then(() => {
            onDelete && onDelete();
          })
          .catch((error) => {
            notificationService.showToast(
              error?.response?.data?.detail || "Something went wrong.",
              notificationService.TYPE.ERROR
            );
          })
    );
  };

  const navigate = useNavigate();

  return (
    <div ref={containerReference} className="table-responsive border rounded">
      <table className={`table table-hover mb-0 ${striped && "table-striped"}`}>
        <thead className="text-nowrap cursor-pointer">
          <tr>
            {columns.map((column, index) => (
              <th
                className="px-4"
                key={index}
                onClick={() => handleSort(column.field)}
              >
                {column.header}
                {sortedColumn === column.field && <span>{order}</span>}
              </th>
            ))}

            {hasData && (actions?.view || actions?.edit || actions?.delete) && (
              <th className="px-4">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="text-nowrap">
          {hasData ? (
            sortedData.map((item, index) => (
              <tr
                key={index}
                className={actions?.touch && "cursor-pointer"}
                onClick={() =>
                  actions?.touch?.path &&
                  navigate(actions?.touch?.path(item?.id || item?.ID))
                }
              >
                {columns.map(({ field }, index_) => (
                  <td
                    className="px-4"
                    key={index_}
                    dangerouslySetInnerHTML={{ __html: item[field] || "" }}
                  />
                ))}

                {(actions?.view || actions?.edit || actions?.delete) && (
                  <td className="px-4 d-flex gap-4 align-items-center">
                    {actions?.view && (
                      <TooltipTrigger tooltip="View">
                        <Link to={actions?.view?.path(item?.id || item?.ID)}>
                          <EyeIcon />
                        </Link>
                      </TooltipTrigger>
                    )}

                    {actions?.edit && (
                      <TooltipTrigger tooltip="Edit">
                        <Link to={actions?.edit?.path(item?.id || item?.ID)}>
                          <PencilIcon />
                        </Link>
                      </TooltipTrigger>
                    )}

                    {actions?.delete && (
                      <TooltipTrigger
                        tooltip={
                          actions?.delete?.tooltip
                            ? actions?.delete?.tooltip
                            : "Delete"
                        }
                      >
                        <div
                          role="button"
                          onClick={() =>
                            handleDeleteClick(item?.id || item?.ID)
                          }
                        >
                          {actions?.delete?.icon ? (
                            actions?.delete?.icon
                          ) : (
                            <TrashIcon />
                          )}
                        </div>
                      </TooltipTrigger>
                    )}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={1} className="text-center">
                There is no data.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
