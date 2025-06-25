import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";

const Map = ({ position, path, address }) => {
  const Center = ({ center }) => {
    const map = useMap();

    useEffect(() => {
      map.setView(center, map.getZoom());
    }, [center, map]);

    return null;
  };

  return (
    <MapContainer
      center={position}
      zoom={16}
      whenCreated={(map) => map.zoomControl.setPosition("topright")}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution="&copy; OpenStreetMap &copy; CARTO"
      />

      <Marker
        position={position}
        icon={
          new L.divIcon({
            html: '<div class="real-time-marker"></div>',
            className: "",
          })
        }
      />

      <Center center={position} />

      <Polyline
        positions={path}
        pathOptions={{ color: "blue", weight: 4, opacity: 0.5 }}
      />

      <div
        className="position-absolute left-0 bottom-0 m-2 py-3 px-4 pe-none card border-0 shadow-smmap-card"
        style={{ zIndex: 400 }}
      >
        <h5 className="mb-2 fs-6">{address}</h5>
        <h6 className="text-secondary fw-normal">{position.join(", ")}</h6>
      </div>
    </MapContainer>
  );
};

export default Map;
