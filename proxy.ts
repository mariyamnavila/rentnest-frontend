import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { JwtPayload } from 'jsonwebtoken';
import { jwtUtils } from './utils/jwt';
import { getNewAccessToken } from './service/refreshToken';

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = ["/", "/properties", "/contact", "/terms", "/about"];

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    const cookieStore = await cookies();

    let accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    const verifyAccessToken = () =>
        accessToken
            ? jwtUtils.verifyToken(
                accessToken,
                process.env.JWT_ACCESS_SECRET!
            )
            : null;

    let decodedAccessToken = verifyAccessToken();
    const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;

    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
        const result = await getNewAccessToken();

        if (result.success) {
            const newAccessToken = result.data.accessToken;

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax"
            })

            accessToken = newAccessToken;
            decodedAccessToken = verifyAccessToken()
        }
    }

    let userRole = null;

    if (!decodedAccessToken?.success) {
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");

        accessToken = undefined;
    }

    if (decodedAccessToken?.success && decodedAccessToken.data) {
        userRole = (decodedAccessToken.data as JwtPayload).role;
    }

    if (accessToken && AUTH_ROUTES.includes(pathname)) {
        if (userRole === "TENANT") {
            return NextResponse.redirect(new URL("/tenant-dashboard", request.url))
        } else if (userRole === "ADMIN") {
            return NextResponse.redirect(new URL("/admin-dashboard", request.url))
        } else if (userRole === "LAANDLORD") {
            return NextResponse.redirect(new URL("/landlord-dashboard", request.url))
        } else {
            return NextResponse.redirect(new URL("/", request.url))
        }

    }

    const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"))
    const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + "/"))

    if (!accessToken && !isPublicRoute && !isAuthRoute) {

        const loginUrl = new URL("/login", request.url)

        loginUrl.searchParams.set("redirectTo", pathname)

        return NextResponse.redirect(new URL(loginUrl))
    }

    if (pathname.startsWith("/tenant-dashboard") && userRole !== "TENANT") {
        return NextResponse.redirect(new URL("/forbidden", request.url))
    } else if (pathname.startsWith("/admin-dashboard") && userRole !== "ADMIN") {
        return NextResponse.redirect(new URL("/forbidden", request.url))
    } else if (pathname.startsWith("/landlord-dashboard") && userRole !== "LANDLORD") {
        return NextResponse.redirect(new URL("/forbidden", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        // '/dashboard/:path*',
        // '/admin-dashboard/:path*',
        '/((?!api|_next/static|fav.ico|_next/image|.*\\.png$).*)',
    ],
}