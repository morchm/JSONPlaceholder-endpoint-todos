//For at vise forureningsgraden
import React from "react";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import useRequestData from "../../hooks/useRequestData";
import { useEffect, useState } from "react";
import LeafletMap from "./LeafletMap";

export default function Pollution() {
  const { makeRequest, isLoading, data, error } = useRequestData();

  const [lat, setLat] = useState(56)
  const [lon, setLon] = useState(15)

  useEffect(() => {
    makeRequest(
      "http://api.openweathermap.org/data/2.5/air_pollution?lat=" + lat +"&lon=" + lon + "&appid=ce9282584cfaaac68fda86f7e2e24f70"
    );
  }, [lat, lon]);

  return (
    <div className="max-w-7xl m-auto">
      <h1 className="text-3xl font-bold text-center my-6">
        Pollution/forurening ud fra klik/koordinator på Leaflet-map
      </h1>

      <div className="flex gap-3">
        <LeafletMap coord={[lat, lon]} info="Pollution" setLat={setLat} setLon={setLon}/>
        {data && (
          <ul className="mx-2">
            <li> co: {data.list[0].components.co}</li>
            <li> no: {data.list[0].components.no}</li>
            <li>
              no<sub>2</sub>: {data.list[0].components.no2}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
