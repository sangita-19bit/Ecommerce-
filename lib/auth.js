import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'swan_botanicals_default_secret_fallback_key';
const TOKEN_EXPIRY = '7d';

/**
 * Sign a JWT token with user payload
 */
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

/**
 * Extract token from Next.js Request (cookie or Authorization header)
 */
export function getTokenFromRequest(req) {
  // Check cookie first
  if (req.cookies && typeof req.cookies.get === 'function') {
    const cookie = req.cookies.get('token');
    if (cookie?.value) return cookie.value;
  }

  // Check header
  const authHeader = req.headers?.get ? req.headers.get('authorization') : req.headers?.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return null;
}
