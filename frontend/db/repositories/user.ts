import * as dotenv from "dotenv";
import { db } from "../utils";
import { eq } from "drizzle-orm";
import { user, token as tokenTable } from "../schema";
import jwt from "jsonwebtoken";

dotenv.config({ path: "../../.env" });
console.log(process.env.ACCESS_TOKEN_SECRET);
const createUser = async (name: string, password: string) => {
  // const hashedPassword = await Bun.password.hash(password, "argon2d");
  const insertUser = await db
    .insert(user)
    .values({ userName: name, password: password })
    .returning();
  return insertUser[0];
};

const loginUser = async (name: string, password: string) => {
  try {
    const findUser = await db
      .select()
      .from(user)
      .where(eq(user.userName, name));
    if (findUser.length === 0) {
      Response.json({ status: 401, error: "User not found" });
    }
    const matchPassword = await Bun.password.verify(
      password,
      findUser[0].password
    );
    if (!matchPassword) {
      Response.json({ status: 401, error: "Password is not correct" });
    }
    const accessToken = jwt.sign(
      { userId: findUser[0].id },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { userId: findUser[0].id },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: "1h" }
    );
    await db.insert(tokenTable).values({
      userId: findUser[0].id,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
    return Response.json({
      userId: findUser[0].id,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    Response.json({ status: 500, error: "Login failed" });
  }
};

export { createUser, loginUser };
