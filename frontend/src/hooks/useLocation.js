import { useEffect } from "react";

import { storageService } from "@/services/StorageService";
import { ROLES, DEFAULT_DURATION } from "@/constants";

/**
 * Custom hook to send the location of a patient to the server recurrently.
 */
export const useLocation = () => {
  function locate() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const webSocket = new WebSocket(
          `ws://localhost:8000/ws/tracking/channel/doctor/${4}/patient/${5}`
        );

        webSocket.onopen = () => {
          webSocket.send(
            JSON.stringify({
              latitude,
              longitude,
            })
          );
        };
      },
      (error) => {}
    );
  }

  async function send() {
    const user = await storageService.get(storageService.USER);

    if (user?.role === ROLES.PATIENT) {
      const interval = setInterval(() => {
        locate();
      }, DEFAULT_DURATION);

      return () => clearInterval(interval);
    }
  }

  useEffect(() => {
    send();
  }, []);
};
