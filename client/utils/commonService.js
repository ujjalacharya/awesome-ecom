import fetch from "isomorphic-unfetch";
import cookie from "js-cookie";
import { initStore } from "../redux";
import { AUTHENTICATE } from "../redux/types";
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

export const getTokenService = async (url, method, ctx) => {
  try {
    const resp = await fetch(url, {
      method,
      headers: {
        "x-auth-token": getCookie("token", ctx?.req),
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
        const body = JSON.stringify({
          refreshToken: getCookie("refresh-token", ctx?.req),
        });
        const resp = await fetch(
          `http://localhost:3003/api/admin-auth/refresh-token`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "x-auth-token": getCookie("token", ctx?.req),
            },
            body,
          }
        );
        const data = await resp.json();

        if (resp.status === 200) {
          setCookie("token", data.accessToken);
          setCookie("refresh-token", data.refreshToken);
      initStore().dispatch({ type: AUTHENTICATE, payload: data.token });
      ctx?.store.dispatch({ type: AUTHENTICATE, payload: data.accessToken });



          const resp = await getTokenService(url, method, ctx);
          return resp;
        }
      }else {
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
