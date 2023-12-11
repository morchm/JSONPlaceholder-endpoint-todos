import Error from "../../components/Error";
import Loader from "../../components/Loader";
import useRequestData from "../../hooks/useRequestData";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function TopHeadlines() {
  const { makeRequest, isLoading, data, error } = useRequestData();

  //State til at rumme det der skal søges efter i nyhederne
  const [searchKey, setSearchKey] = useState("");

  //Land
  const [country, setCountry] = useState("us")

  //Kategori
  const [category, setCategory] = useState("business");

  //Hent data
  useEffect(() => {
    handleSearch();
  }, [country, category]);

  //Når der er submit på form/søgning
  const handleSearch = e => {
    makeRequest("https://newsapi.org/v2/top-headlines?q="+ searchKey + "&country="+ country +"&category="+ category +"&apiKey=4317cd71220a455aa2817f065604b3c9",
      "GET"
    );
  };

  //Start søgning, når der trykkes på enter
  const handleSearchKeyUp = e => {
    if (e.key === "Enter" || e.code === "Enter") handleSearch();
  };

  return (
    <div className="max-w-7xl m-auto">
      {/* ---------- START ---------- */}
      <h1 className="text-center font-bold text-2xl m-5">
        {" "}
        Nyheder - Top Headlines{" "}
      </h1>
      {isLoading && <Loader />}
      {error && <Error />}

      {/*  ---------- SEARCH INPUT ---------- */}
      <div className="flex flex-wrap justify-center">
        <input
          type="search"
          onKeyUp={e => handleSearchKeyUp(e)}
          onChange={e => setSearchKey(e.target.value)}
          value={searchKey}
          placeholder="Søg ..."
          className="shadow-lg rounded border-2 p-1"
        />
        <button className="bg-gray-300 hover:bg-gray-500 rounded mx-2">
          <FaMagnifyingGlass className="m-2" />
        </button>
      </div>

      <div className="flex justify-center">

        {/* ---------- COUNTRIES ---------- */}
        <div>
          <label>Land: </label>
          <select
          onChange={e => setCountry(e.target.value)}
          value={country}
          name="country" 
          id="country"
          className="shadow-lg rounded border-2 p-1">
            <option value="us">United States</option>
            <option value="ae">Arab Emirates</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
          </select>
        </div>

        <div>
          <label>Kategori: </label>
          <select 
          onChange={e => setCategory(e.target.value)}
          value={category}
          name="category" 
          id="category"
          className="shadow-lg rounded border-2 p-1"
          >
            <option value="business">Business</option>
            <option value="general">General</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="technology">Technology</option>
          </select>
        </div>
      </div>

      {/* ---------- DATA MAPPING ----------  */}
      <div className="flex flex-wrap justify-center">
        {data &&
          data.articles.map(n => (
            <div
              className="max-w-sm rounded shadow-lg m-2 px-6 py-4 border-2 border-t-indigo-500 h-auto"
              key={n.url}>
              <h2 className="text-center text-xl font-bold">{n.title}</h2>
              <img
                className="h-auto my-4"
                src={n.urlToImage || "/placeholder.jpg"}
                alt=""
              />
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
        {/* END MAP */}
      </div>
    </div>
  );
}
