import { type RouteConfig, route, index } from "@react-router/dev/routes";
// import { flatRoutes } from "@react-router/fs-routes";
// import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";

export default [
  index("./components/home.tsx"),
  route("/signup", "./components/signup.tsx"),
] satisfies RouteConfig;
