import * as z from "zod"

export const cityIdParams = z.object({
    cityId: z.uuid(),
})
export const movieIdParams = z.object({
    movieId: z.uuid(),
})
export const theatreIdParams = z.object({
    theatreId: z.uuid(),
})
export const showtimeIdParams = z.object({
    showtimeId: z.uuid(),
})
export const screenIdParams = z.object({
    screenId: z.uuid(),
})

export const UserRoleSchema = z.enum(["ADMIN", "USER"])

export const userSignupSchema = z.object({
    username: z.string().trim().min(3).max(30),
    email: z.email(),
    password: z
        .string()
        .min(8, "Password must contain atleast 8 chars")
        .max(100, "The passsword should be below a 100 chars"),
    role: UserRoleSchema.default("USER"),
    walletBalanceCents: z.int().nonnegative().default(0),
})

export const userSigninSchema = z.object({
    username: z.string().trim(),
    password: z
        .string()
        .min(8, "Password must contain atleast 8 chars")
        .max(100, "The passsword should be below a 100 chars"),
})
export const createCitySchema = z.object({
    name: z.string().trim().min(3).max(30),
})
export const createTheatreSchema = z.object({
    cityId: z.uuid(),
    name: z.string().trim().min(3).max(30),
})
export const createMovieSchema = z.object({
    name: z.string().trim().min(3).max(30),
})
export const createScreenSchema = z.object({
    theatreId: z.uuid(),
    number: z.int().positive(),
})
export const createSeatSchema = z.object({
    screenId: z.uuid(),
    number: z.int().positive(),
})
export const createShowTimeSchema = z.object({
    screenId: z.uuid(),
    movieId: z.uuid(),
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date(),
    priceCents: z.int().nonnegative(),
})

export const bookingSchema = z.object({
    seatNumbers: z.array(z.int()).min(1).max(20),
})
