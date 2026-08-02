import jwt, { JwtPayload } from "jsonwebtoken"

const verifyToken = (token: string, secret: string) => {
    try {
        const verifiedToken = jwt.verify(token, secret) as JwtPayload;

        return {
            success: true,
            data: verifiedToken,
        }

    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            // console.log("Token verification failed:", error);
        }
        const message =
            error instanceof Error ? error.message : "Token verification failed";
        return {
            success: false,
            error: message,
        }
    }
}

export const jwtUtils = {
    verifyToken,
}