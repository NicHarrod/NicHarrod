import { useState } from 'react'
import { getWorks, getWork, createWork, updateWork, deleteWork, WorkItem } from './work_data'
import { Link, useNavigate } from 'react-router-dom'

export default function WorkEditor() {
  const navigate = useNavigate()
  const [items, setItems] = useState<WorkItem[]>(() => getWorks().slice())
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [form, setForm] = useState<any>({ title: '', tagline: '', description: '', tags: '', images: '' })

  const startEdit = (slug?: string) => {
    if (!slug) {
      setEditingSlug(null)
      setForm({ title: '', tagline: '', description: '', tags: '', images: '' })
      return
    }
    const w = getWork(slug)
    if (!w) return
    setEditingSlug(slug)
    setForm({
      title: w.title,
      tagline: w.tagline,
      description: w.description ?? '',
      tags: (w.tags || []).join(', '),
      images: (w.images || []).join(', '),
    })
  }

  const save = () => {
    const payload = {
      title: form.title,
      tagline: form.tagline,
      description: form.description,
      tags: form.tags.split(',').map((s: string) => s.trim()).filter(Boolean),
      images: form.images.split(',').map((s: string) => s.trim()).filter(Boolean),
    }

    if (editingSlug) {
      updateWork(editingSlug, payload)
    } else {
      // create with slug derived from title
      const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')
      createWork({ ...payload, slug })
    }

    setItems(getWorks().slice())
    setEditingSlug(null)
    setForm({ title: '', tagline: '', description: '', tags: '', images: '' })
  }

  const remove = (slug: string) => {
    if (!confirm(`Delete work "${slug}"?`)) return
    deleteWork(slug)
    setItems(getWorks().slice())
    if (editingSlug === slug) {
      setEditingSlug(null)
      setForm({ title: '', tagline: '', description: '', tags: '', images: '' })
    }
  }

  return (
    <main className="portfolio-page">
      <header className="portfolio-header">
        <h1>Edit Works</h1>
        <p>Simple editor for portfolio works. This is backed by an in-memory API; swap to a server API later.</p>
      </header>

      <div className="work-editor">
        <div className="editor-list">
          <button onClick={() => startEdit()}>+ Add new work</button>
          <ul>
            {items.map((w) => (
              <li key={w.slug}>
                <strong>{w.title}</strong> — {w.tagline}
                <div>
                  <button onClick={() => startEdit(w.slug)}>Edit</button>
                  <button onClick={() => navigate(`/works?id=${w.slug}`)}>View</button>
                  <button onClick={() => remove(w.slug)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="editor-form">
          <h2>{editingSlug ? `Editing ${editingSlug}` : 'New work'}</h2>
          <label>
            Title
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </label>
          <label>
            Tagline
            <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
          </label>
          <label>
            Description
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </label>
          <label>
            Tags (comma separated)
            <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          </label>
          <label>
            Images (comma separated paths)
            <input value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} />
          </label>

          <div className="form-actions">
            <button onClick={save}>Save</button>
            <button onClick={() => { setEditingSlug(null); setForm({ title: '', tagline: '', description: '', tags: '', images: '' }) }}>Cancel</button>
            <Link to="/">Back to portfolio</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
