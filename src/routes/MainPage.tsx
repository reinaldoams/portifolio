import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './contact/index.scss'
import './MainPage.scss'

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000
const INDUSTRY_START = new Date(2021, 8, 1) // September 2021 (month 0-based)

/** Win95-style folder with document lines (projects). */
function IconProjects() {
  return (
    <svg
      className="contact-icon-item__svg"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
      aria-hidden
      focusable="false"
    >
      {/* Folder tab */}
      <path
        fill="#ffcc00"
        stroke="#000"
        strokeWidth="1"
        d="M6 12 L10 8 L20 8 L22 10 L26 10 L26 12 L6 12 Z"
      />
      {/* Folder body */}
      <rect x="5" y="12" width="22" height="14" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
      {/* Paper inside */}
      <rect x="9" y="15" width="14" height="9" fill="#ffffff" stroke="#000" strokeWidth="1" />
      <line x1="11" y1="18" x2="21" y2="18" stroke="#000" strokeWidth="1" />
      <line x1="11" y1="21" x2="19" y2="21" stroke="#000" strokeWidth="1" />
    </svg>
  )
}

function MainPage() {
  const [yearsInIndustry] = useState(
    () => ((Date.now() - INDUSTRY_START.getTime()) / MS_PER_YEAR).toFixed(1),
  )

  return (
    <div>
      <p>
        Hi, My name is Reinaldo Assis! :)
        <br />
        <br />
        I'm a Web Developer with a passion for creating beautiful and functional websites.
        <br />
        I have been working in the industry for {yearsInIndustry} years.
        <br />
        <br />
        Navigate through the pages to know more about my services!
      </p>
      <div className="main-page__contact-style-icons">
        <Link to="/projects" className="contact-icon-item">
          <span className="contact-icon-item__graphic">
            <IconProjects />
          </span>
          <span className="contact-icon-item__label">
            Projects
          </span>
        </Link>
      </div>
    </div>
  )
}

export default MainPage
