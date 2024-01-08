import { useState, useEffect } from "react";
import useRequestData from "../../hooks/useRequestData";
import Loader from "../../components/Loader";
import { Link, useParams } from "react-router-dom";
import PrevNext from "../../components/PrevNext";
import ItemsPerPage from "../../components/ItemsPerPage";

// Icons - npm i react-icons
import { FaEdit, FaPlus } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

export default function MERNAdmin() {
  //Hent data der skal map'es
  const { data, isLoading, error, makeRequest } = useRequestData();
  //Når DELETE kaldes- og data er tom hvis delete lykkedes
  const {
    data: dataDelete,
    isLoading: isLoadingDelete,
    error: errorDelete,
    makeRequest: makeRequestDelete,
  } = useRequestData();

  useEffect(() => {
    makeRequest("http://localhost:5000/todos");
  }, []);

  const handleDelete = (todoID, todoTitle) => {
    //For at lave en pop up når man klikker slet
    if (window.confirm("Er du sikker på at du vil slette: " + todoTitle + "?")) {
      makeRequestDelete(
        "http://localhost:5000/todos/" + todoID,
        "DELETE"
      );
    }
  };

  return (
    <div className="max-w-3xl m-auto">
      <h1 className="text-center font-bold text-2xl m-5">
        JSONPlaceholder - Posts Admin
      </h1>
      {isLoading && <Loader />}
      {error && <h2>Error...</h2>}

      {/* TABLE */}
      <table className="table-auto">
        <thead>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <Link to={"/merncreate"}>
                <FaPlus className="text-2xl my-4 text-lime-600 hover:text-lime-700" />
              </Link>
            </td>
          </tr>
          <tr>
            <td className="px-10">ID</td>
            <td className="px-10">Title</td>
            <td className="px-10">RET</td>
            <td>SLET</td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.todos.map(p => (
              <tr key={p.id}>
                <td className="px-10">{p._id}</td>
                <td className="px-10">{p.title}</td>
                <td className="px-10">
                  <Link to={"/mernedit/" + p._id}>
                    <FaEdit className="hover:text-sky-700 text-3xl" />
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(p._id, p.title)}
                    className="bg-gray-300 hover:bg-red-700 hover:text-white text-gray-800 font-bold py-2 px-4 rounded-l m-1 rounded">
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
