import React from 'react'
import { NavLink } from 'react-router-dom'


const NavbarAdmin = () => {

    return (
        <nav>

            <div><NavLink to="/admin" >Dashboard</NavLink></div>
            <div><NavLink to="/" >Forsiden</NavLink></div>

        </nav>
    )
}

export default NavbarAdmin