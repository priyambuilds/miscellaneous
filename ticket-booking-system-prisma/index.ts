import express from "express"
import { notFound } from "./src/middlewares/notFound";
import { errorHandler } from "./src/middlewares/errorHandler";
import { databaseErrorHandler } from "./src/middlewares/dbErrorHandler";

const port = Number(process.env.PORT)

const app = express();
app.use(express.json())

app.use("/api/v4/auth")
app.use("/api/v4/admin")
app.use("/api/v4/catlog")
app.use("/api/v4/booking")
app.use("/api/v4/wallet")
app.use("/api/v4/transaction")

app.use(notFound)
app.use(databaseErrorHandler)
app.use(errorHandler)

app.listen(port)