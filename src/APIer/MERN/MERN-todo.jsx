import useRequestData from "../../hooks/useRequestData";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";



export default function MERNTodo() {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const [isCompleted, setIsCompleted] = useState(undefined);

  //   ---------- USE EFFECT -----------
  useEffect(() => {
    makeRequest("http://localhost:5000/todos");
  }, []);



//   ----------- DELETE --------------
  const {
    data: dataDelete,
    isLoading: isLoadingDelete,
    error: errorDelete,
    makeRequest: makeRequestDelete,
  } = useRequestData();

  const handleDelete = (todoID, todoTitle) => {
    //For at lave en pop up når man klikker slet
    if (window.confirm("Er du sikker på at du vil slette: " + todoTitle + "?")) {
      makeRequestDelete(
        "http://localhost:5000/todos/" + todoID,
        "DELETE"
      );
    }
  };


  return (
    <div className="max-w-7xl m-auto text-center">
      <h1 className="text-center font-bold text-2xl m-5">
        MERN API - Todos
      </h1>
      {isLoading && <Loader />}
      {error && <h2>Error...</h2>}

      {/* ----------------- MAP ---------------------------*/}
      {data && (
        <>
        {/* ---------- Links -------------- */}
        <div className="flex justify-around">
        <Link to="/merncreate" className="bg-slate-300 rounded-full p-3 hover:bg-green-500 hover:text-white">Tilføj til To-Do</Link>
        <Link to="/mernadmin" className="bg-slate-300 rounded-full p-3 hover:bg-green-500 hover:text-white">Admin</Link>
        </div>

        {/* --------- Cards --------------- */}
          <div className="flex flex-wrap justify-center my-4">
            {data.todos.map(p => (
              <div key={p._id} className="w-80 rounded overflow-hidden shadow-lg m-2 px-6 py-4 border-2 border-t-indigo-500">
                <h4>TODO: {p.title}</h4>
                <p className="text-sm italic text-gray-400">{p.description}</p>

                <figure className="flex justify-center">
                 {p.image ? <img src={"http://localhost:5000/images/" + p.image}  className="w-9"/> : null}
                </figure>
          
                <p>
                  <span className={p.done ? "done" : "notDone"}>
                    {p.done ? "GJORT" : "UGJORT"}
                  </span>
                </p>
                    <div className="grid grid-cols-2">  
                        <Link to={"/mernedit/" + p._id} className="flex justify-center text-3xl"><MdModeEdit className="hover:text-green-600"/></Link>
                        <button 
                        onClick={() => handleDelete(p._id, p.title)}
                        className=" flex justify-center text-3xl"><MdDelete className="hover:text-red-600"/></button>
                    </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
