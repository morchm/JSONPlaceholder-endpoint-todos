import { useParams } from "react-router-dom";
import useRequestData from "../hooks/useRequestData";
import { useEffect } from "react";
import Loader from "../components/Loader";

export default function selectedGhibli() {
  const { makeRequest, data, isLoading, error } = useRequestData();

  const { ghibliId } = useParams();

  useEffect(() => {
    makeRequest("https://ghibliapi.dev/films/" + ghibliId, "GET");
  }, []);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <h2>Error...</h2>}

      <article className="flex justify-center my-4">
        {data && (
          <div>
            <figure>
              <img
                src={data.movie_banner}
                className="w-full h-2/5 m-auto object-cover object-top	"
              />
            </figure>

            <div className="grid grid-cols-2 p-4 bg-slate-800 text-white">
              <figure className="col-span-1">
                <img src={data.image} className="w-full rounded-lg" />
              </figure>
              <article className="col-span-1 p-10">
                <h1 className="font-bold text-7xl my-6 text-center">
                  {data.title}
                </h1>
                <h2 className="text-center text-xl">
                  {data.original_title} | {data.original_title_romanised}
                </h2>

                <h5 className="text-center font-bold my-5">
                  Rotten Tomatoes score:{" "}
                  <span className={data.rt_score > 60 ? "done" : "notDone"}>
                    {data.rt_score}%
                  </span>
                </h5>
                <p>
                  <span className="text-2xl font-bold">"</span>
                  {data.description}
                  <span className="text-2xl font-bold">"</span>
                </p>
                <p className=" my-5 italic text-sm">
                  Director: {data.director} <br /> Producer: {data.producer} <br />
                  Year of release: {data.release_date} <br /> Running time:{" "}
                  {data.running_time} min
                </p>
                <p className="text-center">
                 
                </p>
              </article>
              <div></div>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
