import { Link, useParams } from 'react-router-dom'
import { getProjectBySlug } from '../../data/projectsData'

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
        <p className="projects-detail__link-wrap">
          <a className="projects-detail__external" href={project.url} target="_blank" rel="noreferrer">
            {project.url}
          </a>
        </p>
      </header>
      <section className="projects-detail__hero" aria-label="Main preview">
        <img className="projects-detail__hero-img" src={project.mainImage} alt="" width={960} height={960} />
      </section>
      {project.gallery.length > 0 ? (
        <section className="projects-detail__gallery" aria-label="More images">
          <h2 className="projects-detail__gallery-title">Gallery</h2>
          <ul className="projects-detail__gallery-grid">
            {project.gallery.map((src, i) => (
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
