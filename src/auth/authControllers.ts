import { Router, Request, Response, NextFunction } from "express";
import { RegisterDto } from "./dtos/registerDto";
import { Login, Register } from "./authServices";
import { validationMiddleware } from "../middlewares";
import { LoginDto } from "./dtos/loginDto";

const router = Router();

// router.use(AuthMiddleware)

router.post("/login",validationMiddleware(LoginDto), async (req: Request, res: Response,next :NextFunction) => {
  try {
    const body: LoginDto = req.body;
      res.send(await Login(body))
  } catch (err) {
    next(err)
    // how to send error to error middlewar 
  }
});
router.post(
  "/register",validationMiddleware(RegisterDto), async (req: Request, res: Response,next:NextFunction) => {
    try {
      const body: RegisterDto = req.body;
      res.send(await Register(body));
    } catch (err) {
      next(err);
    }
  }
);

export default router;
