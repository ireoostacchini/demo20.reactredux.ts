import React from "react"
import { NavLink } from "react-router-dom"

//react router examples use Link - NavLink gives you mouse pointers

const Menu = () => (
  <div>
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/Page2">Page 2</NavLink>
        </li>
        <li>
          <NavLink to="/Countries" className="menu-countries">
            Countries
          </NavLink>
        </li>
      </ul>
    </nav>
  </div>
)

export default Menu
