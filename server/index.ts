import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser());

app.get("/", async (req: Request, res: Response) => {
  return res.send("Volatext");
});

app.listen(5656, () => console.log("Server is live"));
