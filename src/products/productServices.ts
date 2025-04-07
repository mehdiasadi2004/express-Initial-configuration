import ServerError from "../errors/serverError";
import productsModel from "../models/productsModel";
import { CreateProductDto } from "./dtos/createProductDto";
import GetAllProductsDto from "./dtos/getAllProductsDto";

export const getAllProducts = async (filters: GetAllProductsDto) => {
  const {
    title,
    start_price,
    end_price,
    tags,
    page = 1,
    per_page = 10,
  } = filters;

  let query: { [key: string]: {} } = {};

  if (tags) {
    query["tags"] = { $in: [tags] };
  }
  if (start_price && end_price) {
    query["price"] = { $gte: start_price, $lte: end_price };
  }

  const result = await productsModel.find(
    query,
    {},
    { skip: per_page * (page - 1), limit: per_page }
  ).sort({ createAt: -1 });
  return result;
};

export const getOneProduct = async (id: string) => {
  const result = await productsModel.findById(id);
  if (!result) {
    throw new ServerError(404, "Product not found");
  }
  return result;
};

export const createNewProducts = async (data: CreateProductDto) => {
  const result = await productsModel.create(data);
  return result;
};

export const updateProduct = async (data: CreateProductDto, id: string) => {
  const product = await productsModel.findOne({ _id: id, user: data.user });
  if (!product) {
    throw new ServerError(404, "Product not found");
  }

  const result = await productsModel.updateOne({ _id: id }, { $set: data });

  return result;
};

export const deleteProduct = async (id: string, user: string | undefined) => {
  const product = await productsModel.findOne({ _id: id, user: user });
  if (!product) {
    throw new ServerError(404, "Product not found");
  }
  const result = await productsModel.deleteOne({ _id: id });

  return result;
};
