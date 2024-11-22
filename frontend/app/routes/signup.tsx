import { Form, json } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import { db } from "../../db/utils";
import { user } from "../../db/schema";
export default function SignUp() {
  return (
    <>
      <div className="h-full min-h-dvh bg-[#FFFDF2] flex flex-col items-center justify-center">
        <div className="w-3/4 h-96 bg-[#2C2E39] rounded-3xl flex flex-col items-center justify-center">
          <h2 className="text-center font-semibold text-lg text-[#FFFDF2] mb-2">
            Sign up
          </h2>
          <Form
            action="/signup"
            method="post"
            className="flex flex-col items-center"
          >
            <input
              type="name"
              placeholder="Name.."
              name="name"
              className="bg-slate-600 rounded-sm py-2 px-2 text-[#FFFDF2]"
            />
            <input
              type="password"
              placeholder="Password.."
              name="password"
              className="bg-slate-600 rounded-sm my-3 py-2 px-2"
            />
            <button
              type="submit"
              className="text-[#FFFDF2] font-bold my-2 py-2 px-2 rounded border-lg border-solid border-cyan-600 w-full bg-cyan-600"
            >
              Sign up
            </button>
          </Form>
          <div className="w-3/4 flex gap-2">
            <p className="text-[#FFFDF2] font-light">Have an account?</p>
            <button className="text-cyan-500 font-semibold">Log in</button>
          </div>
        </div>
      </div>
    </>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  // const name = formData.get("name");
  // const password = formData.get("password");
  const name = String(formData.get("name"));
  const password = String(formData.get("password"));

  if (!name || !password) {
    return Response.json(
      { error: "Required fields are missing" },
      { status: 400 }
    );
  }

  try {
    const hashedPassword = await Bun.password.hash("test1", "argon2d");
    await db.insert(user).values({ userName: name, password: hashedPassword });
    Response.json({ message: "A new user has been added", status: 201 });
  } catch (error) {
    Response.json({
      error: "server_error",
      message: "Unable to create user",
      status: 400,
    });
  }
  return Response.json({ ok: true });
};
