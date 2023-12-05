import Error from "../components/Error";
import Loader from "../components/Loader";
import useRequestData from "../hooks/useRequestData";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Everything() {
  const { makeRequest, isLoading, data, error } = useRequestData();

  //State til at rumme det der skal søges efter i nyhederne
  const [searchKey, setSearchKey] = useState("");

  //Sprog
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    makeRequest(
      "https://newsapi.org/v2/everything?q=" +
        searchKey +
        "&language=" +
        language +
        "&domains=wsj.com&apiKey=8a6c9cb70f0f4de88f91a4c38b5b6fd9",
      "GET"
    );
  }, [language]);

  //Når der er submit på form/søgning
  const handleSearch = e => {
    e.preventDefault();
    makeRequest(
      "https://newsapi.org/v2/everything?q=" +
        searchKey +
        "&language=" +
        language +
        "&domains=wsj.com&apiKey=8a6c9cb70f0f4de88f91a4c38b5b6fd9",
      "GET"
    );
  };

  return (
    <div className="max-w-7xl m-auto">
      <h1 className="text-center font-bold text-2xl m-5">
        Nyheder - "Everything"
      </h1>
      {isLoading && <Loader />}
      {error && <Error />}

      {/* ----- SEARCH INPUT ----- */}
      <form onSubmit={handleSearch} className="flex flex-wrap justify-center">
        <input
          type="search"
          onChange={e => setSearchKey(e.target.value)}
          placeholder="Søg ..."
          className="shadow-lg rounded border-2 p-1"
        />
        <button className="bg-gray-300 hover:bg-gray-500 rounded mx-2">
          <FaMagnifyingGlass className="m-2" />
        </button>
      </form>

      {/* ----- LANGUAGE INPUT ----- */}
      <div className="m-2">
        <label>Sprog: </label>
        <select
          name="language"
          id="language"
          onChange={e => setLanguage(e.target.value)}>
          <option value="en">Engelsk</option>
          <option value="de">Tysk</option>
          <option value="ar">Arabisk</option>
        </select>
      </div>

      {/*  ----- ARTICLE CARDS ------ */}
      <div className="flex flex-wrap justify-center">
        {data &&
          data.articles.map(n => (
            <div className="max-w-sm rounded shadow-lg m-2 px-6 py-4 border-2 border-t-indigo-500 h-auto">
              <h2 className="text-center">{n.title}</h2>
              <img className="h-auto my-4" src={n.urlToImage} alt="" />
              <p className="text-xs">{n.publishedAt}</p>
              <p className="text-s text-center">{n.description}</p>
              <p className="text-xs my-2"> {n.content}</p>

              <p className="text-center my-2">
                <a
                  href={n.url}
                  target="_blank"
                  className="bg-sky-500 hover:bg-sky-200 rounded p-2">
                  Læs mere...
                </a>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
