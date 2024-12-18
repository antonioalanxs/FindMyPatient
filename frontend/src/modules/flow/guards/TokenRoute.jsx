import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { authenticationService } from "@/core/services/AuthenticationService";
import { notificationService } from "@/core/services/NotificationService";
import Loading from "@/modules/loading/Loading";
import { ROUTES } from "@/core/constants/routes";
import { MESSAGES } from "@/core/constants/messages";

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
          MESSAGES.DEFAULT,
          notificationService.ICONS.ERROR
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  return loading ? <Loading /> : children;
};

export default TokenRoute;
