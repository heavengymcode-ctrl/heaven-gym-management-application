const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
function allowedOrigins() {
  if (process.env.NODE_ENV === 'production') {
    return ['https://heavengym.com'];
  }

  return ['https://heavengym.com', 'http://localhost:5173', 'http://localhost:4173'];
}

export function originProtection(req, res, next) {
  if (SAFE_METHODS.has(req.method)) return next();

  const origin = req.get('origin')?.replace(/\/$/, '');
  if (origin && !allowedOrigins().includes(origin)) {
    return res.status(403).json({ error: 'Request origin is not allowed' });
  }

  // Cookie-authenticated state changes must carry a browser Origin header.
  // Non-browser integrations should use a separate, explicitly authenticated API.
  const hasAuthCookie = Boolean(req.cookies?.accessToken || req.cookies?.refreshToken);
  if (!origin && hasAuthCookie) {
    return res.status(403).json({ error: 'Origin header required for cookie-authenticated requests' });
  }

  return next();
}

export function cronProtection(req, res, next) {
  const secret = process.env.CRON_SECRET;
  const authorization = req.get('authorization');
  if (!secret || authorization !== `Bearer ${secret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  return next();
}
