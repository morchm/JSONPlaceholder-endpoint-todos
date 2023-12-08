import Error from "../../components/Error";
import Loader from "../../components/Loader";
import useRequestData from "../../hooks/useRequestData";
import { useEffect, useState } from "react";

export default function Facts() {
  const { makeRequest, isLoading, data, error } = useRequestData();

  const handleSubmit = e => {
    let limit = 3;

    makeRequest(
      "https://facts-by-api-ninjas.p.rapidapi.com/v1/facts?limit=" + limit,
      "GET",
      null,
      {
        "X-RapidAPI-Key": "05f10d1657msh9ee107d4bd0bdebp1ba22fjsn4b725733d903",
        "X-RapidAPI-Host": "facts-by-api-ninjas.p.rapidapi.com",
      }
    );
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="max-w-7xl m-auto">
      <h1 className="text-center font-bold text-2xl m-5">Få facts</h1>
      {isLoading && <Loader />}
      {error && <Error />}

      <div className="flex flex-col justify-center">
        {data && data.map(data => <li className="my-2 text-center">{data.fact}</li>)}
        <button
          className="w-64 bg-gray-300 hover:bg-gray-500 rounded mx-2 p-1 my-2 text-center self-center"
          onClick={handleSubmit}>
          Nye facts
        </button>
      </div>
    </div>
  );
}
