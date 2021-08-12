import React from "react";
import { Marker, Popup } from "react-leaflet";

export default function PopupMarker({ business }) {
  const { lat, long } = business.location;

  return (
    <Marker position={[lat, long]}>
      <Popup>{business.name}</Popup>
    </Marker>
  );
}
