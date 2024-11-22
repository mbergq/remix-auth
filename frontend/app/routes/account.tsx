import type {
  ActionFunctionArgs,
  // LoaderFunctionArgs,
} from "@remix-run/node"; // or cloudflare/deno
import { Form } from "@remix-run/react";

// import { useLoaderData, Form } from "@remix-run/react";

// export async function loader({
//   request,
// }: LoaderFunctionArgs) {
//   const user = await getUser(request);
//   return json({
//     displayName: user.displayName,
//     email: user.email,
//   });
// }

export default function Component() {
  // const user = useLoaderData<typeof loader>();
  return (
    <Form method="post" action="/account">
      {/* <h1>Settings for {user.displayName}</h1> */}

      <input name="displayName" defaultValue={"martintest"} />
      <input name="email" defaultValue={"martintestemail"} />

      <button type="submit">Save</button>
    </Form>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  console.log(formData);

  // const user = await getUser(request);

  // await updateUser(user.id, {
  //   email: formData.get("email"),
  //   displayName: formData.get("displayName"),
  // });

  return Response.json({ ok: true });
}
