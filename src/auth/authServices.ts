import ServerError from "../errors/serverError";
import usermodel from "../models/usermodel";
import { decodeToken, encodeToken } from "../utils/encode";
import { LoginDto } from "./dtos/loginDto";
import { RegisterDto } from "./dtos/registerDto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const Register = async (data: RegisterDto) => {
    const user = await usermodel.findOne({ email: data.email });
    if (user) {
      throw new ServerError(409,"User already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await usermodel.create({
      ...data,
      password: hashedPassword,
    });
    newUser.save();
    return newUser;
  
};

export const Login = async (data: LoginDto) => {
  
    const user = await usermodel.findOne({ email: data.email });
    if (!user) {
      throw new ServerError(404 , "User not found");
      // how to throw error in postman 
    }
    const compairedPassword = await bcrypt.compare(
      data.password,
      `${user.password}`
    );
    if (!compairedPassword) {
      throw new Error("Invalid password");
    }
    const token = encodeToken({id:user._id});
    return {token}
  
};
