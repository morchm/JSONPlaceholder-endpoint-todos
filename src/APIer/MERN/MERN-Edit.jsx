import { useState, useEffect } from "react";
import useRequestData from "../../hooks/useRequestData";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { Link, useParams } from "react-router-dom";

export default function MERNEdit() {
  const { data, isLoading, error, makeRequest } = useRequestData(); //GET
  const {
    data: dataPUT,
    isLoading: isLoadingPUT,
    error: errorPUT,
    makeRequest: makeRequestPUT,
  } = useRequestData(); //PUT

  //State til at rumme en post (som skal rettes)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //Hent ID på post der skal rettes - fra url'ens parametre
  const { todoID } = useParams();

  //----------- Hent data GET -------------
  useEffect(() => {
    makeRequest("http://localhost:5000/todos/" + todoID);
  }, []);

  useEffect(() => {
    if (data) {
      setTitle(data.todo.title); //Gem todo titel 
      setDescription(data.todo.description);
    }
  }, [data]);


  //------------------ PUT ---------------------
  const handleSubmit = e => {
    e.preventDefault(); //VIGTIG!

    const nyTodo = { title: title, description: description };

    makeRequestPUT(
      "http://localhost:5000/todos/" + todoID,
      "PUT",
      nyTodo
    );
  };

  return (
    <div className="max-w-7xl m-auto">
      <h1 className="text-center font-bold text-2xl m-5">
        MERN - Todo Edit/Update
      </h1>

      {(error || errorPUT) && <Error />}
      {(isLoading || isLoadingPUT) && <Loader />}

      {/* Beskeden når der er rettet data - PUT */}
      {dataPUT && (
        <div>
          <h2>Todo er rettet!</h2>
          <p>{dataPUT.updated.title}</p>
          <p>{dataPUT.updated.description}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto flex flex-col flex-nowrap justify-center">
        <div className="mb-5">
          <label>Title</label>
          <input
            type="text"
            required
            placeholder="Titel"
            onInput={e => setTitle(e.target.value)}
            value={ title }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <div className="mb-5">
          <label>Description</label>
          <textarea
            type="text"
            required
            rows={5}
            placeholder="Description"
            onInput={e => setDescription(e.target.value)}
            value={ description }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <button
          type="submit"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l m-1 rounded">
          Ret Todo
        </button>
      </form>
    </div>
  );
}
