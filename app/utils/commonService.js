// import cookie from "js-cookie";
// import { getCookie } from "./cookie";

// export const postTokenService = async (url, method, body) => {
//   try {
//     const resp = await fetch(url, {
//       method,
//       headers: {
//         "content-type": "application/json",
//         "x-auth-token": cookie.get("token"),
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await resp.json();

//     if (resp.status >= 200 && resp.status < 300) {
//       return {
//         isSuccess: true,
//         data,
//       };
//     } else {
//       return {
//         isSuccess: false,
//         errorMessage: data.error,
//       };
//     }
//   } catch (err) {
//     return {
//       isSuccess: false,
//       errorMessage: err,
//     };
//   }
// };

export const getTokenService = async (url, method, token) => {
  try {
    const resp = await fetch(url, {
      method,
      headers: {
        "x-auth-token": token
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

export const uploadImageService = async (url, method, formData, token) => {
  try {
    const resp = await fetch(url, {
      method,
      headers: {
        // "Content-Type": "multipart/form-data",
        "x-auth-token": token,
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


