import { useEffect, useState } from "react";
import useRequestData from "../../hooks/useRequestData";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

export default function ToDoListe() {
  const { data, isLoading, error, makeRequest } = useRequestData();
  const {
    data: categoryData,
    isLoading: categoryLoading,
    error: categoryError,
    makeRequest: categoryMakeRequest,
  } = useRequestData();

  useEffect(() => {
    makeRequest(
      "https://api.airtable.com/v0/appjrgNPJTUoD9xp4/ToDos",
      "GET",
      null,
      {
        Authorization:
          "Bearer patGF6Y0MpKrTXY3U.2feb669ec2652bbe60d50ab3bc57d04aad0548e45f5bd433714677e03fd250ec",
      }
    );
  }, []);

  useEffect(() => {
    categoryMakeRequest(
      "https://api.airtable.com/v0/appjrgNPJTUoD9xp4/TodoKategorier",
      "GET",
      null,
      {
        Authorization:
          "Bearer patGF6Y0MpKrTXY3U.2feb669ec2652bbe60d50ab3bc57d04aad0548e45f5bd433714677e03fd250ec",
      }
    );
  }, []);

  return (
    <div className="flex flex-col max-w-7xl m-auto">
      <h1 className="text-center font-bold text-2xl m-5">Airtable - To Do</h1>
      {isLoading && <Loader />}
      {error && <h2>Error...</h2>}

      <Link to={"/todocreate"} className="bg-slate-100 hover:bg-green-500 hover:text-white w-36 rounded p-2">Tilføj til listen...</Link>

      <section className="flex flex-wrap justify-center">
        {data &&
          data.records.map(e => (
            <div
              key={e.id}
              className="card rounded p-3 m-2 w-72 h-auto shadow-sm border-2 border-t-indigo-500 grid grid-cols-2 justify-items-center">
              <div>
                <h2 className="font-bold text-center mb-2">⋆❆{e.fields.Name}❆⋆</h2>
                <p className="text-center text-xs my-4"><span className="p-2 bg-yellow-100 rounded-full text-xs"> {e.fields.Status}</span>
                </p>
              </div>
              <img
                src={e.fields.Img[0].url}
                alt={e.fields.Img.filename}
                className="h-20 w-auto"
              />
            </div>
          ))}
      </section>
    </div>
  );
}
