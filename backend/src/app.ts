import express from "express";
import cors from "cors";
import routes from "./routes/index";
import { errorMiddleware } from "./common/middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", routes);

app.use(errorMiddleware);

export default app;