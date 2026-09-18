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
    moviename: {
        type: String,
        required: true,
        unique: true,
    },
    showtime: {
        type: String,
        required: true,
        unique: true,
    },
    ticketPrice: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        unique: true,
        get: (a: mongoose.Schema.Types.Decimal128 | null) => a != null ? parseFloat(a.toString()): a
    },
    availableTickets: {
        type: Number,
        required: true,
    },
},
    {
        toJSON: { getters: true },
        toObject: { getters: true },
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
    totalAmount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        get: (a: mongoose.Schema.Types.Decimal128 | null) => a != null ? parseFloat(a.toString()): a
    }
}, {
        toJSON: { getters: true },
        toObject: { getters: true },
        timestamps: true
});


const UserModel = mongoose.model("UserModel", userSchema);
const ShowModel = mongoose.model("ShowModel", showSchema);
const BookingModel = mongoose.model("BookingModel", bookingSchema);

export {UserModel, ShowModel, BookingModel};