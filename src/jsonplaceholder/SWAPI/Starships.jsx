import useRequestData from "../../hooks/useRequestData";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";

export default function Starship() {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    makeRequest("https://swapi.dev/api/starships/?page=" + currentPage);
  }, [currentPage]);

  return (
    <div className="max-w-7xl m-auto text-center">
      <h1 className="text-center font-bold text-2xl m-5">SWAPI - Starships</h1>
      {error && <h2>Error...</h2>}

      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l m-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={!data?.previous}
      >
        Previous
      </button>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l m-1 rounded"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </button>

      <div  className="flex flex-wrap justify-center">
        {data &&
          data.results.map((ships, i) => (
            <div  className="w-80 rounded overflow-hidden shadow-lg m-2 px-6 py-4 border-2 border-t-indigo-500" key={"starship" + i}>
              <h2 className="text-center font-bold text-2xl m-5">{ships.name}</h2>
              <ul>
                <li>{ships.model}</li>
                <li>
                  {new Date(ships.created).toLocaleString("da-DK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </li>
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
}
