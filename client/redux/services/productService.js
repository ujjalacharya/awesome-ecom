import fetch from "isomorphic-unfetch";

export class ProductService {
  async getLatestProducts() {
    try {
      const resp = await fetch(`${process.env.SERVER_BASE_URL}/api/product/latest`);

      const data = await resp.json();

      if(resp.status >= 200 && resp.status < 300){
        return {
            isSuccess: true,
            data,
          };
      }else{
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
  }

  async productCategories() {
    try {
      const resp = await fetch(`${process.env.SERVER_BASE_URL}/api/superadmin/product-categories`);

      const data = await resp.json();

      if(resp.status >= 200 && resp.status < 300){
        return {
            isSuccess: true,
            data,
          };
      }else{
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
  }

  async getProductDetails(slug) {
    try {
      const resp = await fetch(`${process.env.SERVER_BASE_URL}/api/product/${slug}`);

      const data = await resp.json();

      if(resp.status >= 200 && resp.status < 300){
        return {
            isSuccess: true,
            data,
          };
      }else{
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
  }
  
}

// async getProductsByCategory(query, body) {
//   console.log(body)
//   try {
//     const resp = await fetch(
//       `${process.env.SERVER_BASE_URL}/api/product/by-category${query}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//       }
//     );

//     const data = await resp.json();

//     return {
//       isSuccess: true,
//       data,
//     };
//   } catch (err) {
//     return {
//       isSuccess: false,
//       errorMessage: err,
//     };
//   }
// }
// }
