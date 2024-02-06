import express, { Application, Request, Response } from "express";
import cors from "cors";
import GlobalErrorHandler from "./app/middlewares/globalerrorhandler";
import router from "./app/routes";
import notFound from "./app/middlewares/notfound";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));

//application routes
app.use("/api/v1", router);

const getAController = async (req: Request, res: Response) => {
  res.send("Welcome to The PH University");
};

app.get("/", getAController);

app.use(GlobalErrorHandler);

app.use(notFound);

export default app;
