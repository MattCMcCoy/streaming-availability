// This file is generated by next-typesafe-url
// Do not edit this file directly.

// @generated
// prettier-ignore
/* eslint-disable */


declare module "@@@next-typesafe-url" {
  import type { InferRoute, StaticRoute } from "next-typesafe-url";

  interface DynamicRouter {
    "/details/[mid]": InferRoute<import("./src/app/details/[mid]/routeType").RouteType>;
  }

  interface StaticRouter {
    "/login": StaticRoute;
    "/register": StaticRoute;
    "": StaticRoute;
  }
}
