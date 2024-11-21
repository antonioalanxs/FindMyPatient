import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

const Map = () => {
  const [position, setPosition] = useState(null);
  const [path, setPath] = useState([]);
  const [zoom, setZoom] = useState(17);

  //   useEffect(() => {
  //     navigator.geolocation.getCurrentPosition(
  //       (location) => {
  //         const { latitude, longitude } = location.coords;
  //         setPosition([latitude, longitude]);
  //       },
  //       (error) => {
  //         alert(error);
  //       }
  //     );
  //   }, []);

  /**
   * Move the map to the center prop when it changes.
   *
   * @param {Object} center - The new center position.
   */
  const MoveMap = ({ center }) => {
    const map = useMap();

    useEffect(() => {
      map.setView(center, map.getZoom());
    }, [center, map]);
  };

  useEffect(() => {
    let currentPosition = { lat: 40.416775, lng: -3.70379 }; // Madrid, España

    const simulateMovement = () => {
      const moveLat = Math.random() * 0.001 - 0.0005;
      const moveLng = Math.random() * 0.001 - 0.0005;

      currentPosition = {
        lat: currentPosition.lat + moveLat,
        lng: currentPosition.lng + moveLng,
      };

      setPosition([currentPosition.lat, currentPosition.lng]);

      setPath((prevPath) => [
        ...prevPath,
        [currentPosition.lat, currentPosition.lng],
      ]);

      if (Math.random() < 0.1) {
        setZoom((prevZoom) =>
          Math.max(13, Math.min(19, prevZoom + (Math.random() < 0.5 ? -1 : 1)))
        );
      }
    };

    const interval = setInterval(simulateMovement, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card border-0">
      <div className="card-header pb-0">
        <h3 className="fs-5">Map</h3>
        <p className="text-secondary">Your current location in real time.</p>
      </div>

      <div className="card-body">
        {position ? (
          <div style={{ height: "500px" }}>
            <MapContainer
              center={position}
              zoom={zoom}
              style={{ height: "100%", width: "100%" }}
              whenCreated={(map) => map.zoomControl.setPosition("topright")}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />

              <MoveMap center={position} />

              <Marker position={position}>
                <Popup>You are here!</Popup>
              </Marker>

              <Polyline positions={path} color="blue" />
            </MapContainer>
          </div>
        ) : (
          <div className="d-flex justify-items-center flex-column align-items-center gap-2 mt-2">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>

            <p className="text-secondary">Fetching your location...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
