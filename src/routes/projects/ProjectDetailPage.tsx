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
        {project.tags.length > 0 ? (
          <section
            className="projects-detail__section projects-detail__section--tags"
            aria-labelledby="project-detail-tags-heading"
          >
            <h2 id="project-detail-tags-heading" className="projects-detail__section-title">
              Focus areas
            </h2>
            <ul className="projects-detail__tags">
              {project.tags.map((tag, i) => (
                <li key={`${tag}-${i}`} className="projects-detail__tag">
                  {tag}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
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
      {project.mainImage || project.gallery.length > 0 ? (
        <>
          <section className="projects-detail__gallery projects-detail__gallery--main" aria-label="Images">
            <ul className="projects-detail__gallery-list">
              <li key={project.mainImage} className="projects-detail__gallery-item">
                <img src={project.mainImage} alt={`${project.name} — image 1`} width={960} height={540} />
              </li>
            </ul>
          </section>

          {project.stack.length > 0 ? (
            <section
              className="projects-detail__section projects-detail__section--stack"
              aria-labelledby="project-detail-stack-heading"
            >
              <h2 id="project-detail-stack-heading" className="projects-detail__section-title">
                Stack
              </h2>
              <ul className="projects-detail__stack">
                {project.stack.map((item, i) => (
                  <li key={`${item}-${i}`} className="projects-detail__stack-item">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="projects-detail__gallery" aria-label="Images">
            <ul className="projects-detail__gallery-list">
              {project.gallery.map((img, i) => (
                <li key={img} className="projects-detail__gallery-item">
                  <img src={img} alt={`${project.name} — image ${i + 1}`} width={960} height={540} />
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : null}
    </article>
  )
}
