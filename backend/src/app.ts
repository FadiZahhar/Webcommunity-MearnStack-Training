import express, { Application, Request, Response, NextFunction } from "express";
import router from "./routes";
import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import contactsRouter from "./routes/contacts";

const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", router);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

export default app;
