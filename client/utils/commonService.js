import fetch from "isomorphic-unfetch";
import cookie from "js-cookie";
import { initStore } from "../redux";
import { AUTHENTICATE, DEAUTHENTICATE } from "../redux/types";
import { BASE_URL } from "./constants";
import { deauthenticate } from "../redux/actions/authActions";
import { getCookie, setCookie } from "./cookie";

export const postTokenService = async (url, method, body) => {
  try {
    const resp = await fetch(url, {
      method,
      headers: {
        "content-type": "application/json",
        "x-auth-token": cookie.get("token"),
      },
      body: JSON.stringify(body),
    });

    const data = await resp.json();

    if (resp.status >= 200 && resp.status < 300) {
      return {
        isSuccess: true,
        data,
      };
    } else {
      if (data.error === "jwt expired") {
        initStore().dispatch(deauthenticate());
        if(window){
          window.location.href = "/"
        }
        return {
          isSuccess: false,
          errorMessage: "Login Expired",
        };
      } else {
        return {
          isSuccess: false,
          errorMessage: data.error,
        };
      }
    }
  } catch (err) {
    return {
      isSuccess: false,
      errorMessage: err,
    };
  }
};

export const getTokenService = async (url, method, ctx, accessToken) => {
  try {
    const resp = await fetch(url, {
      method,
      headers: {
        "x-auth-token": getCookie("token", ctx?.req, accessToken),
      },
    });

    const data = await resp.json();
    if (resp.status >= 200 && resp.status < 300) {
      return {
        isSuccess: true,
        data,
      };
    } else {
      if (data.error === "jwt expired") {
        const response = await refreshTheToken(
          url,
          method,
          ctx,
          getTokenService
        );
        return response;
      } else {
        return {
          isSuccess: false,
          errorMessage: data.error,
        };
      }
    }
  } catch (err) {
    return {
      isSuccess: false,
      errorMessage: err,
    };
  }
};

export const postService = async (url, method, body) => {
  try {
    const resp = await fetch(url, {
      method,
      headers: {
        "content-type": "application/json",
        "x-auth-token": cookie.get("token"),
      },
      body: JSON.stringify(body),
    });

    const data = await resp.json();

    if (resp.status >= 200 && resp.status < 300) {
      return {
        isSuccess: true,
        data,
      };
    } else {
      return {
        isSuccess: false,
        errorMessage: data.error,
      };
    }
  } catch (err) {
    return {
      isSuccess: false,
      errorMessage: err,
    };
  }
};

export const getService = async (url) => {
  try {
    const resp = await fetch(url);

    const data = await resp.json();
    if (resp.status >= 200 && resp.status < 300) {
      return {
        isSuccess: true,
        data,
      };
    } else {
      return {
        isSuccess: false,
        errorMessage: data.error,
      };
    }
  } catch (err) {
    return {
      isSuccess: false,
      errorMessage: err,
    };
  }
};

export const uploadImageService = async (url, method, formData) => {
  try {
    const resp = await fetch(url, {
      method,
      headers: {
        // "Content-Type": "multipart/form-data",
        "x-auth-token": cookie.get("token"),
      },
      body: formData,
    });

    const data = await resp.json();

    if (resp.status >= 200 && resp.status < 300) {
      return {
        isSuccess: true,
        data,
      };
    } else {
      return {
        isSuccess: false,
        errorMessage: data.error,
      };
    }
  } catch (err) {
    return {
      isSuccess: false,
      errorMessage: err,
    };
  }
};

const refreshTheToken = async (url, method, ctx, callbackUrl) => {
  const body = JSON.stringify({
    refreshToken: getCookie("refresh-token", ctx?.req),
  });
  const resp = await fetch(`${BASE_URL}/api/user-auth/refresh-token`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-auth-token": getCookie("token", ctx?.req),
    },
    body,
  });
  const newdata = await resp.json();

  if (resp.status === 200) {
    setCookie("token", newdata.accessToken, ctx?.req, ctx?.res);
    setCookie("refresh-token", newdata.refreshToken, ctx?.req, ctx?.res);
    initStore().dispatch({ type: AUTHENTICATE, payload: newdata.accessToken });
    const resp = await callbackUrl(url, method, ctx, newdata.accessToken);
    return resp;
  } else {
    initStore().dispatch({ type: DEAUTHENTICATE });
    ctx?.store.dispatch({
      type: DEAUTHENTICATE,
    });
    if (ctx?.res) {
      ctx.res.writeHead(302, {
        Location: "/login",
      });
      ctx.res.end();
    } else {
      window.location.href = "/login";
    }
  }
};
