import { useState } from "react";
import { Link } from "react-router-dom";

import { notificationService } from "@/core/services/NotificationService";
import { datePipe } from "@/core/pipes/datePipe";
import { genderPipe } from "@/core/pipes/genderPipe";
import { phoneNumberPipe } from "@/core/pipes/phoneNumberPipe";
import Load from "@/shared/components/Load/Load";
import BaseCard from "@/shared/components/BaseCard/BaseCard";
import { ROUTES } from "@/core/constants/routes";
import { userService } from "@/core/services/UserService";
import { countryPipe } from "@/core/pipes/countryPipe";

function PatientSheetPage({ user }) {
  const [patient, setPatient] = useState(user);

  return patient ? (
    <>
      <div className="row">
        <div className="col">
          <BaseCard title="Basic Information">
            <form className="row gy-3">
              <div className="col-sm-6 form-group">
                <label htmlFor="first_name" className="form-label">
                  First name
                </label>
                <p className="form-control-static">{patient?.first_name}</p>
              </div>

              <div className="col-sm-6 form-group">
                <label htmlFor="last_name" className="form-label">
                  Last name
                </label>
                <p className="form-control-static">{patient?.last_name}</p>
              </div>

              <div className="col-sm-6 form-group">
                <label htmlFor="identity_card_number" className="form-label">
                  Identity card number
                </label>
                <p className="form-control-static">
                  {patient?.identity_card_number}
                </p>
              </div>

              <div className="col-sm-6 form-group">
                <label htmlFor="birth_date" className="form-label">
                  Date of birth
                </label>
                <p className="form-control-static">
                  {datePipe.transform(
                    patient?.birth_date,
                    datePipe.OPTIONS.SHORT
                  )}
                </p>
              </div>

              <div className="col-sm-6 form-group">
                <label htmlFor="gender" className="form-label">
                  Gender
                </label>
                <p className="form-control-static">
                  {genderPipe.transform(patient?.gender)}
                </p>
              </div>

              <div className="col-sm-6 form-group">
                <label htmlFor="nationality" className="form-label">
                  Nationality
                </label>
                <p className="form-control-static">
                  {countryPipe.transform(patient?.nationality)}
                </p>
              </div>
            </form>
          </BaseCard>

          <BaseCard title="Contact Information">
            <form className="row gy-3">
              <div className="col-sm-4 form-group">
                <label htmlFor="social_security_code" className="form-label">
                  Social security code
                </label>
                <p className="form-control-static">
                  {patient?.patient?.social_security_code}
                </p>
              </div>

              <div className="col-sm-4 form-group">
                <label htmlFor="phone_number" className="form-label">
                  Phone
                </label>
                <p className="form-control-static">
                  {phoneNumberPipe.transform(patient?.phone_number)}
                </p>
              </div>

              <div className="col-sm-4 form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <p className="form-control-static truncate">{patient?.email}</p>
              </div>
            </form>
          </BaseCard>

          <BaseCard title="Address">
            <form className="row gy-3">
              <div className="col-sm-6 form-group">
                <label htmlFor="street" className="form-label">
                  Street
                </label>
                <p className="form-control-static">
                  {patient?.patient?.address?.street}
                </p>
              </div>

              <div className="col-sm-6 form-group">
                <label htmlFor="number" className="form-label">
                  Number
                </label>
                <p className="form-control-static">
                  {patient?.patient?.address?.number}
                </p>
              </div>

              <div className="col-sm-6 form-group">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <p className="form-control-static">
                  {patient?.patient?.address?.city}
                </p>
              </div>

              <div className="col-sm-6 form-group">
                <label htmlFor="zip_code" className="form-label">
                  Postal code
                </label>
                <p className="form-control-static">
                  {patient?.patient?.address?.zip_code}
                </p>
              </div>

              <div className="col-sm-6 form-group">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <p className="form-control-static">
                  {countryPipe.transform(patient?.patient?.address?.country)}
                </p>
              </div>
            </form>
          </BaseCard>
        </div>
      </div>

      <div className="row justify-content-end">
        <div className="col d-flex gap-3 flex-column flex-sm-row justify-content-sm-end">
          <button
            className="btn btn-danger"
            onClick={() => {
              notificationService.showConfirmDialog(
                "Really delete this patient?",
                "This action could be irreversible.",
                async () =>
                  await userService.destroy(patient?.id).then(() => {
                    navigate(ROUTES.IN.PATIENTS.BASE);
                  })
              );
            }}
          >
            <i className="me-2 bi bi-trash"></i>
            <span>Delete patient</span>
          </button>

          <Link
            to={ROUTES.IN.PATIENTS.ABSOLUTE.EDIT(patient?.id)}
            className="btn btn-primary"
          >
            <i className="me-2 bi bi-pencil"></i>
            <span>Edit patient</span>
          </Link>
        </div>
      </div>
    </>
  ) : (
    <Load />
  );
}

export default PatientSheetPage;
