import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './index.scss'

function NavBar() {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <nav className={`win95-menu-bar${isMenuOpen ? ' is-menu-open' : ''}`}>
      <button
        type="button"
        className="win95-menu-bar__toggle"
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-controls="primary-navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {isMenuOpen ? (
          <span className="win95-menu-bar__toggle-close" aria-hidden="true">
            X
          </span>
        ) : (
          <span className="win95-menu-bar__toggle-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        )}
      </button>

      <div id="primary-navigation" className={`win95-menu-bar__links${isMenuOpen ? ' is-open' : ''}`}>
        <NavLink end to="/" className={({ isActive }) => (isActive ? 'is-active' : undefined)} onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink
          to="/education"
          className={({ isActive }) => (isActive ? 'is-active' : undefined)}
          onClick={closeMenu}
        >
          Education & Certifications
        </NavLink>
        <NavLink
          to="/background"
          className={({ isActive }) => (isActive ? 'is-active' : undefined)}
          onClick={closeMenu}
        >
          Professional background
        </NavLink>
        <NavLink
          to="/projects"
          className={() => (pathname.startsWith('/projects') ? 'is-active' : undefined)}
          onClick={closeMenu}
        >
          Projects
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? 'is-active' : undefined)}
          onClick={closeMenu}
        >
          Contact
        </NavLink>
      </div>
    </nav>
  )
}

export default NavBar