import { useState, useEffect } from "react";
import useRequestData from "../../hooks/useRequestData";
import Loader from "../../components/Loader";
import { Link, useParams } from "react-router-dom";

export default function MERNCreate() {
  const { data, isLoading, error, makeRequest } = useRequestData();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = e => {
    // For at forhindre i, at siden genindlæser og fjerner brugerens inputs
    e.preventDefault(); //VIGTIG!

    const nyTodo = { title, description};

    makeRequest("http://localhost:5000/todos", "POST", nyTodo);
  };

  return (
    <div className="max-w-7xl m-auto">
      <h1 className="text-center font-bold text-2xl m-5">
        MERN - Create Todo
      </h1>

      {isLoading && <Loader />}
      {error && <h2>Error...</h2>}

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto flex flex-col flex-nowrap justify-center">
        <div className="mb-5">
          <label>Title</label>
          <input
            type="text"
            required
            placeholder="Titel"
            onInput={e => setTitle(e.target.value)}
            value={title}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <div className="mb-5">
          <label>Description</label>
          <input
            type="text"
            required
            rows={5}
            onInput={e => setDescription(e.target.value)}
            placeholder="Description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <button
          type="submit"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l m-1 rounded">
          Opret ny todo
        </button>
      </form>
    </div>
  );
}
