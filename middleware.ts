// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = [
  'https://tcstore.vercel.app',
  'http://localhost:3016',
  'https://ts-store-nodejs-noti.vercel.app',
  'https://tc-store-admin-client.vercel.app',
]

export const config = {
  matcher: '/api/:path*',
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') || ''

  const response = NextResponse.next()

  // 1. CORS headers
  if (allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Access-Control-Allow-Credentials', 'true')
  }

  // 2. Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // 3. CSP cho API (nếu cần)
  response.headers.set('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none';")

  // 5. Preflight request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : '',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-CSRF-Token',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  return response
}
