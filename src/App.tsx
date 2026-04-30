import { useState } from 'react'
import './App.scss'
import { Routes, Route } from 'react-router-dom'
import MainPage from './routes/MainPage'
import NavBar from './components/NavBar'
import { Win95ScrollBox } from './components/Win95ScrollBox'
import EducationPage from './routes/education'
import ProjectsPage from './routes/projects'
import BackgroundPage from './routes/background'
import ContactPage from './routes/contact'

/** Win95-style .exe icon: miniature app window (beveled frame, navy title bar, three control pixels). */
function DesktopExeIcon() {
  return (
    <svg
      className="win95-desktop-shortcut__svg"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
      aria-hidden
      focusable="false"
    >
      {/* Outer frame (large window in viewBox; controls stay 2×2 px) */}
      <rect x="3" y="3" width="26" height="26" fill="#000000" />
      {/* Raised chrome: light top/left, dark bottom/right */}
      <rect x="4" y="4" width="24" height="1" fill="#ffffff" />
      <rect x="5" y="4" width="22" height="1" fill="#c0c0c0" />
      <rect x="4" y="5" width="1" height="22" fill="#ffffff" />
      <rect x="27" y="5" width="1" height="22" fill="#808080" />
      <rect x="4" y="27" width="24" height="1" fill="#808080" />
      {/* Title bar + client */}
      <rect x="5" y="5" width="22" height="5" fill="#000080" />
      <rect x="5" y="10" width="22" height="17" fill="#ffffff" />
      {/* Min / max / close — same 2×2 glyph size, pinned top-right */}
      <rect x="17.5" y="6.5" width="2" height="2" fill="#ffffff" />
      <rect x="21" y="6.5" width="2" height="2" fill="#ffffff" />
      <rect x="24" y="6.5" width="2" height="2" fill="#ffffff" />
    </svg>
  )
}

function App() {
  const [windowOpen, setWindowOpen] = useState(true)

  return (
    <div className="win95-desktop">
      {windowOpen ? (
        <div className="win95-window win95-window--app">
          <div className="win95-titlebar">
            <img
              className="win95-titlebar__icon"
              src="/profile_picture.jpeg"
              alt=""
              width={27}
              height={27}
              decoding="async"
            />
            <span className="win95-titlebar__text">reinaldo_portfolio.exe</span>
            <div className="win95-titlebar__controls">
              <button
                type="button"
                className="win95-titlebar__control"
                aria-label="Minimize"
                onClick={() => setWindowOpen(false)}
              >
                _
              </button>
              <span className="win95-titlebar__control win95-titlebar__control--disabled" aria-hidden="true">
                □
              </span>
              <button
                type="button"
                className="win95-titlebar__control win95-titlebar__control--close"
                aria-label="Close"
                onClick={() => setWindowOpen(false)}
              >
                ×
              </button>
            </div>
          </div>
          <NavBar />
          <main className="win95-window__body">
            <Win95ScrollBox>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/background" element={<BackgroundPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </Win95ScrollBox>
          </main>
        </div>
      ) : (
        <div className="win95-desktop-icons">
          <button
            type="button"
            className="win95-desktop-shortcut"
            onClick={() => setWindowOpen(true)}
          >
            <span className="win95-desktop-shortcut__graphic" aria-hidden="true">
              <DesktopExeIcon />
            </span>
            <span className="win95-desktop-shortcut__label">reinaldo_portfolio.exe</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default App
