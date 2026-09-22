import * as z from "zod";

export const cityIdParams = z.object({
    cityId: z.uuid()
})
export const movieIdParams = z.object({
    cityId: z.uuid()
})
export const theatreIdParams = z.object({
    cityId: z.uuid()
})
export const showtimeIdParams = z.object({
    cityId: z.uuid()
})
export const screenIdParams = z.object({
    cityId: z.uuid()
})

export const userSignupSchema = z.object({
    username: z.string().trim(),
    email: z.email(),
    password: z.string().min(8, "Password must contain atleast 8 chars").max(100, "The passsword should be below a 100 chars")
})
export const userSigninSchema = z.object({
    username: z.string().trim(),
    password: z.string().min(8, "Password must contain atleast 8 chars").max(100, "The passsword should be below a 100 chars")
})
export const createCityParamsSchema = z.object({
    name: z.string().trim().min(3).max(30)
})
export const createTheatreParamsSchema = z.object({
    cityId: z.uuid(),
    name: z.string().trim().min(3).max(30)
})
export const createMovieParamsSchema = z.object({
    name: z.string().trim().min(3).max(30)
})
export const createScreenParamsSchema = z.object({
    theatreId: z.uuid(),
    number: z.int().positive()
})
export const createSeatParamsSchema = z.object({
    screenId: z.uuid(),
    number: z.int().positive()
})
export const createShowTimeParamsSchema = z.object({
    screenId: z.uuid(),
    movieId: z.uuid(),
    startsAt: z.coerce.date(),
    endsAt: z.coerce.date(),
    priceCents: z.int().nonnegative()
})