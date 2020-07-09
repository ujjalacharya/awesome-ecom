import fetch from "isomorphic-unfetch";
import cookie from "js-cookie";
import { getCookie } from "./cookie";

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

export const postService = async (url, method, body) => {
  try {
    const resp = await fetch(url, {
      method,
      headers: {
        "content-type": "application/json",
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


