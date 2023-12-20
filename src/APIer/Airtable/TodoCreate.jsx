import { useState, useEffect } from "react";
import useRequestData from "../../hooks/useRequestData";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import { useParams } from "react-router-dom";

export default function TodoCreate() {
  const { data, isLoading, error, makeRequest } = useRequestData(); 

  const [todoName, setTodoName] = useState()
  const [todoStatus, setTodoStatus] = useState()
  const [todoImg, setTodoImg] = useState()



  useEffect(() => {
    makeRequest(
      "https://api.airtable.com/v0/appjrgNPJTUoD9xp4/ToDos", "POST", null,{ Authorization: "Bearer patGF6Y0MpKrTXY3U.2feb669ec2652bbe60d50ab3bc57d04aad0548e45f5bd433714677e03fd250ec" }
    );
  }, []);

  return (
    <div className="max-w-7xl m-auto">
      <h1 className="text-center font-bold text-2xl m-5">
        Airtable - Tilføj til Todo
      </h1>

      {error && <Error />}
      {isLoading && <Loader />}

      {
        data && (
          <div>

          </div>
        )
      }

      <form>
        <label>Name</label>
      </form>

    </div>
  );
}
