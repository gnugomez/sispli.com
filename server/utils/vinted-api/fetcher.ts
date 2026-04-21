import consola from 'consola'

const logger = consola.withTag('vinted-fetcher')

const VINTED_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:148.0) Gecko/20100101 Firefox/148.0'

interface VintedSession {
  cookies: string
  expiresAt: number
}

const SESSION_STORAGE_KEY = 'vinted:guest-session'
const SESSION_CACHE_TTL_MS = 60 * 60 * 1000 // 1h
const SESSION_REFRESH_BUFFER_MS = 5 * 60 * 1000 // 5m

/**
 * Parse Set-Cookie headers from a Response into a cookie string
 */
function extractCookies(response: Response): string {
  const cookies: Record<string, string> = {}
  // getSetCookie() returns individual Set-Cookie header values
  const setCookieHeaders = response.headers.getSetCookie?.() ?? []
  for (const header of setCookieHeaders) {
    const nameValue = header.split(';')[0]
    if (!nameValue)
      continue
    const eqIndex = nameValue.indexOf('=')
    if (eqIndex > 0) {
      const name = nameValue.slice(0, eqIndex).trim()
      const value = nameValue.slice(eqIndex + 1).trim()
      cookies[name] = value
    }
  }
  return Object.entries(cookies)
    .map(([name, value]) => `${name}=${value}`)
    .join('; ')
}

/**
 * Obtain a guest session by fetching the Vinted homepage.
 * The response sets access_token_web and other required cookies.
 */
async function getGuestSession(domain: string): Promise<VintedSession> {
  const now = Date.now()
  const storage = useStorage()
  const storedSession = await storage.getItem<VintedSession>(SESSION_STORAGE_KEY)

  if (storedSession && storedSession.expiresAt > now + SESSION_REFRESH_BUFFER_MS) {
    logger.debug('Using cached guest session', {
      expiresAt: new Date(storedSession.expiresAt).toISOString(),
      now: new Date(now).toISOString(),
      ttlMs: storedSession.expiresAt - now,
      hasAccessTokenCookie: storedSession.cookies.includes('access_token_web'),
    })
    return storedSession
  }

  logger.info('Obtaining guest session...')

  const response = await fetch(`https://${domain}`, {
    headers: {
      'User-Agent': VINTED_USER_AGENT,
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9,es;q=0.8',
    },
    redirect: 'follow',
  })

  if (!response.ok) {
    throw new Error(`[Vinted] Failed to obtain guest session: ${response.status}`)
  }

  const cookies = extractCookies(response)

  if (!cookies.includes('access_token_web')) {
    // Consume the body to avoid leaking resources
    await response.text()
    throw new Error('[Vinted] Guest session did not return access_token_web cookie')
  }

  // Consume the HTML body
  await response.text()

  // The access token JWT has ~2h expiry, cache for 1h
  const newSession: VintedSession = {
    cookies,
    expiresAt: Date.now() + SESSION_CACHE_TTL_MS,
  }

  await useStorage().setItem(SESSION_STORAGE_KEY, newSession)

  logger.info('Guest session cached', {
    expiresAt: new Date(newSession.expiresAt).toISOString(),
    cacheDurationMs: SESSION_CACHE_TTL_MS,
    cookieCount: newSession.cookies.split(';').length,
    hasAccessTokenCookie: newSession.cookies.includes('access_token_web'),
  })

  logger.info('Guest session obtained successfully')
  return newSession
}

/**
 * Fetch from the public Vinted API with guest session cookies
 */
export async function vintedFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const config = useRuntimeConfig()
  const domain = config.vintedDomain || 'www.vinted.es'
  const url = `https://${domain}${path}`

  const session = await getGuestSession(domain)

  logger.debug('Using session for fetch', {
    url,
    expiresAt: new Date(session.expiresAt).toISOString(),
    timeUntilExpiryMs: session.expiresAt - Date.now(),
    cookieSnippet: session.cookies.slice(0, 120),
  })

  logger.info(`Fetching: ${url}`)

  const response = await fetch(url, {
    ...options,
    headers: {
      'User-Agent': VINTED_USER_AGENT,
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'en-US,en;q=0.9,es;q=0.8',
      'Cookie': session.cookies,
      ...options.headers,
    },
  })

  if (!response.ok) {
    // If we get a 401, invalidate the session and retry once
    if (response.status === 401) {
      logger.info('Got 401, refreshing session...')
      await useStorage().removeItem(SESSION_STORAGE_KEY)
      return vintedFetch(path, options)
    }
    const errorText = await response.text()
    logger.error(`API error ${response.status}: ${errorText}`)
    throw new Error(`Vinted API error: ${response.status} - ${errorText}`)
  }

  return response.json()
}
