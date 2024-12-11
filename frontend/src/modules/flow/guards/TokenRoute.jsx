import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { authenticationService } from "@/core/services/AuthenticationService";
import { notificationService } from "@/core/services/NotificationService";
import Spinner from "@/core/components/Spinner/Spinner";
import { ROUTES } from "@/core/constants/routes";
import { DEFAULT_MESSAGE } from "@/core/constants/messages";

const TokenRoute = ({ children }) => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authenticationService
      .isResetPasswordTokenValid(token)
      .then((response) => {
        response?.data?.is_reset_password_token_valid || navigate(ROUTES.ERROR);
      })
      .catch(() => {
        navigate(ROUTES.ERROR);
        notificationService.showToast(
          DEFAULT_MESSAGE,
          notificationService.ICONS.ERROR
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return loading ? (
    <div className="d-flex flex-column align-items-center justify-content-center gap-3 mt-5">
      <Spinner large primary />
      <p className="fs-5 text-secondary text-center">
        Checking your credentials. Please wait...
      </p>
    </div>
  ) : (
    children
  );
};

export default TokenRoute;
