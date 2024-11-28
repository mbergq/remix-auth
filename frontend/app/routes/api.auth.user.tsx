import { LoaderFunctionArgs } from "react-router";

export async function loader({ request }: LoaderFunctionArgs) {
  return Response.json({
    msg: "Api reached",
  });
}
