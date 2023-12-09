import Error from "../../components/Error";
import Loader from "../../components/Loader";
import useRequestData from "../../hooks/useRequestData";
import { useEffect, useState } from "react";

export default function DadJokes() {
  const { makeRequest, isLoading, data, error } = useRequestData();

  const handleSubmit = e => {
    makeRequest("https://dad-jokes-by-api-ninjas.p.rapidapi.com/v1/dadjokes", "GET", null, {
      'X-RapidAPI-Key': '05f10d1657msh9ee107d4bd0bdebp1ba22fjsn4b725733d903',
      'X-RapidAPI-Host': 'dad-jokes-by-api-ninjas.p.rapidapi.com'
        })
    }

    useEffect(()=>{
        handleSubmit();
    }, [])

  return (
    <div className="max-w-7xl m-auto">
    <h1 className="text-center font-bold text-2xl m-5">Dad Jokes</h1>
      {isLoading && <Loader />}
      {error && <Error />}

      {
        data && data.map((e)=>(
          
          <div className="card flex flex-col justify-center">
            <p className="text-center shadow-lg rounded-full m-auto p-4 border-2 my-2 text-3xl">{e.joke}</p>
            <button className="w-64 bg-gray-300 hover:bg-gray-500 rounded mx-2 p-1 my-2 text-center self-center" 
            onClick={handleSubmit}
            >Tell me a new one! </button>
          </div>
       
        ))
      }
    </div>
  );
}
