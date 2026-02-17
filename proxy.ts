// middleware.ts (or src/middleware.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Replace with your exact production URLs (include https://)
  const strapiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://your-strapi-app.onrender.com'; // e.g., https://my-strapi.onrender.com
  const frontendUrl = process.env.CLIENT_URL || 'https://your-nextjs.vercel.app'; // your Vercel site

  // Build CSP: allow self + Strapi domain
  const csp = [
    "frame-ancestors 'self'",
    strapiUrl,
    new URL(strapiUrl).origin, // ensures full origin
    frontendUrl, // optional, for self-embedding if needed
  ].join(' ');

  response.headers.set('Content-Security-Policy', csp);

  // Fallback for older browsers (optional but recommended)
  response.headers.set('X-Frame-Options', `ALLOW-FROM ${strapiUrl}`);

  return response;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|api).*)', // Apply to all content pages (skip static/assets/api)
};
