import { useEffect, useState } from "react";
import useRequestData from "../../hooks/useRequestData";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

// Icons - npm i react-icons
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

export default function ShoppingListe() {
  //Hent data der skal map'es
  const { data, isLoading, error, makeRequest } = useRequestData();
  //Når DELETE kaldes- og data er tom hvis delete lykkedes
  const {
    data: dataDelete,
    isLoading: isLoadingDelete,
    error: errorDelete,
    makeRequest: makeRequestDelete,
  } = useRequestData();

  useEffect(() => {
    makeRequest(
      "https://api.airtable.com/v0/appBBdvOJVd5EOaZu/Need",
      "GET",
      null,
      {
        "Authorization":
          "Bearer " +
          "patlUdOuDAjeuDzZO.acdab6d246ef696cdd6f9781c84debf1fe104f20e30baa1a4e991308717bb813",
      }
    );
  }, []);


  const handleDelete = (listId, listItem) => {

    const deletePost = {
      "deleted": true,
      "id": listId
  }

    //For at lave en pop up når man klikker slet
    if (
      window.confirm("Er du sikker på at du vil slette: " + listItem  + "?")
    ) {
      makeRequestDelete(
        "https://api.airtable.com/v0/appBBdvOJVd5EOaZu/Need/" + listId,
        "DELETE", deletePost,
        {
          "Authorization":
          "Bearer patlUdOuDAjeuDzZO.acdab6d246ef696cdd6f9781c84debf1fe104f20e30baa1a4e991308717bb813",
        }
      );
    }
  };

  return (
    <div className="flex flex-col max-w-7xl m-auto">
      <h1 className="text-center font-bold text-2xl m-5">
        Airtable - Shopping liste
      </h1>
      {isLoading && <Loader />}
      {error && <h2>Error...</h2>}

      <Link to={"/shoppingcreate"} className="bg-slate-100 hover:bg-green-500 hover:text-white w-36 rounded p-2 m-2">Tilføj til listen...</Link>

      <section className="flex flex-wrap">
        {data &&
          data.records.map(list => (
            <div className="card rounded p-3 m-2 w-60 shadow-sm border-2 border-t-indigo-500" key={list.id}>
              <h2 className="font-bold text-center">{list.fields.Item}</h2>
              <p>{list.fields.Notes || "... Ingen Note"}</p>

              <div className="grid grid-cols-2 justify-items-center m-2">
                <Link to={"/shoppingedit/" + list.id} >
                  <FaEdit className="hover:text-sky-300 text-3xl" />
                </Link>

                <button
                  onClick={() => handleDelete(list.id, list.fields.Item)}>
                  <FaTrashCan className="m-auto text-3xl hover:text-red-600"/>
                </button>
              </div>
              <p className="text-xs text-gray-300 text-center">{list.createdTime}</p>
            </div>
          ))}
      </section>
    </div>
  );
}
