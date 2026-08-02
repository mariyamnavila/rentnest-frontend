"use server";

import { IUser } from "@/lib/types";
import { cookies } from "next/headers";
import { AppError, ErrorType, handleApiError, handleNetworkError } from "@/lib/errors";

export type GetMeResult = {
  success: boolean;
  data?: IUser["data"];
  error?: AppError;
};

export const getMe = async (): Promise<GetMeResult> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            error: { type: ErrorType.UNAUTHORIZED, message: "Please log in to continue." },
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
                error: handleApiError(res, result),
            };
        }

        return { success: true, data: result.data };
    } catch {
        return {
            success: false,
            error: handleNetworkError(),
        };
    }
};
