import useRequestData from "../hooks/useRequestData";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

export default function Todos() {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [isCompleted, setIsCompleted] = useState(undefined);

  useEffect(() => {
    makeRequest("https://jsonplaceholder.typicode.com/users/1/todos");
  }, []);

  return (
    <>
      <h1>JSONPlaceholder - Todos</h1>
      {isLoading && <Loader />}
      {error && <h2>Error...</h2>}

      {data && (
        <>


        {/* Bruger useRequest hook igen til at loade query med true/false*/}
          <button onClick={() => {makeRequest("https://jsonplaceholder.typicode.com/users/1/todos?completed=true")}}>Vis udførte todos</button>
          <button onClick={() => {makeRequest("https://jsonplaceholder.typicode.com/users/1/todos?completed=false");}}>Vis afventende todos</button>

          {data.map(p => (
            <div>
              <h4>TODO: {p.title}</h4>
              <p>Udført: <span className={p.completed ? "done" : "notDone"}>{p.completed ? "JA" : "NEJ"}</span></p>
            </div>
          ))}

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
    </>
  );
}
