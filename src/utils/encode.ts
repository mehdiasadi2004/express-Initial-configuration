import jwt from "jsonwebtoken";
const SECRET = "biabrobache";

export const encodeToken = (Payload: any) => {
  const token = jwt.sign(Payload, SECRET, { expiresIn: "3h" });
  return token;
};

export const decodeToken = (token: string) => {
  const decoded = jwt.verify(token, SECRET);
  return decoded;
};
