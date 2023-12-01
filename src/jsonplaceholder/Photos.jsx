import useRequestData from "../hooks/useRequestData";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import PrevNext from "../components/PrevNext";
import ItemsPerPage from "../components/ItemsPerPage";

export default function Photos() {
  const { data, isLoading, error, makeRequest } = useRequestData();

  //Prev og next buttons "skift side"
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    makeRequest("https://jsonplaceholder.typicode.com/albums/1/photos");
  }, []);

  return (
    <div className="max-w-7xl m-auto text-center">
      <h1 className="text-center font-bold text-2xl m-5">
        JSONPlaceholder - Billeder
      </h1>
      {isLoading && <Loader />}
      {error && <h2>Error...</h2>}

      <div>
        <ItemsPerPage
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
          options={[5, 10, 100]}
        />

        {/* {[5, 10, 20].map(o => (
          <button
            className="btn"
            onClick={() => {
              setItemsPerPage(o);
              setCurrentPage(0);
            }}>
            {o} pr. side
          </button>
        ))} */}
      </div>

      {data && (
        <PrevNext
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          dataLength={data.length}
          itemsPerPage={itemsPerPage}
        />
      )}

      {/* .slice er med til at give effekten af at "skifte side" */}
      {/* Det gør sådan, at den kan fjerne items fra starten og slutningen af et array, uden rent faktisk at
      modificere den originale */}
      <div className="flex flex-wrap justify-center ">
        {data &&
          data
            .slice(
              currentPage * itemsPerPage,
              currentPage * itemsPerPage + itemsPerPage
            )
            .map((p) => (
              <div className="w-80 rounded overflow-hidden shadow-lg m-2 px-6 py-4 border-2 border-t-indigo-500">
                <h4 className="font-bold text-xl mb-2">{p.title}</h4>
                <figure>
                  <img
                    src={p.thumbnailUrl}
                    alt={p.id}
                    loading="lazy"
                  />
                </figure>
              </div>
            ))}
      </div>
    </div>
  );
}
