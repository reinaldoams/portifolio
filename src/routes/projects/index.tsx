import { Outlet } from 'react-router-dom'
import './index.scss'

export default function ProjectsLayout() {
  return (
    <div className="projects-layout">
      <Outlet />
    </div>
  )
}
