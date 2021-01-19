import api from "../utils/api";

export const postService = async (url, body, method = "POST") => {
  try {
    const resp = await api(url, {
      method,
      data: body,
    });

    if (resp.status >= 200 && resp.status < 300) {
      return {
        isSuccess: true,
        data: resp.data,
      };
    } else {
      console.log(resp)
      return {
        isSuccess: false,
        errorMessage: typeof resp.data ==='string' ? resp.data : "Error Occurred.",
      };
    }
  } catch (err) {
    return {
      isSuccess: false,
      errorMessage: typeof err ==='string' ? err : "Error Occurred.",
    };
  }
};

export const getService = async (url) => {
  try {
    const resp = await api(url, {
      method: "GET",
    });

    if (resp.status >= 200 && resp.status < 300) {
      return {
        isSuccess: true,
        data: resp.data,
      };
    } else {
      return {
        isSuccess: false,
        errorMessage:typeof resp.data ==='string' ? resp.data : "Error Occurred.",
      };
    }
  } catch (err) {
    return {
      isSuccess: false,
      errorMessage: typeof err ==='string' ? err : "Error Occurred.",
    };
  }
};

export const imageService = async (url, body, file, onProgress) => {

    try {
      const resp = await api.post(
        url,
        body,
        {
          "Content-Type": "multipart/form-data",
          onUploadProgress: ({ total, loaded }) => {
            onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, file);
          }
        }
      );
    if (resp.status >= 200 && resp.status < 300) {
      return {
        isSuccess: true,
        data: resp.data,
      };
    } else {
      console.log(resp)
      return {
        isSuccess: false,
        errorMessage: typeof resp.data === 'string' ? resp.data : "Error Occurred.",
      };
    }
  } catch (err) {
    return {
      isSuccess: false,
      errorMessage: typeof err === 'string' ? err : "Error Occurred.",
    };
  }
};