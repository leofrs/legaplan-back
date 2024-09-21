import express from "express";
import cors from "cors";

import { routerTask } from "./routes/tasks.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routerTask);

app.listen(8080);
