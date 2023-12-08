import Error from "../../components/Error";
import Loader from "../../components/Loader";
import useRequestData from "../../hooks/useRequestData";
import { useEffect, useState } from "react";

export default function Hobby() {
  const { makeRequest, isLoading, data, error } = useRequestData();

  const handleSubmit = e => {
    makeRequest("https://hobbies-by-api-ninjas.p.rapidapi.com/v1/hobbies", "GET", null, {
      'X-RapidAPI-Key': '05f10d1657msh9ee107d4bd0bdebp1ba22fjsn4b725733d903',
      'X-RapidAPI-Host': 'hobbies-by-api-ninjas.p.rapidapi.com'
    })
  }

  useEffect(()=>{
    handleSubmit();
  }, [])

  return (
    <div className="max-w-7xl m-auto">
      <h1 className="text-center font-bold text-2xl m-5">Få dig en hobby!</h1>
      {isLoading && <Loader />}
      {error && <Error />}

      {
        data && 
          <div className="card flex flex-col justify-center">
            <h2 className="mb-6 text-3xl font-bold text-center">{data.hobby}</h2>
            <a href={data.link} target="_blank" className="text-center underline my-2">Læs mere om {data.hobby}</a>
            <button className="w-64 bg-gray-300 hover:bg-gray-500 rounded mx-2 p-1 my-2 text-center self-center" 
            onClick={handleSubmit}
            >Nej tak - Giv mig en anden hobby</button>
          </div>
      }
      
    </div>
  );
}
