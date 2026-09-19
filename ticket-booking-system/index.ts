import express from "express";
import userRouter from "./src/routes/userRouter";
import showRouter from "./src/routes/showRouter";
import bookingRouter from "./src/routes/bookingsRouter";
import walletRouter from "./src/routes/walletRouter";
import transactionRouter from "./src/routes/transactionRouter";

const port = process.env.PORT;
const app = express();
app.use(express.json());


app.use("/api/v1/auth", userRouter);
app.use("/api/v1/shows", showRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use("/api/v1/wallet", walletRouter);
app.use("/api/v1/transaction", transactionRouter);

app.listen(port);