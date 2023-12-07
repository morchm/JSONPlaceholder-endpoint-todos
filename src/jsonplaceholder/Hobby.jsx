import Error from "../components/Error";
import Loader from "../components/Loader";
import useRequestData from "../hooks/useRequestData";
import { useEffect, useState } from "react";

export default function Hobby() {
  const { makeRequest, isLoading, data, error } = useRequestData();

  return (
    <div>
      {/* ---------- START ---------- */}
      <h1 className="text-center font-bold text-2xl m-5">HOBBYER</h1>
      {isLoading && <Loader />}
      {error && <Error />}

      
    </div>
  );
}
