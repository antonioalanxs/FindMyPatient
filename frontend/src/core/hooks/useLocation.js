import { useEffect } from "react";

import { WEB_SOCKET_TRACKING_URL } from "@/core/constants/api";
import { DEFAULT_DURATION } from "@/core/constants/default";
import { ROLES } from "@/core/constants/roles";

/**
 * Custom hook to send the location of a patient to the server recurrently.
 *
 * @param {Object} user Current user data.
 */
export const useLocation = ({ user }) => {
  const send = (webSocket) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        if (webSocket.readyState === WebSocket.OPEN) {
          webSocket.send(JSON.stringify({ latitude, longitude }));
        }
      },
      (error) => console.error(error) // TODO: Handle the error.
    );
  };

  useEffect(() => {
    if (user?.role !== ROLES.PATIENT) return;

    const webSocket = new WebSocket(
      WEB_SOCKET_TRACKING_URL(user?.user_id, user.primary_doctor_id)
    );

    let interval;

    webSocket.onopen = () => {
      send(webSocket);

      interval = setInterval(() => {
        send(webSocket);
      }, DEFAULT_DURATION);
    };

    return () => {
      clearInterval(interval);
      webSocket.close();
    };
  }, [user?.user_id, user?.primary_doctor_id, user?.role]);

  return null;
};
