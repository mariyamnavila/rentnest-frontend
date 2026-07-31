"use server";

import { IUser } from "@/lib/types";
import { cookies } from "next/headers";

export const getMe = async (): Promise<IUser> => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "User is not logged in.",
        };
    }

    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/auth/me`,
            {
                headers: {
                    Cookie: `accessToken=${accessToken}`,
                },
                cache: "no-store",
            }
        );

        const result = await res.json();

        if (!res.ok) {
            if (res.status === 401) {
                cookieStore.delete("accessToken");
                cookieStore.delete("refreshToken");
            }

            return {
                success: false,
                message: result.message || "Failed to fetch user information.",
            };
        }

        return result;
    } catch {
        return {
            success: false,
            message: "Unable to connect to the server.",
        };
    }
};