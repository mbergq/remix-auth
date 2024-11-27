import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  return Response.json({
    msg: "Api reached",
  });
}
