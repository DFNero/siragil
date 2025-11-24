import { db } from "../config/db";

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: "admin" | "kasir" | "operator" | "owner" | "superadmin";
}

export const createUser = async (user: User) => {
  const [result]: any = await db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [user.name, user.email, user.password, user.role]
  );
  return result.insertId;
};

export const findUserByEmail = async (email: string) => {
  const [rows]: any = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};
