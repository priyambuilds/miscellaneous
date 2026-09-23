import { prisma } from "../../../prisma/index.ts"

export async function getCitiesService() {
    return prisma.city.findMany({
        orderBy: { name: "asc" },
    })
}

export async function getTheatresByCityService(cityId: string) {
    return prisma.theatre.findMany({
        where: { cityId },
        orderBy: { name: "asc" },
    })
}

export async function getShowtimesByCityService(cityId: string) {
    return prisma.showTimes.findMany({
        where: {
            screen: {
                theatre: { cityId },
            },
        },
        include: {
            movie: true,
            screen: {
                include: { theatre: true },
            },
        },
        orderBy: { startsAt: "asc" },
    })
}

export async function getShowtimesByTheatreService(theatreId: string) {
    return prisma.showTimes.findMany({
        where: { screen: { theatreId } },
        include: {
            movie: true,
            screen: true,
        },
        orderBy: { startsAt: "asc" },
    })
}

export async function getShowtimeService(showtimeId: string) {
    return prisma.showTimes.findUniqueOrThrow({
        where: { id: showtimeId },
        include: {
            movie: true,
            screen: {
                include: {
                    theatre: true,
                    seats: {
                        orderBy: { number: "asc" },
                        include: {
                            bookedSeats: {
                                where: { showtimeId },
                                select: { id: true },
                            },
                        },
                    },
                },
            },
        },
    })
}

export async function getScreensByTheatreService(theatreId: string) {
    return prisma.screen.findMany({
        where: { theatreId },
        orderBy: { number: "asc" },
    })
}

export async function getSeatsByScreenService(screenId: string) {
    return prisma.seats.findMany({
        where: { screenId },
        orderBy: { number: "asc" },
    })
}
