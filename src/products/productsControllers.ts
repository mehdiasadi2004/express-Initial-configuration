import { Router, Request, Response, NextFunction } from "express";

import { AuthMiddleware, validationMiddleware } from "../middlewares";
import { createNewProducts, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "./productServices";
import { CreateProductDto } from "./dtos/createProductDto";
import RequestWithUser from "../types/RequestWithUser";
import GetAllProductsDto from "./dtos/getAllProductsDto";
const router = Router();

// router.use(AuthMiddleware)

router.get("/", async (req: any, res: Response, next: NextFunction) => {
  try {
    const filters: GetAllProductsDto  =req.query; ;
    const result = await getAllProducts(filters);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id  = req.params.id;
      const result = await getOneProduct(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  AuthMiddleware,
  validationMiddleware(CreateProductDto),
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const data: CreateProductDto = req.body;
      data.user = req?.user
      const result = await createNewProducts(data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  AuthMiddleware,
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
     try {
      const data: CreateProductDto = req.body;
      const id = req.params.id;
      data.user = req.user
      const result = await updateProduct(data,id);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  AuthMiddleware,
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const result = await deleteProduct(id , req.user);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
