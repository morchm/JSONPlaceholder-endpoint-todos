import Error from "../../components/Error";
import Loader from "../../components/Loader";
import useRequestData from "../../hooks/useRequestData";
import { useEffect, useState } from "react";
import { BsHearts  } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { MdHeartBroken } from "react-icons/md";



export default function LoveCalc(){
    const { makeRequest, isLoading, data, error } = useRequestData();

    const [fname, setFname] = useState("Frank");
    const [sname, setSname] = useState("Alice");

    const handleSubmit = e => {
      makeRequest("https://love-calculator.p.rapidapi.com/getPercentage", "GET", null, {
        'X-RapidAPI-Key': '05f10d1657msh9ee107d4bd0bdebp1ba22fjsn4b725733d903',
        'X-RapidAPI-Host': 'love-calculator.p.rapidapi.com'
      },
      {fname, sname}
      )
    }
  
    useEffect(()=>{
      handleSubmit();
    }, [])


    return(
        <div className="max-w-7xl m-auto">
        <h1 className="text-center font-bold text-2xl m-5">Love Calculator</h1>
        {isLoading && <Loader />}
        {error && <Error />}
  
        {
          data && 
            <div className="flex flex-wrap justify-center flex-col">

                    <input type="text" placeholder="Person 1" className="shadow-lg rounded border-2 p-1 m-auto text-center my-2"
                         onChange={e => setFname(e.target.value)}
                         value={fname}
                         required
                    />
                    <BsHearts  className="m-auto text-xl text-red-600"/>

                    <input type="text"  placeholder="Person 2" className="shadow-lg rounded border-2 p-1 m-auto text-center my-2"
                    onChange={e => setSname(e.target.value)}
                    value={sname}
                    required
                    />
                    
                    <div className="my-4">
                        <h4 className="text-center font-bold">Procent: <span className={data.percentage>=50 ? "done" : "notDone" }>{data.percentage}%</span> </h4>
                        <h2 className="text-center font-bold">Resultat: {data.result}</h2>  
                        { data.percentage>=50 ? <FaHeart className="m-auto text-7xl text-pink-500
                        "/> : <MdHeartBroken className="m-auto text-7xl text-red-900"/> }
                    </div>

              <button className="w-28 bg-pink-300 hover:bg-pink-500 rounded-full mx-2 p-1 my-2 text-center self-center font-bold text-white" 
              onClick={handleSubmit}
              >Match?</button>
            </div>
        }
        
      </div>
    )
}