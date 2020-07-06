import fetch from "isomorphic-unfetch";

export class OtherService {
  async getBannerImages() {
    try {
      const resp = await fetch(
        `${process.env.SERVER_BASE_URL}/api/superadmin/banner?page=1&perPage=10`
      );

      const data = await resp.json();

      return {
        isSuccess: true,
        data,
      };
    } catch (err) {
      return {
        isSuccess: false,
        errorMessage: err,
      };
    }
  }
}
