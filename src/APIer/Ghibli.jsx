import { useEffect } from "react";
import Error from "../components/Error";
import Loader from "../components/Loader";
import useRequestData from "../hooks/useRequestData";
import { Link } from "react-router-dom";

export default function Ghibli() {
  const { data, isLoading, error, makeRequest } = useRequestData();

  useEffect(() => {
    makeRequest("https://ghibliapi.dev/films", "GET");
  }, []);

  return (
    <div className="">
      <h1 className="text-3xl font-bold text-center my-6">
        Studio Ghibli Film
      </h1>

      <div className="flex flex-wrap justify-center">
        {data &&
          data.map(e => (
            <div className="m-5 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl ">
              <article className="flex flex-row">
                <img
                  src={e.image}
                  className="object-cover w-full rounded-t-lg h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h2 className="text-xl font-bold text-center">{e.title}</h2>
                  <h3 className="mb-6 text-sm text-center font-thin italic">
                {e.original_title} - {e.original_title_romanised}
                  </h3>
                  <h5 className="text-xs mb-3 text-center font-bold text-purple-600">
                    {e.release_date} - {e.running_time} min.
                  </h5>
                  <p>
                    {e.description > 100
                      ? e.description
                      : e.description.slice(0, 100) + " ..."} 
                  </p>
                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-xs font-bold italic p-2  m-auto rounded-full">
                    <Link to={"/selectedghibli/" + e.id}>
                    Read more
                    </Link>
                    
                    </button>
                </div>
              </article>
            </div>
          ))}
      </div>
    </div>
  );
}
