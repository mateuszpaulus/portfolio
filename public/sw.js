const CACHE_VERSION = 'v2'
const STATIC_CACHE = `paulus-static-${CACHE_VERSION}`
const DYNAMIC_CACHE = `paulus-dynamic-${CACHE_VERSION}`
const OFFLINE_URL = '/offline'

const PRECACHE_ASSETS = [
  '/',
  '/pl',
  '/en',
  '/offline',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
]

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INSTALL — precache static assets
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
      .catch(err => console.error('[SW] Precache failed:', err))
  )
})

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ACTIVATE — delete old caches
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  )
})

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FETCH — strategy per resource type
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Ignore non-GET and cross-origin requests
  if (request.method !== 'GET') return
  if (url.origin !== location.origin) return
  if (!url.protocol.startsWith('http')) return

  // Don't intercept navigation requests — allows bfcache
  if (request.mode === 'navigate') return

  // API routes — Network Only (never cache)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() =>
        new Response(
          JSON.stringify({ error: 'Offline' }),
          { status: 503, headers: { 'Content-Type': 'application/json' } }
        )
      )
    )
    return
  }

  // Static assets — Cache First
  if (
    url.pathname.startsWith('/icons/') ||
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname === '/manifest.json'
  ) {
    event.respondWith(cacheFirst(request))
    return
  }

  // HTML pages — Stale While Revalidate
  if (request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(staleWhileRevalidate(request))
    return
  }

  // Next.js chunks — Cache First
  if (url.pathname.startsWith('/_next/')) {
    event.respondWith(cacheFirst(request))
    return
  }

  // Everything else — Network First
  event.respondWith(networkFirst(request))
})

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STRATEGIES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

async function cacheFirst(request) {
  const cached = await caches.match(request)
  if (cached) return cached

  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    return new Response('Asset not available offline', { status: 503 })
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, response.clone())
    }
    return response
  } catch {
    const cached = await caches.match(request)
    if (cached) return cached
    return offlineFallback(request)
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE)
  const cached = await caches.match(request)

  const fetchPromise = fetch(request)
    .then(response => {
      if (response.ok) cache.put(request, response.clone())
      return response
    })
    .catch(() => null)

  return cached || fetchPromise || offlineFallback(request)
}

async function offlineFallback(request) {
  if (request.headers.get('Accept')?.includes('text/html')) {
    const cached = await caches.match(OFFLINE_URL)
    return cached || new Response(
      '<h1>Offline</h1>',
      { headers: { 'Content-Type': 'text/html' }, status: 503 }
    )
  }
  return new Response('Offline', { status: 503 })
}
