import express from "express";
import userRouter from "./routes/user";
import { errorHandlerLogged } from "./middleware/error-handler";
import connectDB from "./database/db";
import cors from "cors";
import { NotFoundError } from "@vizlogic/commonsameer";
import "express-async-errors";
import { sequelize } from "./database/sqlDb";
require("dotenv").config();

const app = express();

const originArr: string[] = [
  "http://localhost:3000",
  "https://sameerdataneuron.netlify.app",
];
sequelize.sync({ alter: false }).then(() => {
  console.log(`Database & tables created!`);
});
app.use(express.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: originArr }));

// connect to mongodb
connectDB();
// parse incoming json and attach it to req.body
app.use(express.json());

// if dotenv file present take the port else 5000
const PORT = process.env.PORT || 5000;

app.use(userRouter);
app.use(errorHandlerLogged);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandlerLogged);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
