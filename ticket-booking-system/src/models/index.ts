import mongoose from "mongoose";
const mongodbUrl = process.env.MONGODB_URI;
if (!mongodbUrl) {
    throw new Error("MONGODB_URI environment variable is required");
}
mongoose.connect(mongodbUrl);

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
}, { timestamps: true });
const showSchema = new mongoose.Schema({
    movieName: {
        type: String,
        required: true,
        unique: true,
    },
    showTime: {
        type: String,
        required: true,
        unique: true,
    },
    ticketPriceInCents: {
        type: Number,
        min: 0,
        required: true,
        unique: true,
    },
    availableTickets: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true
});
const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
    },
    showId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ShowModel",
        required: true,
    },
    seats: {
        type: Number,
        required: true,
        min: 1
    },
    totalAmountInCents: {
        type: Number,
        required: true,
       
    },
    idempotencyKey: {
        type: String,
        required: true,
        unique: true
    }
}, {
        timestamps: true
});

export const walletSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
        unique: true
    },
    amountInCents: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
}, {
    timestamps: true
})

export const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["topup", "booking"]
    },
    amountInCents: {
        type: Number,
        required: true,
        min: 0
    },
    walletAmountBeforeInCents: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    walletAmountAfterInCents: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BookingModel",
    },
    idempotencyKey: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        enum: ["failed", "completed"]
    },
}, {
    timestamps: true
})


const UserModel = mongoose.model("UserModel", userSchema);
const ShowModel = mongoose.model("ShowModel", showSchema);
const BookingModel = mongoose.model("BookingModel", bookingSchema);
const WalletModel = mongoose.model("WalletModel", walletSchema);
const TransactionModel = mongoose.model("TransactionModel", transactionSchema);

export {UserModel, ShowModel, BookingModel, WalletModel, TransactionModel};