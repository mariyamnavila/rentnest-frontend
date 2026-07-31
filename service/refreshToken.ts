"use server"

import { jwtUtils } from "@/utils/jwt";
import { cookies } from "next/headers"

export const getNewAccessToken = async () => {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
        return {
            success: false,
            message: "Refresh Token Not Found!"
        }
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
            Cookie: `refreshToken=${refreshToken}`
        },

        cache: "no-store",
    })

    const result = await res.json();

    if (!res.ok) {
        return {
            success: false,
            message: result.message,
        };
    }

    return result
}

export const getValidAccessToken = async () => {
    const cookieStore = await cookies();

    let accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!accessToken && !refreshToken) {

        return {
            success: false,
            message: "User Not Logged In!"
        }
    }

    const decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) : null;
    const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET as string) : null;

    if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
        const result = await getNewAccessToken();

        if (!result.success) {
            cookieStore.delete("accessToken");
            cookieStore.delete("refreshToken");

            return {
                success: false,
                message: "Session expired.",
            };
        }

        const newAccessToken = result.data.accessToken;

        cookieStore.set("accessToken", newAccessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax",
        });

        accessToken = newAccessToken;
    }

    return {
        success: true,
        accessToken,
    };

}