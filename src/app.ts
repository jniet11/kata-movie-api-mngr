import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes.js";
import { initDB } from "./scripts/initDB.js";

const app = express();

initDB();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("API funcionando correctamente 🚀");
});

app.use("/cinema", movieRoutes);

export default app;
