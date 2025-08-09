import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = parseInt(process.env.NEXT_SALT_ROUNDS ?? "10");
const TOKEN_SECRET = process.env.NEXT_TOKEN_SECRET ?? crypto.randomUUID();

export const genHash = async (string: string) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  return bcrypt.hash(string, salt);
}

export const compareHash = async (string: string, hash: string) => {
  return bcrypt.compare(string, hash);
}

export const genToken = (data: any, expiryDate: number | any = "1d") => {
  return jwt.sign(data, TOKEN_SECRET, { expiresIn: expiryDate });
}