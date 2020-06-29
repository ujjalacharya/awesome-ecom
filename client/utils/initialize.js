import Router from "next/router";
import jwt from "jsonwebtoken";
import actions from "../redux/actions";
import { getCookie } from "../utils/cookie";
import { handleRefreshToken } from "./common";

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
export default function (ctx) {
  if (ctx.isServer) {
    if (ctx.req.headers.cookie) {
      ctx.store.dispatch(actions.reauthenticate(getCookie("token", ctx.req)));
    }
  } else {
    const token = ctx.store.getState().authentication.token;
    let usableToken;
    if(token){
      usableToken = jwt.decode(token).exp > (new Date().getTime() + 1) / 1000;
    }


    if (token && (ctx.pathname === "/signin" || ctx.pathname === "/signup")) {

      if (usableToken) {
        setTimeout(function () {
          Router.push("/");
        }, 0);
      } else {
        // handleRefreshToken(ctx.req);
        Router.push("/signin");
      }
    } else if ((!token || !usableToken ) && ctx.pathname === "/dashboard") {
      Router.push("/signin");
    }
  }
}
