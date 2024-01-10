import { useState, useEffect, useRef } from "react";
import useRequestData from "../../hooks/useRequestData";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { Link, useParams } from "react-router-dom";

export default function MERNEdit() {

  const refDone = useRef()

  //Hent ID på post der skal rettes - fra url'ens parametre
  const { todoID } = useParams();

  const { data, isLoading, error, makeRequest } = useRequestData(); //GET
  const { data: dataPUT, isLoading: isLoadingPUT, error: errorPUT, makeRequest: makeRequestPUT} = useRequestData(); //PUT


 

  //----------- Hent data GET -------------
  useEffect(() => {
    makeRequest("http://localhost:5000/todos/" + todoID);
  }, []);

  //------------------ PUT ---------------------
  const handleSubmit = e => {
    e.preventDefault(); //VIGTIG!

    const fd = new FormData( e.target )

    // Hvis done-checkbox ikke er afkrydset så send done = false
    if(refDone.current.checked === false) {
      fd.append("done", false)
    }

    makeRequestPUT("http://localhost:5000/todos/" + todoID, "PUT", fd);
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
        <div className="text-center rounded-full">
          <h2 className="font-bold text-lg">Todo er rettet!</h2>
          <p>Titel: {dataPUT.updated.title}</p>
          <p>Beskrivelse: {dataPUT.updated.description}</p>
          <p>Billede: {dataPUT.updated.image}</p>
        </div>
      )}

      {
        data && 
          <form
          onSubmit={handleSubmit}
          className="max-w-sm mx-auto flex flex-col flex-nowrap justify-center">
          <div className="mb-5">
            <label>Title</label>
            <input
              type="text"
              name="title"
              defaultValue={ data.todo.title }
              required
              placeholder="Titel"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <div className="mb-5">
            <label>Description</label>
            <textarea
              type="text"
              name="description"
              defaultValue={ data.todo.description }
              required
              rows={5}
              placeholder="Description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>


          <div>
            <h4>Nuværende billede</h4>
            <figure>
              <img src={"http://localhost:5000/images/" + data.todo.image}/>
            </figure>
          </div>
          <div className="mb-5">
            <label>Vælg evt. et nyt billede</label>
            <input
              type="file"
              name="image"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>


          <div className="mb-5">
            <label>Udført?</label>
            <input
              type="checkbox"
              name="done"
              ref={refDone}
              defaultValue={data.todo.done}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <button
            type="submit"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l m-1 rounded">
            Ret Todo
          </button>
        </form>
      }

     
    </div>
  );
}
