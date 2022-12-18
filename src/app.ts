import express, { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { connectDB, connectTestDB } from './database/mongodb';
import dotenv from "dotenv";

dotenv.config();

if(process.env.NODE_ENV === 'test'){
  connectTestDB()
}else{
  connectDB()
}

import indexRouter from "./routes/index";
import hotelRouter from "./routes/hotel";
import usersRouter from "./routes/users";

const app = express();


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'))
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/hotels", hotelRouter);
app.use("/users", usersRouter);

// view engine setup
app.set('views', path.join(`${__dirname}/../`, 'views'))
app.set("view engine", "ejs");

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
