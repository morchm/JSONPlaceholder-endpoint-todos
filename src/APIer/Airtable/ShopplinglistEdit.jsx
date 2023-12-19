import { useState, useEffect } from "react";
import useRequestData from "../../hooks/useRequestData";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { useParams } from "react-router-dom";

export default function ShoppinglistEdit() {
  const { data, isLoading, error, makeRequest } = useRequestData(); //GET
  const {
    data: dataPUT,
    isLoading: isLoadingPUT,
    error: errorPUT,
    makeRequest: makeRequestPUT,
  } = useRequestData(); //PUT
  
  //State til at rumme en post (som skal rettes)
  const [item, setItem] = useState("");
  const [note, setNote] = useState("");
  
  //Hent ID på post der skal rettes - fra url'ens parametre
  const { listId } = useParams();

  useEffect(() => {
    makeRequest(
      "https://api.airtable.com/v0/appBBdvOJVd5EOaZu/Need/" + listId,
      "GET",
      null,
      {
        Authorization:
          "Bearer " +
          "patlUdOuDAjeuDzZO.acdab6d246ef696cdd6f9781c84debf1fe104f20e30baa1a4e991308717bb813",
      }
    );
  }, []);

  //Når der er hentet/GET data fra API'et (post, der skal rettes) - indlæs data i state
  useEffect(() => {
    if (data) {
      setItem(data.fields.Item);
      setNote(data.fields.Notes);
    }
  }, [data]);

  //PUT
  //Der er klikket på submitbutton - send data til API
  const handleSubmit = e => {
    // For at forhindre i, at siden genindlæser og fjerner brugerens inputs = tømmer alt i state mv.
    e.preventDefault(); //VIGTIG!

    const nyPost = {
        "fields": {
            "Item": item,
            "Notes": note
        }
    };

    makeRequestPUT(
      "https://api.airtable.com/v0/appBBdvOJVd5EOaZu/Need/" + listId,
      "PUT",
      nyPost,
      {
        Authorization:
          "Bearer " +
          "patlUdOuDAjeuDzZO.acdab6d246ef696cdd6f9781c84debf1fe104f20e30baa1a4e991308717bb813",
      }
    );
  };

  return (
    <div className="max-w-7xl m-auto">
      <h1 className="text-center font-bold text-2xl m-5">
        Airtable - Edit/Update shoppingliste
      </h1>

      {(error || errorPUT) && <Error />}
      {(isLoading || isLoadingPUT) && <Loader />}

      {/* Beskeden når der er rettet data - PUT */}
      {dataPUT && (
        <div>
          <h2>Post er rettet!</h2>
          <p>{dataPUT.fields.Item}</p>
          <p>{dataPUT.fields.Notes}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto flex flex-col flex-nowrap justify-center">
        <div className="mb-5">
          <label>Item</label>
          <input
            type="text"
            required
            placeholder="Item"
            onInput={e => setItem(e.target.value)}
            value={item}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <div className="mb-5">
          <label>Note</label>
          <textarea
            type="text"
            rows={5}
            onInput={e => setNote(e.target.value)}
            value={note}
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
