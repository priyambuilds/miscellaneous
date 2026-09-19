import mongoose from "mongoose";
import {
  BookingModel,
  ShowModel,
  TransactionModel,
  WalletModel,
} from "../models";
export async function createBooking(
  userId: string,
  showId: string,
  seats: number,
  idempotencyKey: string,
) {
  const session = await mongoose.startSession();
  try {
    const booking = await session.withTransaction(async () => {
      const existingTransaction = await TransactionModel.findOne({
        idempotencyKey,
      }).session(session);

      if (existingTransaction) {
        throw new Error("BOOKING ALREADY PROCESSED");
      }

      const show = await ShowModel.findOneAndUpdate(
        {
          _id: showId,
          availableTickets: { $gte: seats },
        },
        {
          $inc: {
            availableTickets: -seats,
          },
        },
        {
          new: true,
          session,
        },
      );
      if (!show) {
        throw new Error("NOT ENOUGH Tickets");
      }

      const totalPrice = show.ticketPriceInCents * seats;

      const wallet = await WalletModel.findOneAndUpdate(
        {
          userId,
          amount: { $gte: totalPrice },
        },
        {
          $inc: {
            amount: -totalPrice,
          },
        },
        {
          new: false,
          session,
        },
      );
      if (!wallet) {
        throw new Error("INSUFFICIENT balanceAfterCents");
      }
      const balanceBefore = wallet.amountInCents;
      const balanceAfter = balanceBefore - totalPrice;

      const bookingDocument = await BookingModel.create(
        [
          {
            userId,
            showId,
            seats,
            totalAmount: totalPrice,
            idempotencyKey,
          },
        ],
        { session },
        );
        const createdBooking = bookingDocument[0];
        
      if (!createdBooking) {
        throw new Error("BOOKING CREATION FAILED");
      }

      await TransactionModel.create(
        [
          {
            userId,
            type: "booking",
            amount: totalPrice,
            walletAmountBefore: wallet.amountInCents,
            walletAmountAfter: wallet.amountInCents - totalPrice,
            bookingId: createdBooking._id,
            idempotencyKey,
            status: "completed",
          },
        ],
        { session },
      );

      return createdBooking;
    });
    return booking;
  } finally {
    await session.endSession();
  }
}
