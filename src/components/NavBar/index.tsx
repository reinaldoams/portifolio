import { NavLink, useLocation } from 'react-router-dom'
import './index.scss'

function NavBar() {
  const { pathname } = useLocation()

  return (
    <nav className="win95-menu-bar">
      <NavLink end to="/" className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
        Home
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
      <NavLink
        to="/projects"
        className={() => (pathname.startsWith('/projects') ? 'is-active' : undefined)}
      >
        Projects
      </NavLink>
      <NavLink to="/contact" className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
        Contact
      </NavLink>
    </nav>
  )
}

export default NavBar