import express from "express";
import cors from "cors";
import { config } from "dotenv";
import dbConnect from "./db/dbConnect.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";

config("./.env");

const app = express();

//middlewares
app.use(
  cors({
    credentials: true,
    origin: "https://mern-personal-expense-tracker-frontend.onrender.com",
  })
);

//LOCAL_HOST
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5173",
//   })
// );

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

//LOCAL_HOST
// const LOCAL_HOST = "127.0.0.4";

//routers
app.use("/users", userRouter);

// app.listen(PORT, () => {
  console.log(`App is Listening on PORT ${PORT}`);
  dbConnect();
});

//LOCAL_HOST
// app.listen(PORT, LOCAL_HOST, () => {
//   console.log(`App is Listening on http://${LOCAL_HOST}:${PORT}`);
//   dbConnect();
// });
