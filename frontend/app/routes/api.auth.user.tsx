import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  // const user = await getUser(request);

  return Response.json({
    msg: "Api reached",
  });
}
