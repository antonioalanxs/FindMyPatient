import { useTitle } from "@/core/hooks/useTitle";
import { databaseExportService } from "@/core/services/DatabaseExportService";
import Header from "@/modules/in/components/Header/Header";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import { EXCEL_EXTENSION, JSON_EXTENSION } from "@/core/constants/api";

function DatabaseExportPage() {
  useTitle({ title: "Export Database" });

  const handleExport = async (extension) => {
    const response = await databaseExportService.export(extension);

    const URI = URL.createObjectURL(
      new Blob([response.data], {
        type: response.headers["content-type"],
      })
    );
    const anchor = document.createElement("a");

    anchor.href = URI;
    anchor.download = `database.${extension}`;

    anchor.click();

    URL.revokeObjectURL(URI);
  };

  return (
    <>
      <Header
        title="Export Database"
        subtitle="Here you can easily export the database to a file for in-depth statistical analysis."
      />

      <div className="row">
        <div className="col-12 col-md-8 col-lg-7 col-xxl-6">
          <BaseCard
            title="Formats"
            subtitle="Select the format you want to export the database to."
          >
            <div className="mb-4 d-flex flex-column gap-3">
              <p>
                If you are an <strong>administrator</strong>, the exported file
                will contain <strong>all the data</strong> from the database,
                giving you full access to every record.
              </p>
              <p>
                If you are a <strong>doctor</strong>, the exported file will
                include <strong>only the data related to you</strong>, so you
                will see information limited to your own activities and
                patients.
              </p>
              <p>
                Make sure to handle this data responsibly and in compliance with
                privacy regulations.
              </p>
            </div>

            <div className="d-flex flex-column flex-md-row gap-3">
              <button
                className="btn btn-success"
                onClick={() => handleExport(EXCEL_EXTENSION)}
              >
                <i className="me-2 mt-1 bi bi-filetype-xlsx"></i>
                <span className="fw-semibold">{`Export to ${EXCEL_EXTENSION.toUpperCase()}`}</span>
              </button>

              <button
                className="btn btn-warning"
                onClick={() => handleExport(JSON_EXTENSION)}
              >
                <i className="me-2 mt-1 bi bi-filetype-json text-black"></i>
                <span className="fw-semibold text-black">{`Export to ${JSON_EXTENSION.toUpperCase()}`}</span>
              </button>
            </div>
          </BaseCard>
        </div>
      </div>
    </>
  );
}

export default DatabaseExportPage;
