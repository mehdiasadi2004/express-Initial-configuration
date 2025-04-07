import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import userController from "./users/usersControllers";
import productsController from "./products/productsControllers";
import mongoose from "mongoose";
import { authController } from "./auth";
import logger from "./helper/logger";
import { ErrorHandlerMiddleware } from "./middlewares";

const app = express();

// middleware hatch

const myMidleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("time :", Date.now());
  next();
};

app.get("/", myMidleware, (req, res) => {
  res.send("Hello World");
});

app.use(cors());
// for all app use cors middle ware
app.use(express.json());
app.use("/users", userController);
app.use("/products", productsController);
app.use("/auth", authController);


// after all app uses 
app.use(ErrorHandlerMiddleware);

mongoose
  .connect(
    "mongodb://localhost:27017/?authSource=admin",
    {
      autoIndex: true,
    }
  )
  .then(() => {
    console.log("connected to database");
    app.listen(3001, () => {
      logger.info("server is run on port 3001");
    });
  })
  .catch((err) => {
    logger.error("error", err);
  });


