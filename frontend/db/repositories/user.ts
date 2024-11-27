import { db } from "../utils";
import { user } from "../schema";

const createUser = async (name: string, password: string) => {
  // const hashedPassword = await Bun.password.hash(password, "argon2d");
  const insertUser = await db
    .insert(user)
    .values({ userName: name, password: password })
    .returning();
  return insertUser[0];
};

export { createUser };
