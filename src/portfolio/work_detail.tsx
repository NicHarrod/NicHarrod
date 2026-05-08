import { useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { getWork } from './work_data'
import './work.css'

export default function WorkDetail() {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const work = id ? getWork(id) : undefined
  const [index, setIndex] = useState(0)

  if (!work) {
    return (
      <main className="portfolio-page">
        <p>Work not found.</p>
        <p>
          <Link to="/">Back to portfolio</Link>
        </p>
      </main>
    )
  }

  const images = work.images ?? []

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  return (
    <main className="portfolio-page">
      <header className="portfolio-header">
        <h1>{work.title}</h1>
        <p>{work.tagline}</p>
      </header>

      
        <div className="work-slideshow">
          {images.length > 0 ? (
            <div>
              <img src={images[index]} alt={`Slide ${index + 1}`} className="work-slide" />
              {work.image_captions && work.image_captions[index] && (
                <p className="slide-caption">{work.image_captions[index]}</p>
              )}
              <div className="slide-controls">
                <button onClick={prev} aria-label="Previous">Prev</button>
                <span>{index + 1} / {images.length}</span>
                <button onClick={next} aria-label="Next">Next</button>
              </div>
            </div>
          ) : (
            <p>No images for this work.</p>
          )}
        </div>

      <section className="work-detail">
        <div className="work-meta">
          {work.description ? <p>{work.description}</p> : null}
          {work.tags && work.tags.length > 0 ? (
            <ul className="work-tags">
              {work.tags.map((t) => (
                <li key={`${work.slug}-${t}`}>{t}</li>
              ))}
            </ul>
          ) : null}
        </div>


        <p>
          <Link to="/">Back to portfolio</Link> • <Link to="/edit">Edit works</Link>
        </p>
      </section>
    </main>
  )
}
