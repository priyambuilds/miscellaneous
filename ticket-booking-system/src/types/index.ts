import * as z from "zod";

export const signupSchema = z.object(({
    username: z.string().trim().min(3, "Username must be atleast 3 chars"),
    email: z.email("Invalid email format"),
    password: z.string().min(6, "password should be atleast 6 chars").max(32, "password should be less than 32 chars"),
    role: z.enum(["user", "admin"]).default("user").optional()
}))

export const signinSchema = z.object(({
    username: z.string().trim().min(3, "Username must be atleast 3 chars"),
    password: z.string().min(6, "password should be atleast 6 chars").max(32, "password should be less than 32 chars")
}))
export const showsSchema = z.object(({
    movieName:z.string().trim().min(1, "Movie name is required").max(255, "Movie name should be shorter than 255 chars"),
    showTime:z.string().trim(),
    ticketPriceInCents:z.number().positive("Ticket price must be a +ve value"),
    availableTickets:z.number().int().positive("Tickets must be a +ve integer")
}))
export const bookingsSchema = z.object(({
    showId: z.string().length(24, "Invalid show ID format"),
    seats: z.number().int().positive("Seats must be at least 1"),
}))

export const walletSchema = z.object(({
    amountInCents: z.number().nonnegative().max(9999999.99, "Amount is too large").multipleOf(0.01, "Amount cannot have more than 2 decimal places")
}))

export type SignupSchema = z.infer<typeof signupSchema>;
export type SigninSchema = z.infer<typeof signinSchema>;
export type ShowSchema = z.infer<typeof showsSchema>;
export type BookingSchema = z.infer<typeof bookingsSchema>;