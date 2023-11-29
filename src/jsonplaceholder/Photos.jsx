import useRequestData from "../hooks/useRequestData";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

export default function Photos() {
  const { data, isLoading, error, makeRequest } = useRequestData();

  //Prev og next buttons "skift side"
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    makeRequest("https://jsonplaceholder.typicode.com/albums/1/photos");
  }, []);

  return (
    <>
      <h1>JSONPlaceholder - Billeder</h1>
      {isLoading && <Loader />}
      {error && <h2>Error...</h2>}

      <div>
        {[5, 10, 20].map(o => (
          <button
            className="btn"
            onClick={() => {
              setItemsPerPage(o);
              setCurrentPage(0);
            }}>
            {o} pr. side
          </button>
        ))}
      </div>

      {data && (
        <>
          <button
            className="btn"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage <= 0}>
            Prev
          </button>
          <button
            className="btn"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage + 1 >= Math.ceil(data.length / itemsPerPage)}>
            Next
          </button>
        </>
      )}

      {/* .slice er med til at give effekten af at "skifte side" */}
      {/* Det gør sådan, at den kan fjerne items fra starten og slutningen af et array, uden rent faktisk at
      modificere den originale */}
      <div className="photoContainer">
        {data &&
          data
            .slice(
              currentPage * itemsPerPage,
              currentPage * itemsPerPage + itemsPerPage
            )
            .map(p => (
              <div>
                <h4 className="photoTitle">{p.title}</h4>
                <figure>
                  <img className="photo" src={p.thumbnailUrl} alt={p.id} />
                </figure>
              </div>
            ))}
      </div>
    </>
  );
}
