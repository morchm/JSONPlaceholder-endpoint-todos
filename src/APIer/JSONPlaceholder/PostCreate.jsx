import { useState, useEffect } from "react";
import useRequestData from "../../hooks/useRequestData";
import Loader from "../../components/Loader";
import { Link, useParams } from "react-router-dom";

export default function PostCreate() {
  const { data, isLoading, error, makeRequest } = useRequestData();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = e => {
    // For at forhindre i, at siden genindlæser og fjerner brugerens inputs
    e.preventDefault(); //VIGTIG!

    const nyPost = { title, body, userId };

    makeRequest("https://jsonplaceholder.typicode.com/posts", "POST", nyPost);
  };

  return (
    <div className="max-w-7xl m-auto">
      <h1 className="text-center font-bold text-2xl m-5">
        JSONPlaceholder - Post Create
      </h1>

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
            value={title}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <div className="mb-5">
          <label>Body</label>
          <textarea
            type="text"
            required
            rows={5}
            placeholder="Body"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <div className="mb-5">
          <label>ID på user (som har lavet opslaget)</label>
          <input
            type="number"
            required
            placeholder="Users ID"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <button
          type="submit"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l m-1 rounded">
          Opret ny post
        </button>
      </form>
    </div>
  );
}
