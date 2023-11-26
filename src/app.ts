import express, { Application, Request, Response } from "express";
import cors from "cors";
import GlobalErrorHandler from "./app/middlewares/globalerrorhandler";
import router from "./app/routes";

const app: Application = express();
app.use(express.json());
app.use(cors());

//application routes
app.use("/api/v1", router);

const getAController = (req: Request, res: Response) => {
  res.send("Hello World!");
};

app.get("/", getAController);

app.use(GlobalErrorHandler);

export default app;
