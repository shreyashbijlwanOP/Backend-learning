import express from "express";

import dotenv from "dotenv";

import path from "path";

import cookieParser from "cookie-parser";

// For Imports we need to use .js Extension mandatory
import userRouter from "./Routes/userRoute.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

// Running config file of dotenv ,
dotenv.config();

// Constant
const port = process.env.PORT || 5000;

// connecting server to databases
connectDB();

// creating server instance
const app = express();

// Body Parser
app.use(express.json());

// FormData Parser Allow us to use Form Data
app.use(express.urlencoded({ extended: true }));

// cookie Parser
app.use(cookieParser());

// Routes Wil Go here
app.use("/api/users", userRouter);

if (process.env.NODE_ENV == "production") {
  const __dirname = path.resolve();

  app.use(express.static(path.join(__dirname, "Client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Client", "dist", "index.htl"));
  });
} else {
  // creating a get Route
  app.get("/", (req, res) => {
    res.json({ msg: "Hello From server " });
  });
}

// Error Handler
app.use(notFound);
app.use(errorHandler);

// App is running on port
app.listen(port, () => console.log(`listing on port : ${port}`));
