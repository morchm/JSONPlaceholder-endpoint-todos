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

    <div>
      <h1>JSONPlaceholder - Posts</h1>
      {isLoading && <Loader/>}
      {error && <h2>Error...</h2>}

      {/* For at sætte, hvor mange ting der kan være per side.
          currentPage bliver reset, så brugeren ikke mister data, når de fx. er på side 5 og trykker på 20 pr side.
      */}
      <div>
      {
          [ 5, 10, 20, 50, 100].map(o => <button className="btn" onClick={()=> {setItemsPerPage(o); setCurrentPage(0)}}>{o} pr. side</button>)
        }

        {/* 
        <button className="btn" onClick={() => {setItemsPerPage(10), setCurrentPage(0);}}>10 pr. side</button>
         <button className="btn" onClick={() => {setItemsPerPage(20), setCurrentPage(0);}}>20 pr. side</button>
          <button className="btn" onClick={() => {setItemsPerPage(100), setCurrentPage(0);}}>100 pr. side</button>
          */} 
      </div>

      {data && (
        <>
          <button className="btn" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage <= 0}>Prev</button>
          <button className="btn" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage + 1 >= Math.ceil(data.length / itemsPerPage)}>Next</button>
        </>
      )}

      {data &&
        data
          .slice(
            currentPage * itemsPerPage,
            currentPage * itemsPerPage + itemsPerPage
          )
          .map((p) => (
            <div className="card" key={p.id}>
              <h2 className="text-xl font-bold">{p.title}</h2>
              {/* <p>{p.body}</p> */}
              <p>{p.id}</p>
              <Link to={"/post/" + p.id}><button>Læs mere</button></Link>
            </div>
          ))}
    </div>
  );
};

export default Posts;
