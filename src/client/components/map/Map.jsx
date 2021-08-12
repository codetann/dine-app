import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import PopupMarker from "./PopupMarker";

export default function Map({ location, nearby }) {
  const { lat, long } = location;

  return (
    <MapContainer center={[lat, long]}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      >
        {nearby.map((b, i) => {
          <PopupMarker key={i} business={b} />;
        })}
      </TileLayer>
    </MapContainer>
  );
}
