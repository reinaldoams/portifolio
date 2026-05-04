import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import './App.scss'
import { Routes, Route, useLocation, useNavigate, useOutlet } from 'react-router-dom'
import MainPage from './routes/MainPage'
import NavBar from './components/NavBar'
import { Win95ScrollBox } from './components/Win95ScrollBox'
import EducationPage from './routes/education'
import ProjectsLayout from './routes/projects'
import ProjectsListPage from './routes/projects/ProjectsListPage'
import ProjectDetailPage from './routes/projects/ProjectDetailPage'
import BackgroundPage from './routes/background'
import ContactPage from './routes/contact'

type ProjectsPhase = 'idle' | 'blinding' | 'shown'

function BodySwitcher() {
  const outlet = useOutlet()
  const { pathname } = useLocation()
  const isProjects = pathname.startsWith('/projects')
  const [phase, setPhase] = useState<ProjectsPhase>(() =>
    pathname.startsWith('/projects') ? 'shown' : 'idle',
  )
  const [frozenPreProjectsOutlet, setFrozenPreProjectsOutlet] = useState<ReactNode>(null)

  useLayoutEffect(() => {
    if (!isProjects) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- snapshot last non-projects outlet for blind handoff
      setFrozenPreProjectsOutlet(outlet)
    }
  }, [isProjects, outlet])

  const outletForMain: ReactNode = !isProjects
    ? outlet
    : phase === 'shown'
      ? null
      : (frozenPreProjectsOutlet ?? outlet)

  useLayoutEffect(() => {
    if (!isProjects) {
      const id = window.setTimeout(() => setPhase('idle'), 0)
      return () => window.clearTimeout(id)
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      const id = window.setTimeout(() => setPhase('shown'), 0)
      return () => window.clearTimeout(id)
    }

    if (phase === 'idle') {
      const id = window.setTimeout(() => setPhase('blinding'), 0)
      return () => window.clearTimeout(id)
    }

    if (phase === 'blinding') {
      const t = window.setTimeout(() => setPhase('shown'), 480)
      return () => window.clearTimeout(t)
    }
  }, [isProjects, phase])

  const outletInMain = !isProjects || (isProjects && phase !== 'shown')
  const outletInProjects = isProjects && phase === 'shown'
  const gridProjects = isProjects && phase === 'shown'
  const mainShellHidden = isProjects && phase === 'shown'

  return (
    <div className={`body-switcher${gridProjects ? ' body-switcher--projects' : ''}`}>
      <div className="body-switcher__row body-switcher__row--main">
        <main
          className={`win95-window__body${isProjects && phase === 'blinding' ? ' win95-window__body--blind-up' : ''}`}
          aria-hidden={mainShellHidden ? true : undefined}
          inert={mainShellHidden ? true : undefined}
        >
          <Win95ScrollBox>{outletInMain ? outletForMain : null}</Win95ScrollBox>
        </main>
      </div>
      <div className="body-switcher__row body-switcher__row--projects">
        <div className="win95-window__projects-viewport">
          {outletInProjects ? <Win95ScrollBox>{outlet}</Win95ScrollBox> : null}
        </div>
      </div>
    </div>
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

function App() {
  const [windowOpen, setWindowOpen] = useState(true)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const projectsFullBleed = pathname.startsWith('/projects')
  const routeMountRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = document.documentElement
    if (!pathname.startsWith('/projects')) {
      root.style.removeProperty('--win95-projects-layer-top')
      return
    }
    const update = () => {
      const el = routeMountRef.current
      if (!el) return
      root.style.setProperty('--win95-projects-layer-top', `${el.getBoundingClientRect().top}px`)
    }
    update()
    window.addEventListener('resize', update)
    const ro = new ResizeObserver(update)
    const el = routeMountRef.current
    if (el) ro.observe(el)
    return () => {
      root.style.removeProperty('--win95-projects-layer-top')
      window.removeEventListener('resize', update)
      ro.disconnect()
    }
  }, [pathname])

  return (
    <div className={`win95-desktop${projectsFullBleed ? ' win95-desktop--projects-route' : ''}`}>
      {windowOpen ? (
        <div
          className={
            projectsFullBleed
              ? 'win95-window win95-window--app win95-window--app--projects'
              : 'win95-window win95-window--app'
          }
        >
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
          <div ref={routeMountRef} className="win95-window__route-mount">
            <Routes>
              <Route element={<BodySwitcher />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/background" element={<BackgroundPage />} />
                <Route path="/projects" element={<ProjectsLayout />}>
                  <Route index element={<ProjectsListPage />} />
                  <Route path=":slug" element={<ProjectDetailPage />} />
                </Route>
                <Route path="/contact" element={<ContactPage />} />
              </Route>
            </Routes>
          </div>
        </div>
      ) : (
        <div className="win95-desktop-icons">
          <button
            type="button"
            className="win95-desktop-shortcut"
            onClick={() => {
              navigate('/')
              setWindowOpen(true)
            }}
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
