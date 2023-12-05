import { useState, useEffect } from "react";
import useRequestData from "../hooks/useRequestData";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Link, useParams } from "react-router-dom";

export default function PostEdit() {
  const { data, isLoading, error, makeRequest } = useRequestData(); //GET
  const {
    data: dataPUT,
    isLoading: isLoadingPUT,
    error: errorPUT,
    makeRequest: makeRequestPUT,
  } = useRequestData(); //PUT

  //State til at rumme en post (som skal rettes)
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");

  //Hent ID på post der skal rettes - fra url'ens parametre
  const { postID } = useParams();

  //Hent data GET
  useEffect(() => {
    makeRequest("https://jsonplaceholder.typicode.com/posts/" + postID);
  }, []);

  //Når der er hentet/GET data fra API'et (post, der skal rettes) - indlæs data i state
  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setBody(data.body);
      setUserId(data.userId);
    }
  }, [data]);

  //PUT
  //Der er klikket på submitbutton - send data til API
  const handleSubmit = e => {
    // For at forhindre i, at siden genindlæser og fjerner brugerens inputs = tømmer alt i state mv.
    e.preventDefault(); //VIGTIG!

    const nyPost = { title, body, userId };

    makeRequestPUT(
      "https://jsonplaceholder.typicode.com/posts" + postID,
      "PUT",
      nyPost
    );
  };

  return (
    <div className="max-w-7xl m-auto">
      <h1 className="text-center font-bold text-2xl m-5">
        JSONPlaceholder - Post Edit/Update
      </h1>

      {(error || errorPUT) && <Error />}
      {(isLoading || isLoadingPUT) && <Loader />}

      {/* Beskeden når der er rettet data - PUT */}
      {dataPUT && (
        <div>
          <h2>Post er rettet!</h2>
          <p>{dataPUT.title}</p>
          <p>{dataPUT.body}</p>
          <p>{dataPUT.userId}</p>
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
            onInput={e => setBody(e.target.value)}
            value={body}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <div className="mb-5">
          <label>ID på user (som har lavet opslaget)</label>
          <input
            type="number"
            required
            placeholder="Users ID"
            value={userId}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <button
          type="submit"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l m-1 rounded">
          Opdater Post
        </button>
      </form>
    </div>
  );
}
