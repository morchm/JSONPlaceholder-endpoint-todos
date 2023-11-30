import useRequestData from "../hooks/useRequestData";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

export default function Starship() {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    makeRequest("https://swapi.dev/api/starships/?page=" + currentPage);
  }, [currentPage]);

  return (
    <>
      <h1>SWAPI - Starships</h1>
      {error && <h2>Error...</h2>}

      <button onClick={()=> setCurrentPage(currentPage - 1)} disabled={ !data?.previous }>Previous</button>
      <button onClick={()=> setCurrentPage(currentPage + 1)}>Next</button>

      {data &&
        data.results.map((ships, i) => (
          <div className="card bg-zinc-400" key={"starship" + i}>
            <p>{ships.name}</p>
            <ul>
              <li>{ships.model}</li>
              <li>{ new Date (ships.created).toLocaleString("da-DK", {year:"numeric", month: "long", day:"numeric", hour:"2-digit", minute:"2-digit"})}</li>
            </ul>
          </div>
        ))}
    </>
  );
}
