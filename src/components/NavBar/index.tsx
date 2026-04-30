import React from 'react'
import { NavLink } from 'react-router-dom'
import './index.scss'

function NavBar() {
  return (
    <nav className="win95-menu-bar">
      <NavLink end to="/" className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
        Main Page
      </NavLink>
      <NavLink
        to="/education"
        className={({ isActive }) => (isActive ? 'is-active' : undefined)}
      >
        Education & Certifications
      </NavLink>
      <NavLink
        to="/background"
        className={({ isActive }) => (isActive ? 'is-active' : undefined)}
      >
        Professional background
      </NavLink>
      {/* <NavLink to="/projects" className={({ isActive }) => (isActive ? 'is-active' : undefined)}>Projects</NavLink> */}
      <NavLink to="/contact" className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
        Contact
      </NavLink>
    </nav>
  )
}

export default NavBar