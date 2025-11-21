// utils/hashing.js
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export async function hashPassword(password) {
  const rounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
  return bcrypt.hash(password, rounds);
}

export async function compare_hashed_passwords(passwordInput, storedHashedPassword) {
  return bcrypt.compare(passwordInput, storedHashedPassword);
}




