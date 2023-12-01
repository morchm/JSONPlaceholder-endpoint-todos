import { useState, useEffect } from "react";
import useRequestData from "../hooks/useRequestData";
import Loader from "../components/Loader";
import { Link, useParams } from "react-router-dom";

const Posts = () => {
  const { data, isLoading, error, makeRequest } = useRequestData();

  //Prev og next buttons "skift side"
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(0);

  //Bruger useEffect til at vente med at gøre vores request klar, indtil alt andet på siden er rendered.
  useEffect(() => {
    makeRequest("https://jsonplaceholder.typicode.com/posts");
  }, []);

  return (

    <div className="max-w-7xl m-auto text-center">
      <h1 className="text-center font-bold text-2xl m-5">JSONPlaceholder - Posts</h1>
      {isLoading && <Loader/>}
      {error && <h2>Error...</h2>}

      {/* For at sætte, hvor mange ting der kan være per side.
          currentPage bliver reset, så brugeren ikke mister data, når de fx. er på side 5 og trykker på 20 pr side.
      */}
      <div >
      {
          [ 5, 10, 20, 50, 100].map((o, index) => <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-thin text-sm  py-2 px-4 rounded-l m-1 rounded"  key={index} onClick={()=> {setItemsPerPage(o); setCurrentPage(0)}}>{o} pr. side</button>)
        }

        {/* 
        <button className="btn" onClick={() => {setItemsPerPage(10), setCurrentPage(0);}}>10 pr. side</button>
         <button className="btn" onClick={() => {setItemsPerPage(20), setCurrentPage(0);}}>20 pr. side</button>
          <button className="btn" onClick={() => {setItemsPerPage(100), setCurrentPage(0);}}>100 pr. side</button>
          */} 
      </div>

      {data && (
        <div className="inline-flex">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l m-1 rounded" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage <= 0}>Prev</button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l m-1 rounded" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage + 1 >= Math.ceil(data.length / itemsPerPage)}>Next</button>
        </div>
      )}

      <div className="flex flex-wrap justify-center">
      {data &&
        data
          .slice(
            currentPage * itemsPerPage,
            currentPage * itemsPerPage + itemsPerPage
          )
          .map((p) => (
       
              <div className="w-80 rounded overflow-hidden shadow-lg m-2 px-6 py-4 border-2 border-t-indigo-500" key={p.id}>
                <h2 className="font-bold text-xl mb-2">{p.title}</h2>
                {/* <p>{p.body}</p> */}
                <p>{p.id}</p>
                <Link to={"/post/" + p.id}><button>Læs mere</button></Link>
              </div>
          ))}
      </div> {/* END card */}


    </div>
  );
};

export default Posts;
