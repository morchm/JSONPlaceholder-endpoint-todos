import React from "react";
import { useEffect, useRef } from "react";
import L, { marker } from "leaflet";
import "Leaflet/dist/leaflet.css";
import { LuBrush } from "react-icons/lu";

export default function LeafletMap({
  coord = [56, 10],
  info = "Her er du",
  setLat = null,
  setLon = null,
}) {
  const mapRef = useRef(); //Reference/krog til mappet
  const markerRef = useRef();

  //Indlæs map/kort
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("mapcontainer").setView(coord, 13);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      //Lav markør - overvej at lave if/hvis der er "info" send med så skal popup være der - og ellers ikke
      markerRef.current = L.marker(coord).addTo(mapRef.current).bindPopup(info);
    } else {
      mapRef.current.setView(coord, 13);
      markerRef.current.setLatLng(coord);

      if (setLat || setLon) {
        mapRef.current.on("click", e => {
          setLat(e.latlng.lat);
          setLon(e.latlng.lng);
        }
        );
      }
    }
  }, [coord]);

  return (
    <div id="mapcontainer" style={{ width: "500px", height: "500px" }}>
      Kortet loader....
    </div>
  );
}
