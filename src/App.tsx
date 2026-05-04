import { useState } from 'react'
import './App.scss'
import { Routes, Route, useNavigate, useOutlet } from 'react-router-dom'
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
      <rect x="3" y="3" width="26" height="26" fill="#000000" />
      <rect x="4" y="4" width="24" height="1" fill="#ffffff" />
      <rect x="5" y="4" width="22" height="1" fill="#c0c0c0" />
      <rect x="4" y="5" width="1" height="22" fill="#ffffff" />
      <rect x="27" y="5" width="1" height="22" fill="#808080" />
      <rect x="4" y="27" width="24" height="1" fill="#808080" />
      <rect x="5" y="5" width="22" height="5" fill="#000080" />
      <rect x="5" y="10" width="22" height="17" fill="#ffffff" />
      <rect x="17.5" y="6.5" width="2" height="2" fill="#ffffff" />
      <rect x="21" y="6.5" width="2" height="2" fill="#ffffff" />
      <rect x="24" y="6.5" width="2" height="2" fill="#ffffff" />
    </svg>
  )
}

/** Desktop shortcut icon: retro CRT with a “sprite” — suggests a playable toy. */
function DesktopGameExeIcon() {
  return (
    <svg
      className="win95-desktop-shortcut__svg"
      viewBox="0 0 32 32"
      shapeRendering="crispEdges"
      aria-hidden
      focusable="false"
    >
      <rect x="5" y="5" width="22" height="18" fill="#2a2a2a" stroke="#000" strokeWidth="1" />
      <rect x="7" y="7" width="18" height="12" fill="#0a1628" />
      <rect x="9" y="9" width="3" height="3" fill="#39ff14" />
      <rect x="13" y="9" width="5" height="2" fill="#ffaa00" />
      <rect x="20" y="9" width="3" height="3" fill="#00d4ff" />
      <rect x="9" y="13" width="14" height="2" fill="#ffff00" />
      <rect x="10" y="16" width="4" height="1" fill="#fff" />
      <rect x="15" y="16" width="6" height="1" fill="#fff" />
      <rect x="13" y="24" width="6" height="3" fill="#808080" />
      <rect x="11" y="27" width="10" height="2" fill="#606060" />
    </svg>
  )
}

function GameTitlebarIcon() {
  return (
    <svg
      className="win95-titlebar__icon win95-titlebar__icon--game"
      viewBox="0 0 18 18"
      shapeRendering="crispEdges"
      aria-hidden
      focusable="false"
    >
      <rect x="1" y="2" width="16" height="12" fill="#2a2a2a" />
      <rect x="3" y="4" width="12" height="8" fill="#051018" />
      <rect x="5" y="6" width="2" height="2" fill="#3f3" />
      <rect x="8" y="6" width="4" height="1" fill="#fa0" />
      <rect x="5" y="9" width="8" height="1" fill="#6cf" />
      <rect x="7" y="14" width="4" height="2" fill="#888" />
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
