import { Form, Link, redirect } from "react-router";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { createUser } from "../../db/repositories/user";
import { getSession, commitSession } from "../sessions";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));

  if (session.has("userId")) {
    return redirect("/");
  }

  const data = { error: session.get("error") };

  return Response.json(data, {
    headers: {
      "Set-cookie": await commitSession(session),
    },
  });
};

export default function SignUp() {
  return (
    <>
      <div className="h-full min-h-dvh bg-[#424037] flex flex-col items-center justify-center">
        <div className="w-3/4 h-96 bg-[#2C2E39] rounded-3xl flex flex-col items-center justify-center">
          <h2 className="text-center font-semibold text-lg text-[#FFFDF2] mb-2">
            Login
          </h2>
          <Form
            action="/login"
            method="post"
            className="flex flex-col items-center"
          >
            <input
              type="name"
              placeholder="Username.."
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
              Login
            </button>
          </Form>
          <div className="w-3/4 flex gap-2">
            <p className="text-[#FFFDF2] font-light">Need an account?</p>
            <Link to={"/signup"}>
              <button className="text-cyan-500 font-semibold">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const name = String(formData.get("name"));
  const password = String(formData.get("password"));

  return Response.json({
    message: "Succesful",
  });
  // return redirect("/account");
};
