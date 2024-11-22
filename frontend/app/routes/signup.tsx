import { useRemixForm, getValidatedFormData } from "remix-hook-form";
import { Form, json } from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/node";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// import createUser from "../../../backend/src/controllers/createUser";
// import getUser from "../../../backend/src/controllers/getUser";

const schema = zod.object({
  name: zod.string().min(1),
  password: zod.string().min(1),
});

type FormData = zod.infer<typeof schema>;

const resolver = zodResolver(schema);

// export const loader = async ({ request }: { request: Request }) => {
//   const getData = await getUser(request);
//   return null;
// };

export const action = async ({ request }: ActionFunctionArgs) => {
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<FormData>(request, resolver);
  if (errors) {
    console.log("Errors:", errors);
    return json({ errors, defaultValues });
  }

  return json(data);
};

export default function SignUp() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useRemixForm<FormData>({
    mode: "onSubmit",
    resolver,
  });

  return (
    <>
      <div className="h-full min-h-dvh bg-[#FFFDF2] flex flex-col items-center justify-center">
        <div className="w-3/4 h-96 bg-[#2C2E39] rounded-3xl flex flex-col items-center justify-center">
          <h2 className="text-center font-semibold text-lg text-[#FFFDF2] mb-2">
            Sign up
          </h2>
          <Form
            onSubmit={handleSubmit}
            method="POST"
            className="flex flex-col items-center"
          >
            <label>
              <input
                type="text"
                {...register("name")}
                placeholder="Email.."
                className="bg-slate-600 rounded-sm py-2 px-2 text-[#FFFDF2]"
              />
              {errors.name && <p>{errors.name.message}</p>}
            </label>
            <label>
              <input
                type="password"
                {...register("password")}
                placeholder="Password.."
                className="bg-slate-600 rounded-sm my-3 py-2 px-2"
              />
              {errors.password && <p>errors.password.message{}</p>}
            </label>
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
