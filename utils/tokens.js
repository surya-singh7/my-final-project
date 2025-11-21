// utils/tokens.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.TOKEN_SECRET_KEY || "default_secret_change_in_env";
export function createToken(user_id, username) {
  // token expires optional: add { expiresIn: "7d" } if you like
  return jwt.sign({ user_id, username }, SECRET);}
export function decodeToken(token) {
  return jwt.verify(token, SECRET);
}
