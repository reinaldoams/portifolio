import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

function NavBar() {
  return (
    <nav>
        <Link to="/">Main Page</Link>
        <Link to="/education">Education & Certifications</Link>
        <Link to="/background">Professional background</Link>
        {/* <Link to="/projects">Projects</Link> */}
        <Link to="/contact">Contact</Link>
    </nav>
  )
}

export default NavBar