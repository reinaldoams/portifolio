import { Link, useParams } from 'react-router-dom'
import { getProjectBySlug } from '../../data/projectsData'
import './index.scss'

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <div className="projects-detail projects-detail--missing">
        <p className="projects-detail__missing">Project not found.</p>
        <Link className="projects-detail__back" to="/projects">
          ← Back to projects
        </Link>
      </div>
    )
  }

  const images = [project.mainImage, ...project.gallery]

  return (
    <article className="projects-detail">
      <nav className="projects-detail__nav">
        <Link className="projects-detail__back" to="/projects">
          ← Projects
        </Link>
      </nav>
      <header className="projects-detail__header">
        <h1 className="projects-detail__title">{project.name}</h1>
        <p className="projects-detail__meta">{project.year}</p>
        <p className="projects-detail__summary">{project.summary}</p>
        <p className="projects-detail__description">{project.description}</p>
        <div className="projects-detail__cta-wrap">
          <a
            className="projects-detail__demo"
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`View live demo: ${project.url}`}
          >
            <svg
              className="projects-detail__demo-icon"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              aria-hidden
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
              />
            </svg>
            <span>View Live Demo</span>
          </a>
        </div>
      </header>
      {images.length > 0 ? (
        <section className="projects-detail__gallery" aria-label="More images">
          <ul className="projects-detail__gallery-list">
            {images.map((src, i) => (
              <li key={src} className="projects-detail__gallery-item">
                <img src={src} alt={`${project.name} — image ${i + 1}`} width={960} height={540} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}
