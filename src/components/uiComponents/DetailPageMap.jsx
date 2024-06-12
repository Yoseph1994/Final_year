"use client";
import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerIcon from "../../../node_modules/leaflet/dist/images/marker-icon.png";
import MarkerShadow from "../../../node_modules/leaflet/dist/images/marker-shadow.png";
import { useEffect } from "react";

const FitBounds = ({ startCoords, endCoords }) => {
  const map = useMap();

  useEffect(() => {
    const bounds = [
      [startCoords[0], startCoords[1]],
      [endCoords[0], endCoords[1]],
    ];
    map.fitBounds(bounds);
  }, [map, startCoords, endCoords]);

  return null;
};
function DetailPageMap({ endLocation: endCoords, position: startCoords }) {
  return (
    <div>
      <MapContainer style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          icon={
            new L.Icon({
              iconUrl: MarkerIcon.src,
              iconRetinaUrl: MarkerIcon.src,
              iconSize: [25, 41],
              iconAnchor: [12.5, 41],
              popupAnchor: [0, 41],
              shadowUrl: MarkerShadow.src,
              shadowSize: [41, 41],
            })
          }
          position={startCoords}
        >
          <Popup>Start location</Popup>
        </Marker>

        <Marker
          icon={
            new L.Icon({
              iconUrl: MarkerIcon.src,
              iconRetinaUrl: MarkerIcon.src,
              iconSize: [25, 41],
              iconAnchor: [12.5, 41],
              popupAnchor: [0, 41],
              shadowUrl: MarkerShadow.src,
              shadowSize: [41, 41],
            })
          }
          position={endCoords}
        >
          <Popup>end location</Popup>
        </Marker>

        <FitBounds startCoords={startCoords} endCoords={endCoords} />
      </MapContainer>
    </div>
  );
}

export default DetailPageMap;
