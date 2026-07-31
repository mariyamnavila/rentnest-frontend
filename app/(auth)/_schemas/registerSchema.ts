import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name can not be above 100 characters"),

    email: z
        .string()
        .trim()
        .min(1, "Email address is required")
        .pipe(z.email("Please enter a valid email address")),

    password: z.string().min(6, "Password must be at least 6 characters"),

    role: z.enum(["TENANT", "LANDLORD"], {
        error: "Please select a role",
    }),

    phone: z.string().trim().optional(),

    profileImage: z
        .string()
        .trim()
        .pipe(z.url("Please enter a valid image URL"))
        .optional()
        .or(z.literal("")),
});