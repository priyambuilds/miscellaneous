import { prisma } from "../../../prisma/index.ts"

export async function createCitiesService(name: string) {
    return prisma.city.create({
        data: {
            name,
        },
    })
}
export async function createTheatresService(cityId: string, name: string) {
    return prisma.theatre.create({
        data: {
            cityId,
            name,
        },
    })
}
export async function createScreensService(theatreId: string, number: number) {
    return prisma.screen.create({
        data: {
            theatreId,
            number,
        },
    })
}
export async function createSeatsService(screenId: string, number: number) {
    return prisma.seats.create({
        data: {
            screenId,
            number,
        },
    })
}
export async function createMoviesService(name: string) {
    return prisma.movie.create({
        data: {
            name,
        },
    })
}
export async function createShowTimeService(
    screenId: string,
    movieId: string,
    startsAt: string,
    endsAt: string,
    priceCents: number,
) {
    return prisma.showTimes.create({
        data: {
            screenId,
            movieId,
            startsAt,
            endsAt,
            priceCents,
        },
    })
}
