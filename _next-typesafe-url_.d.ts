// This file is generated by next-typesafe-url
// Do not edit this file directly.

// @generated
// prettier-ignore
/* eslint-disable */


declare module "@@@next-typesafe-url" {
  import type { InferRoute, StaticRoute } from "next-typesafe-url";
  
  interface DynamicRouter {
    "/details/[mid]": InferRoute<import("./src/app/details/[mid]/routeType").RouteType>;
    "/details/[mid]/reviews": InferRoute<import("./src/app/details/[mid]/reviews/routeType").RouteType>;
    "/profile/[uid]": InferRoute<import("./src/app/profile/[uid]/routeType").RouteType>;
  }

  interface StaticRouter {
    "/login": StaticRoute;
    "/register": StaticRoute;
    "": StaticRoute;
    "/profile/followers": StaticRoute;
    "/profile/following": StaticRoute;
    "/profile/interactions": StaticRoute;
    "/profile": StaticRoute;
  }
}
