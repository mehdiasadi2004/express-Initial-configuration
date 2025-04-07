import { Request, Response, NextFunction } from "express";
import { decodeToken } from "../utils/encode";
import RequestWithUser from "../types/RequestWithUser";

const AuthMiddleware = (req: RequestWithUser, res: Response, next: NextFunction)=> {
  let token = req.headers["authorization"];
  if (!token) {
    res.status(401).send({ messge: "Unauthorized" });
    return;
  }
  token = token.split(" ")[1];

  try {
    const data: any = decodeToken(token);
    req.user = data.id;
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
};
export default AuthMiddleware;
