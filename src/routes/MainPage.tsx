import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './contact/index.scss'
import './MainPage.scss'

const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000
const INDUSTRY_START = new Date(2021, 8, 1) // September 2021 (month 0-based)

/** Projects shortcut icon. */
function IconProjects() {
  return (
    <svg
      className="contact-icon-item__svg"
      viewBox="0 0 32 32"
      aria-hidden
      focusable="false"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M5 10.5A2.5 2.5 0 0 1 7.5 8H13l2 2h9.5A2.5 2.5 0 0 1 27 12.5v9A2.5 2.5 0 0 1 24.5 24h-17A2.5 2.5 0 0 1 5 21.5z"
      />
      <path d="M5 13h22M10 17h12M10 20h8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  )
}

function MainPage() {
  const [yearsInIndustry] = useState(
    () => ((Date.now() - INDUSTRY_START.getTime()) / MS_PER_YEAR).toFixed(1),
  )

  return (
    <div className="main-page">
      <div className="main-page__hero">
        <p className="main-page__eyebrow">FULL-STACK DEVELOPER · DIGITAL CRAFT · BRAZIL</p>
        <h1>Hi, I&apos;m Reinaldo Assis.</h1>
        <p className="main-page__lead">
          I&apos;m a Web Developer with a passion for creating beautiful and functional websites.
        </p>
        <p className="main-page__copy">
          I have been working in the industry for {yearsInIndustry} years. Navigate through the pages to know more
          about my services.
        </p>
      </div>
      <div className="main-page__contact-style-icons">
        <Link to="/projects" className="contact-icon-item main-page__projects-link">
          <span className="contact-icon-item__graphic">
            <IconProjects />
          </span>
          <span className="contact-icon-item__label">
            <span>Explore projects</span>
            <span className="main-page__projects-sublabel">Selected work &amp; case studies</span>
          </span>
          <span className="main-page__projects-arrow" aria-hidden="true">
            ↗
          </span>
        </Link>
      </div>
    </div>
  )
}

export default MainPage
