import mongoose from "mongoose";
import {
  BookingModel,
  ShowModel,
  TransactionModel,
  WalletModel,
} from "../models";
import { toCents } from "../helpers/cents";
export async function createBooking(
  userId: string,
  showId: string,
  seats: number,
  idempotencyKey: string,
) {
  const session = await mongoose.startSession();
  try {
    return await session.withTransaction(async () => {
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
          amountInCents: { $gte: totalPrice },
        },
        {
          $inc: {
            amountInCents: -totalPrice,
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
            totalAmountInCents: totalPrice,
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
            amountInCents: totalPrice,
            walletAmountBeforeInCents: wallet.amountInCents,
            walletAmountAfterInCents: wallet.amountInCents - totalPrice,
            bookingId: createdBooking._id,
            idempotencyKey,
            status: "completed",
          },
        ],
        { session },
      );

      return createdBooking;
    });
  } finally {
    await session.endSession();
  }
}
