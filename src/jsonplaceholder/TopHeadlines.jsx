import Error from "../components/Error";
import Loader from "../components/Loader";
import useRequestData from "../hooks/useRequestData";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import countries from "../../public/newsapi_requestparameters.json";

export default function TopHeadlines() {
  const { makeRequest, isLoading, data, error } = useRequestData();

  //Sprog
  const [language, setLanguage] = useState("en");

  //Hent data
  useEffect(() => {
    makeRequest(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4317cd71220a455aa2817f065604b3c9"
    );
  }, []);

  
  //Når der er submit på form/søgning
  const handleSearch = e => {
    makeRequest("https://newsapi.org/v2/everything?q=" + searchKey + "&language=" +  language + "&apiKey=8a6c9cb70f0f4de88f91a4c38b5b6fd9", "GET" );
  };

   //Start søgning, når der trykkes på enter
   const handleSearchKeyUp = e => {
    if (e.key === "Enter" || e.code === "Enter") handleSearch();
  };


  return (
    <div className="max-w-7xl m-auto">

      {/* ---------- START ---------- */}
      <h1 className="text-center font-bold text-2xl m-5"> Nyheder - Top Headlines </h1>
      {isLoading && <Loader />}
      {error && <Error />}

      {/*  ---------- SEARCH INPUT ---------- */}
      <div className="flex flex-wrap justify-center">
        {/* --- Søg --- */}
        <input type="search" placeholder="Søg..." className="shadow-lg rounded border-2 p-1 my-2"/>
        <button className="bg-gray-300 hover:bg-gray-500 rounded mx-2 p-1"><FaMagnifyingGlass className="m-2" /></button>
      </div>

      <div className="flex justify-center">
        {/* ---------- LANGUAGE ---------- */}
        <div>
            <label>Sprog: </label>
            <select name="language" id="language">
                <option value="en">Engelsk</option>
                <option value="de">Tysk</option>
                <option value="ar">Arabisk</option>
            </select>
        </div>

        {/* ---------- COUNTRIES ---------- */}
        <div>
            <label>Land: </label>
            <select name="country" id="country">
                <option value="us">United States</option>
                <option value="ae">Arab Emirates</option>
                <option value="de">Germany</option>
                <option value="fr">France</option>
            </select>
        </div>
      </div>

      {/* ---------- DATA MAPPING ----------  */}
      <div className="flex flex-wrap justify-center">
        {data && 
            data.articles.map((n) => 
            <div className="max-w-sm rounded shadow-lg m-2 px-6 py-4 border-2 border-t-indigo-500 h-auto" key={n.url}>
                <h2 className="text-center text-xl font-bold">{n.title}</h2>
                <img className="h-auto my-4" src={n.urlToImage || "/placeholder.jpg"} alt="" />
                <p className="text-xs">{n.publishedAt}</p>
                <p className="text-s text-center">{n.description}</p>
                <p className="text-xs my-2"> {n.content}</p>

                <p className="text-center my-2">
                    <a href={n.url} target="_blank" className="bg-sky-500 hover:bg-sky-200 rounded p-2">Læs mere...</a>
                </p>


            </div>
             )} {/* END MAP */}
      </div>
    </div>
  );
}
