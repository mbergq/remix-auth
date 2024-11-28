import * as dotenv from "dotenv";
import { db } from "../utils";
import { eq } from "drizzle-orm";
import { user, token as tokenTable } from "../schema";
import jwt from "jsonwebtoken";
import { hash } from "@node-rs/argon2";

dotenv.config({ path: "../../.env" });

const createUser = async (name: string, password: string) => {
  const hashedPassword = await hash(password);
  console.log(hashedPassword);
  const insertUser = await db
    .insert(user)
    .values({ userName: name, password: hashedPassword })
    .returning();
  return insertUser[0];
};

const loginUser = async (name: string, password: string) => {
  try {
    const findUser = await db
      .select()
      .from(user)
      .where(eq(user.userName, name));
    // console.log(findUser);
    if (findUser.length === 0) {
      Response.json({ status: 401, error: "User not found" });
    }
    console.log(await Bun.password.verify(password, findUser[0].password));
    const matchPassword = await Bun.password.verify(
      findUser[0].password,
      password
    );
    console.log("Pwdmatch:", matchPassword);
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
    Response.json({
      userId: findUser[0].id,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    Response.json({ status: 500, error: "Login failed" });
  }
};

export { createUser, loginUser };
