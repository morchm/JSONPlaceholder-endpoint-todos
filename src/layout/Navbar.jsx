import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div>
        <a href="#">LOGO A/S</a>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">Om os</NavLink>
        <NavLink to="/posts">JSON Placeholder</NavLink>
        <NavLink to="/news">Nyheder</NavLink>
        <NavLink to="/contact">Kontakt</NavLink>
        <NavLink to="/photos">Fotoer</NavLink>
        <NavLink to="/admin">ADMIN</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
