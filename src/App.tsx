import { useState } from 'react'
import './App.scss'
import { Routes, Route, useNavigate, useOutlet } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import MainPage from './routes/MainPage'
import NavBar from './components/NavBar'
import { Win95ScrollBox } from './components/Win95ScrollBox'
import EducationPage from './routes/education'
import ProjectsLayout from './routes/projects'
import ProjectsListPage from './routes/projects/ProjectsListPage'
import ProjectDetailPage from './routes/projects/ProjectDetailPage'
import BackgroundPage from './routes/background'
import ContactPage from './routes/contact'
import PacketBreakerGame from './components/playAGame/PacketBreakerGame'

type ActiveWindow = 'portfolio' | 'game' | null

function BodySwitcher() {
  const outlet = useOutlet()
  return (
    <main className="win95-window__body">
      <Win95ScrollBox>{outlet}</Win95ScrollBox>
    </main>
  )
}

/** Terminal-style portfolio shortcut icon: a compact window with a few interface details. */
function DesktopExeIcon() {
  return (
    <svg
      className="win95-desktop-shortcut__svg"
      viewBox="0 0 32 32"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="portfolio-shortcut-gradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#9dffb0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#138a30" stopOpacity="0.72" />
        </linearGradient>
      </defs>
      <rect x="4" y="5" width="24" height="22" rx="6" fill="url(#portfolio-shortcut-gradient)" opacity="0.42" />
      <rect x="4" y="5" width="24" height="22" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 11.5h21" stroke="currentColor" strokeOpacity="0.7" strokeWidth="1.2" />
      <circle cx="9" cy="8.5" r="1" fill="#9dffb0" />
      <circle cx="12.5" cy="8.5" r="1" fill="#22c74a" />
      <path d="M9 17h9M9 21h13" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  )
}

/** Desktop shortcut icon for the small playable experiment. */
function DesktopGameExeIcon() {
  return (
    <svg
      className="win95-desktop-shortcut__svg"
      viewBox="0 0 32 32"
      aria-hidden
      focusable="false"
    >
      <rect x="4" y="5" width="24" height="19" rx="6" fill="#020602" fillOpacity="0.76" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10h16M8 14h5M8 18h9" stroke="#9dffb0" strokeLinecap="round" strokeWidth="1.5" />
      <circle cx="22" cy="14" r="2.2" fill="#33ff66" />
      <path d="M13 24v3M19 24v3M10 27h12" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  )
}

function GameTitlebarIcon() {
  return (
    <svg
      className="win95-titlebar__icon win95-titlebar__icon--game"
      viewBox="0 0 18 18"
      aria-hidden
      focusable="false"
    >
      <rect x="1.5" y="2" width="15" height="11" rx="3" fill="#020602" fillOpacity="0.76" stroke="currentColor" strokeWidth="1" />
      <path d="M4.5 6h5M4.5 9h3" stroke="#9dffb0" strokeLinecap="round" strokeWidth="1" />
      <circle cx="13" cy="7" r="1.4" fill="#33ff66" />
      <path d="M7 14v2M11 14v2M5 16h8" stroke="currentColor" strokeLinecap="round" strokeWidth="1" />
    </svg>
  )
}

type DesktopWindowSwitcherProps = {
  activeWindow: ActiveWindow
  setActiveWindow: (w: ActiveWindow) => void
}

function DesktopWindowSwitcher({ activeWindow, setActiveWindow }: DesktopWindowSwitcherProps) {
  const navigate = useNavigate()

  return activeWindow === 'portfolio' ? (
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
            onClick={() => setActiveWindow(null)}
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
            onClick={() => setActiveWindow(null)}
          >
            ×
          </button>
        </div>
      </div>
      <NavBar />
      <div className="win95-window__route-mount">
        <Routes>
          <Route element={<BodySwitcher />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/background" element={<BackgroundPage />} />
            <Route path="/projects" element={<ProjectsLayout />}>
              <Route index element={<ProjectsListPage />} />
            </Route>
            <Route path="/contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  ) : activeWindow === 'game' ? (
    <div className="win95-window win95-window--app win95-window--game">
      <div className="win95-titlebar">
        <GameTitlebarIcon />
        <span className="win95-titlebar__text">Play a game!.exe</span>
        <div className="win95-titlebar__controls">
          <button
            type="button"
            className="win95-titlebar__control"
            aria-label="Minimize"
            onClick={() => setActiveWindow(null)}
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
            onClick={() => setActiveWindow(null)}
          >
            ×
          </button>
        </div>
      </div>
      <main className="win95-window__body win95-window__body--game">
        <PacketBreakerGame />
      </main>
    </div>
  ) : (
    <div className="win95-desktop-icons">
      <div className="win95-desktop-icons__row">
        <button
          type="button"
          className="win95-desktop-shortcut"
          onClick={() => {
            navigate('/')
            setActiveWindow('portfolio')
          }}
        >
          <span className="win95-desktop-shortcut__graphic" aria-hidden="true">
            <DesktopExeIcon />
          </span>
          <span className="win95-desktop-shortcut__label">reinaldo_portfolio.exe</span>
        </button>
        <button type="button" className="win95-desktop-shortcut" onClick={() => setActiveWindow('game')}>
          <span className="win95-desktop-shortcut__graphic" aria-hidden="true">
            <DesktopGameExeIcon />
          </span>
          <span className="win95-desktop-shortcut__label">Play a game!.exe</span>
        </button>
      </div>
    </div>
  )
}

function App() {
  const [activeWindow, setActiveWindow] = useState<ActiveWindow>('portfolio')

  return (
    <div className="win95-desktop">
      <div className="win95-aura" aria-hidden="true">
        <span className="win95-aura__blob win95-aura__blob--a" />
        <span className="win95-aura__blob win95-aura__blob--b" />
        <span className="win95-aura__blob win95-aura__blob--c" />
        <span className="win95-aura__blob win95-aura__blob--d" />
      </div>
      <Analytics />
      <Routes>
        <Route
          path="/projects/:slug"
          element={
            <div className="projects-detail-fullscreen">
              <Win95ScrollBox>
                <ProjectDetailPage />
              </Win95ScrollBox>
            </div>
          }
        />
        <Route path="*" element={<DesktopWindowSwitcher activeWindow={activeWindow} setActiveWindow={setActiveWindow} />} />
      </Routes>
    </div>
  )
}

export default App
