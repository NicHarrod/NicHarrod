import type { WorkItem } from './work_data'
import { Link } from 'react-router-dom'

type WorkListingProps = {
  works: WorkItem[]
}

export function WorkListing({ works }: WorkListingProps) {
  if (works.length === 0) {
    return <p className="portfolio-empty">No works found in /works yet.</p>
  }

  return (
    <section className="work-grid" aria-label="Work list">
      {works.map((work) => (
        <Link key={work.slug} to={`/works?id=${encodeURIComponent(work.slug)}`} className="work-card-link">
          <article className="work-card">
          {work.thumbnail ? (
            <img className="work-thumb" src={work.thumbnail} alt={`${work.title} thumbnail`} loading="lazy" />
          ) : null}
          <div className="work-content">
            <h2>{work.title}</h2>
            <p>{work.tagline}</p>
            {work.tags && work.tags.length > 0 ? (
              <ul className="work-tags" aria-label={`${work.title} tags`}>
                {work.tags.map((tag) => (
                  <li key={`${work.slug}-${tag}`}>{tag}</li>
                ))}
              </ul>
            ) : null}
          </div>
          </article>
        </Link>
      ))}
    </section>
  )
}
