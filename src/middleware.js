import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    async function middleware(req) {
        const path = req.nextUrl.pathname
        const token = req.nextauth.token

        if (path.startsWith('/admin') && token && token?.role !== "admin") {
            return NextResponse.rewrite(new URL('/denied', req.url))
        }
        if (path.startsWith('/user') && token && token?.role !== "user") {
            return NextResponse.rewrite(new URL('/denied', req.url))
        }
        if (path.startsWith("/api") && !token) {
            return NextResponse.rewrite(new URL('/denied', req.url))
        }
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)


export const config = {
    matcher: [
        '/admin/:path*',
        '/seller/:path*',
        '/user/:path*',
        '/api/:path*',
    ]
}
