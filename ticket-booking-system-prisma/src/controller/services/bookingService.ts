import { BookingStatus, TransactionStatus, TransactionType } from "../../../generated/prisma/enums.ts"
import {prisma} from "../../../prisma/index.ts"

// When the user creates a booking, following things happen in one Prisma transaction:
// 1. Load the showtime & price
// 2. Validate the selected seats
// 3. Calculate the total
// 4. Create the booking
// 5. Deduct the wallet balance
// 6. Create Booked-Seat records
// 7. Create a transaction entry
export async function createBookingService(userId: string, showtimeId: string, seatNumbers: number[]) {
    if (new Set(seatNumbers).size !== seatNumbers.length) {
        throw new Error("Duplicate seats are not allowed")
    }
    return prisma.$transaction(async (tx) => {
        const showTime = await tx.showTimes.findUniqueOrThrow({
            where: { id: showtimeId },
            select: {
                id: true,
                screenId: true,
                priceCents: true
            }
        })

        const seats = await tx.seats.findMany({
            where: {
                screenId: showTime.screenId,
                number: {
                    in: seatNumbers
                }
            },
            select: {
                id: true,
                number: true
            }
        })

        if (seats.length !== seatNumbers.length) {
            throw new Error("One or more seats are invalid")
        }

        const totalCents = showTime.priceCents * seats.length
        
        const user = await tx.user.findUniqueOrThrow({
            where: { id: userId },
            select: {
                walletBalanceCents: true
            }
        })

        const amountBeforeCents = user.walletBalanceCents
        const amountAfterCents = user.walletBalanceCents - totalCents

        if (amountAfterCents < 0) {
            throw new Error("Insufficient wallet balance please add money to continue")
        }

        
        const booking = await tx.booking.create({
            data: {
                userId,
                showtimeId,
                status: BookingStatus.CONFIRMED,
                totalCents
            }
        })

        await tx.user.updateMany({
            where: {
                id: userId,
                walletBalanceCents: {
                    gte: totalCents
                }
            },
            data: {
                walletBalanceCents: {
                    decrement: totalCents
                }
            }
        })

        await tx.bookedSeats.createMany({
            data: seats.map((seat) => ({
                bookingId: booking.id,
                seatId: seat.id,
                userId,
                showtimeId,
                screenId: showTime.screenId
            }))
        })

        await tx.transaction.create({
            data: {
                userId,
                bookingId: booking.id,
                type: TransactionType.BOOKING,
                amountCents: totalCents,
                amountBeforeCents,
                amountAfterCents,
                status: TransactionStatus.SUCCESS
            }
        })
        return {
            booking,
            seats: seats.map((seat) => seat.number),
        }
    }, {
        isolationLevel: "Serializable"
    })
}
export async function getBookingsService(userId: string) {
    return prisma.booking.findMany({
        where: { userId },
        orderBy: {createdAt: "desc"}
    })
}