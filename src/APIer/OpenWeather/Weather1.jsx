import Error from "../../components/Error";
import Loader from "../../components/Loader";
import useRequestData from "../../hooks/useRequestData";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";


export default function Weather1() {
  const { makeRequest, isLoading, data, error } = useRequestData();

  const [zip, setZip] = useState("4000");

  const searchZipCode = () => {
    if (zip.length === 4) {
        makeRequest(
          "https://api.openweathermap.org/data/2.5/weather?zip=" +
            zip +
            ",dk&units=metric&appid=ce9282584cfaaac68fda86f7e2e24f70",
          "GET"
        );
    }
  };
  
  useEffect(() => {
      searchZipCode();
    }, []);
    
    const handleSearchKeyUp = e => {
      if (e.key === "Enter" || e.code === "Enter") searchZipCode();
    };

  return (
    <div className="max-w-7xl m-auto">
      <h1 className="text-3xl font-bold text-center my-6">
        Vejret for en udvalgt by
      </h1>

      {isLoading && <Loader />}
      {error && <Error />}

      <div className="m-auto text-center">
            <input
            className="shadow-lg rounded-full text-center border m-auto"
            type="text"
            name="zipCode"
            id="zipCode"
            placeholder="Indtast postnummer"
            value={zip}
            maxLength={4}
            required
            pattern="[0-9]{4}"
            onKeyDown={handleSearchKeyUp}
            onChange={e => {setZip(e.target.value); setValid(e.target.checkValidity())}}
            />
            <button>
                 <CiSearch/>
            </button>
      </div>

      <div className="flex flex-wrap justify-center flex-col">

        {data && (
          <article className=" rounded overflow-hidden shadow-lg m-2 px-6 py-4 border-2 border-t-indigo-500 self-center">
            <h2 className="text-center text-xl">
              Vejret for <span className="font-bold">{data.name}</span>
            </h2>
            <figure className="flex justify-center">
              <img
                className="w-14"
                src={
                  " https://openweathermap.org/img/wn/" +
                  data.weather[0].icon +
                  ".png"
                }
              />
            </figure>
            <ul>
              <li>Temperatur: {Math.round(data.main.temp)}&deg;C</li>
              <li>Vindhastighed: {data.wind.speed} m/sek</li>
              <li className="flex">
                Vindretning: {data.wind.deg}{" "}
                <FaArrowUp
                  style={{ transform: "rotate(" + data.wind.deg + "deg)" }}
                  className="mt-1 mx-2"
                />{" "}
              </li>
              <li>
                Solen står op kl.{" "}
                {new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </li>
              <li>
                Solnedgang går ned kl.{" "}
                {new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </li>
            </ul>
          </article>
        )}
      </div>
    </div>
  );
}
