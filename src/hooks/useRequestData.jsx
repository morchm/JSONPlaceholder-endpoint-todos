import { useState } from "react";
import axios from "axios";

const useRequestData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const makeRequest = async (url, method = "GET", bodydata = null) => {
    setIsLoading(true);

    //Kalder API
    try {
      let response 

      switch (method) {
        case "GET":
          response = await axios.get(url);
          break;
        case "POST":
          response = await axios.post(url, bodydata);
          break;
        case "PUT":
          response = await axios.put(url, bodydata);
          break;
        case "PATCH":
          response = await axios.patch(url, bodydata);
          break;
        case "DELETE":
          response = await axios.delete(url);
          break;
        default:
          throw new Error("Invalid method - GET POST PUT PATCH or DELETE was expected");
      }

      if (response && response.data != undefined) {
        setData(response.data);
        setError(null);
      } else {
        throw new Error("Tomt response/ingen data");
      }
    } catch (error) {
      console.log(error);
      setError("Der er opstået en fejl: " + error.message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, makeRequest };
};

export default useRequestData;
