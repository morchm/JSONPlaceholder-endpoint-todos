import useRequestData from "../../hooks/useRequestData";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";

export default function Todos() {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [isCompleted, setIsCompleted] = useState(undefined);

  useEffect(() => {
    makeRequest("https://jsonplaceholder.typicode.com/users/1/todos");
  }, []);

  return (
    <div className="max-w-7xl m-auto text-center">
      <h1 className="text-center font-bold text-2xl m-5">
        JSONPlaceholder - Todos
      </h1>
      {isLoading && <Loader />}
      {error && <h2>Error...</h2>}

      {data && (
        <>
          {/* Bruger useRequest hook igen til at loade query med true/false*/}
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l m-1 rounded"
            onClick={() => {
              makeRequest(
                "https://jsonplaceholder.typicode.com/users/1/todos?completed=true"
              );
            }}
          >
            Vis udførte todos
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l m-1 rounded"
            onClick={() => {
              makeRequest(
                "https://jsonplaceholder.typicode.com/users/1/todos?completed=false"
              );
            }}
          >
            Vis afventende todos
          </button>

          <div className="flex flex-wrap justify-center">
            {data.map((p) => (
              <div className="w-80 rounded overflow-hidden shadow-lg m-2 px-6 py-4 border-2 border-t-indigo-500">
                <h4>TODO: {p.title}</h4>
                <p>
                  Udført:{" "}
                  <span className={p.completed ? "done" : "notDone"}>
                    {p.completed ? "JA" : "NEJ"}
                  </span>
                </p>
              </div>
            ))}
          </div>

          {/* -------- MED USESTATE -------- */}
          {/* Et mere kompliceret forsøg. Ved ikke om det er bedre, men her cacher man ikke hver gang man klikker på knapperne */}

          {/* <button
            onClick={() => {
              setIsCompleted(true);
            }}>
            Vis udførte todos
          </button>
          <button
            onClick={() => {
              setIsCompleted(false);
            }}>
            Vis afventende todos
          </button>

          {data.map(p => {
            if (isCompleted === undefined) {
              return (
                <>
                  <h6>{p.title}</h6>
                  <p>{p.completed.toString()}</p>
                </>
              );
            } else {
              if (isCompleted === p.completed) {
                return (
                  <>
                    <h6>{p.title}</h6>
                    <p>{p.completed.toString()}</p>
                  </>
                );
              }
            }
          })} */}
        </>
      )}
    </div>
  );
}
