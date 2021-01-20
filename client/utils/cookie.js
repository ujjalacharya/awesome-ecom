// resource for handling cookies taken from here:
// https://github.com/carlos-peru/next-with-api/blob/master/lib/session.js

import cookie from "js-cookie";
import Cookies from "cookies";

export const setCookie = (key, value, req, res) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
      path: "/",
    });
  } else {
    const servercookies = new Cookies(req, res);
    servercookies.set(key, value, {
      httpOnly: false, // true by default
    });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key, req, accessToken) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req, accessToken);
};

export const getCookieFromBrowser = (key) => {
  return cookie.get(key);
};

export const getCookieFromServer = (key, req, accessToken) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return accessToken || rawCookie.split("=")[1];
};
