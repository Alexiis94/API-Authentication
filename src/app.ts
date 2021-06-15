import express, { Application } from "express";
//morgan: permite ver por console las peticiones que van llegando  | es un middleware
import morgan from "morgan";
const app: Application = express();

import authRoutes from "./routes/auth";

//settings
app.set("port", 4000);
//middlewares
app.use(morgan("dev"));
app.use(express.json());

//router
app.use("/api/auth", authRoutes);

export default app;
