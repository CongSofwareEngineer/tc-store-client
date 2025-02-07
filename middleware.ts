import { NextResponse, NextRequest } from 'next/server'
export const config = {
  matcher: ['/shop', '/ui'],
}

// This function can be marked `async` if using `await` inside
export default async function middleware(request: NextRequest) {
  console.log({ request: request.url })
  return NextResponse.next()
  // return NextResponse.redirect(new URL('/home', request.url))
}
