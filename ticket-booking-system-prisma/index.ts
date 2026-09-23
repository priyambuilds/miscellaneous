import express from "express"
import { notFound } from "./src/middlewares/notFound"
import { errorHandler } from "./src/middlewares/errorHandler"
import { databaseErrorHandler } from "./src/middlewares/dbErrorHandler"
import catlogRouter from "./src/routes/catlogRouter"
import { userRouter } from "./src/routes/userRouter"
import { adminRouter } from "./src/routes/adminRouter"
import { bookingRouter } from "./src/routes/bookingRouter"
import { walletRouter } from "./src/routes/walletRouter"
import { transactionRouter } from "./src/routes/transactionRouter"

const port = Number(process.env.PORT)

const app = express()
app.use(express.json())

app.use("/api/v4/auth", userRouter)
app.use("/api/v4/admin", adminRouter)
app.use("/api/v4/catalog", catlogRouter)
app.use("/api/v4/booking", bookingRouter)
app.use("/api/v4/wallet", walletRouter)
app.use("/api/v4/transaction", transactionRouter)

app.use(notFound)
app.use(databaseErrorHandler)
app.use(errorHandler)

app.listen(port)
