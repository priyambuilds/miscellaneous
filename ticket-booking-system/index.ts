import express from "express";
import userRouter from "./src/routes/userRouter";
import showRouter from "./src/routes/showRouter";
import bookingRouter from "./src/routes/bookingsRouter";
const app = express();
app.use(express.json());


app.use("/api/v1/auth", userRouter);
app.use("/api/v1/shows", showRouter);
app.use("/api/v1/bookings", bookingRouter);

app.listen(3000);