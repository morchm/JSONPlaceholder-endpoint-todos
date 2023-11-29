import { useState } from "react";
import axios from "axios";

const useRequestData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const makeRequest = async (url) => {

    setIsLoading(true)

    //Kalder API
    try {
      let response = await axios.get(url);

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
