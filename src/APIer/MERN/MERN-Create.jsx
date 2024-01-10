import { useState, useEffect } from "react";
import useRequestData from "../../hooks/useRequestData";
import Loader from "../../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function MERNCreate() {
  const navigate = useNavigate()
  const { data, isLoading, error, makeRequest } = useRequestData();
  const { data:dataCategories, isLoading:isLoadingCategories, error:errorCategories, makeRequest:makeRequestCategories } = useRequestData(); 

  useEffect(()=> {
    makeRequestCategories("http://localhost:5000/categories")
  }, [])

  useEffect(()=> {
    if(data) navigate("/mernadmin")
  }, [data])

  const handleSubmit = e => {
    // For at forhindre i, at siden genindlæser og fjerner brugerens inputs
    e.preventDefault(); //VIGTIG!

    const fd = new FormData(e.target) //e.target = den udfyldte formular

    makeRequest("http://localhost:5000/todos", "POST", fd);
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
            name="title" //VIGTIGT at name svarer til todo-modellen
            required
            placeholder="Indtast en titel"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <div className="mb-5 flex flex-col">
          <label>Kategori</label>
          <select name="category" id="selCategory" defaultValue="DEFAULT" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <option value="DEFAULT" disabled>Vælg en kategori</option>
            {
              dataCategories && dataCategories.categories.map(c => <option value={c._id}>{c.category}</option>)
            }
          </select>

          {/* <input
            type="text"
            name="category" //VIGTIGT at name svarer til todo-modellen
            required
            placeholder="Indtast en kategori"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          /> */}
        </div>

        <div className="mb-5">
          <label>Description</label>
          <input
            type="text"
            name="description"
            required
            rows={5}
            placeholder="Indtast en beskrivelse"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        
        <div className="mb-5">
          <label>Vælg et billede</label>
          <input
            type="file"
            name="image"
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
