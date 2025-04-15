import { useState, useEffect, useCallback } from "react";
import Load from "@/shared/components/Load/Load";
import {
  WEB_SOCKET_TRACKING_URL,
  WEB_SOCKET_TIMEOUT,
} from "@/core/constants/api";

import Map from "@/shared/components/Map/Map";
import { fetchAddress } from "@/core/utilities/address";

const MapServer = ({ patient, doctor }) => {
  const [position, setPosition] = useState(null);
  const [path, setPath] = useState([]);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(false);

  const server = useCallback(() => {
    setError(false);

    const webSocket = new WebSocket(WEB_SOCKET_TRACKING_URL(patient, doctor));

    let timeout;

    const resetTimeout = () => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        setError(true);
        webSocket.close();
      }, WEB_SOCKET_TIMEOUT);
    };

    webSocket.onopen = resetTimeout;

    webSocket.onmessage = async (event) => {
      resetTimeout();

      const { latitude, longitude } = JSON.parse(event.data);

      setPosition([latitude, longitude]);
      setPath((previousPath) => [...previousPath, [latitude, longitude]]);
      setAddress(await fetchAddress(latitude, longitude));
    };

    webSocket.onerror = () => {
      setError(true);
      webSocket.close();
    };

    return () => {
      if (timeout) clearTimeout(timeout);
      webSocket.close();
    };
  }, [patient, doctor]);

  useEffect(() => {
    server();
  }, [server]);

  if (error) {
    return (
      <>
        <div className="alert alert-warning" role="alert">
          <p className="truncate">
            It seems that the patient is not sharing its location.
          </p>
        </div>

        <div className="mt-3 row justify-content-end">
          <div className="col-sm-6 col-lg-4">
            <button
              type="submit"
              className="w-100 btn btn-primary"
              onClick={server}
            >
              <i className="me-2 bi bi-arrow-clockwise" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!position || !address) {
    return <Load classes="mb-2" />;
  }

  return <Map position={position} path={path} address={address} />;
};

export default MapServer;
