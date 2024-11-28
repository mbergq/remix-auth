import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  index("./components/home.tsx"),
  route("/signup", "./components/signup.tsx"),
  route("/login", "./components/login.tsx"),
] satisfies RouteConfig;
