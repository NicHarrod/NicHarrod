import type { VercelRequest, VercelResponse } from '@vercel/node'

type Beacon = {
  page?: string
  path?: string
  referrer?: string | null
  screen?: string
  viewport?: string
  dpr?: number
  tz?: string
  lang?: string
}

const header = (req: VercelRequest, name: string): string | null => {
  const raw = req.headers[name]
  const value = Array.isArray(raw) ? raw[0] : raw
  return value || null
}

// Vercel percent-encodes its geo headers, e.g. x-vercel-ip-city: "New%20York".
const geo = (req: VercelRequest, name: string): string | null => {
  const value = header(req, name)
  if (!value) return null
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

const parseBody = (raw: unknown): Beacon => {
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as Beacon
    } catch {
      return {}
    }
  }
  if (typeof raw === 'object' && raw !== null) return raw as Beacon
  return {}
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).end()
    return
  }

  const body = parseBody(req.body)
  const forwarded = header(req, 'x-forwarded-for')

  console.log(
    JSON.stringify({
      tag: 'visit',
      at: new Date().toISOString(),
      page: body.page ?? null,
      path: body.path ?? null,
      referrer: body.referrer ?? null,
      ip: forwarded ? forwarded.split(',')[0].trim() : null,
      country: geo(req, 'x-vercel-ip-country'),
      region: geo(req, 'x-vercel-ip-country-region'),
      city: geo(req, 'x-vercel-ip-city'),
      lat: geo(req, 'x-vercel-ip-latitude'),
      lon: geo(req, 'x-vercel-ip-longitude'),
      edge_tz: geo(req, 'x-vercel-ip-timezone'),
      client_tz: body.tz ?? null,
      lang: body.lang ?? header(req, 'accept-language'),
      screen: body.screen ?? null,
      viewport: body.viewport ?? null,
      dpr: body.dpr ?? null,
      ua: header(req, 'user-agent'),
    }),
  )

  res.status(204).end()
}
