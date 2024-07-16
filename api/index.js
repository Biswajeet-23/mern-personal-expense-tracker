import express from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnect from "./db/dbConnect.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";

config("./.env");

const app = express();

//middlewares
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;
const host = process.env.HOSTNAME;

//routers
app.use("/users", userRouter);

app.listen(PORT, host, () => {
  console.log(`server is running at http://${host}:${PORT}`);
  dbConnect();
});
