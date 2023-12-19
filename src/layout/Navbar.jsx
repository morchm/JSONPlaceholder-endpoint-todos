import React from "react";
import { NavLink } from "react-router-dom";
import { IoLogoOctocat } from "react-icons/io";


const Navbar = () => {
  return (
    <nav  className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a className="font-semibold text-xl tracking-tight" href="#"><IoLogoOctocat className="text-3xl"/></a>
      </div>

      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">

        <div className="text-sm lg:flex-grow">
        <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/">Home</NavLink>
        <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/about">Om os</NavLink>
        <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/news">Nyheder</NavLink>
        <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/contact">Kontakt</NavLink>
        <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/admin">ADMIN</NavLink>
        <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/ghibli">Ghibli</NavLink>
        <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/shopping">Shoppingliste</NavLink>
        {/* ---------- JSONPlaceholder Links ---------- */}
        <div className="dropdown">
          <button className="dropbtn text-teal-200 hover:text-white">JSONPlaceholder</button>
          <div className="dropdown-content">
             <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to="/posts">JSON Placeholder</NavLink>
             <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to="/postsadmin">JSONP-Admin</NavLink>
             <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to="/photos">Fotoer</NavLink>
             <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to="/todos">Todos</NavLink>
             <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to="/everything">Everthing</NavLink>
             <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to="/topheadlines">Topheadlines</NavLink>
          </div>
        </div>
        {/* ---------- SWAPI Links ---------- */}
        <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4" to="/starships">Starships</NavLink>
        {/* ---------- Rapid API Links ----------*/}
        <div className="dropdown">
          <button className="dropbtn text-teal-200 hover:text-white">Rapid API</button>
          <div className="dropdown-content">
            <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to="/hobby">Hobbier</NavLink>
            <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to="/facts">Facts</NavLink>
            <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to="/lovecalc">Love Calculator</NavLink>
            <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to="/dadjoke">Far Jokes</NavLink>
          </div>
        </div>

             {/* ---------- Open Weather ---------- */}
             <div className="dropdown">
            <button className="dropbtn text-teal-200 hover:text-white">Open Weather</button>
            <div className="dropdown-content">
              <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to="/weather1">CurrentWeather m/input</NavLink>
              <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to="/weather2">CurrentWeather m/input & datalist</NavLink>
              <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to="/weather3">CurrentWeather m/input & dawa-data</NavLink>
              <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to="/weather4">CurrentWeather m/input & LeafletMap</NavLink>
              <NavLink className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white" to="/pollution">Pollution</NavLink>
            </div>
          </div>


        </div>

      </div>
    </nav>
  );
};

export default Navbar;
