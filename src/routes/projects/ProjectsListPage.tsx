import { Link } from 'react-router-dom'
import { PROJECTS } from '../../data/projectsData'

export default function ProjectsListPage() {
  return (
    <div className="projects-list">
      <ul className="projects-list__grid">
        {PROJECTS.map((p) => (
          <li key={p.slug} className="projects-list__item">
            <Link
              className="projects-list__tile"
              to={`/projects/${p.slug}`}
              aria-label={`${p.name}, ${p.year}`}
            >
              <span className="projects-list__thumb">
                <img className="projects-list__img" src={p.mainImage} alt="" width={480} height={480} />
              </span>
              <span className="projects-list__info">
                <span className="projects-list__name">{p.name}</span>
                <span className="projects-list__year">{p.year}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
