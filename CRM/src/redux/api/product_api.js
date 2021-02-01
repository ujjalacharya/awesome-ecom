import { postService, getService, imageService } from "../commonServices";

export class ProductService {
  getProducts({id, page, perPage, keyword = '', createdAt = '', updatedAt='' , status='',price='', outofstock=''}) {
    let url = `/product/products/${id}?page=${page}&perPage=${perPage}&createdAt=${createdAt}&price=${price}&updatedAt=${updatedAt}&status=${status}&keyword=${keyword}&outofstock=${outofstock}`;
    let data = getService(url);;
    return data;
  }

  getProduct(product_slug) {
    let url = `/product/${product_slug}`;
    let data = getService(url);
    return data;
  }

  getCategories() {
    let url = `/superadmin/product-categories`;
    let data = getService(url);
    return data;
  }

  getBrands() {
    let url = `/superadmin/product-brands`;
    let data = getService(url);
    return data;
  }

  deleteImageById(id, image_id) {
    let url = `/product/image/${id}?image_id=${image_id}`;
    let data = postService(url,undefined,'DELETE');
    return data;
  }

  deleteProductImage(id,product_slug, image_id) {
    let url = `/product/image/${id}/${product_slug}?image_id=${image_id}`;
    let data = postService(url, undefined, 'DELETE');
    return data;
  }

  deleteProduct(id, slug) {
    let url = `/product/delete-product/${id}/${slug}`;
    let data = postService(url,undefined,'PATCH');
    return data;
  }

  addProduct ({ id,...restProductData}) {
    let body = JSON.stringify(restProductData)
    let url = `/product/${id}`;
    let data = postService(url,body);
    return data;
  }

  updateProduct({ id, product_slug, ...restProductData }) {
    let body = JSON.stringify(restProductData)
    let url = `/product/${id}/${product_slug}`;
    let data = postService(url, body, 'PUT');
    return data;
  }

  uploadImages(url, body, file, onProgress) {
    let data = imageService(url, body, file, onProgress)
    return data
  }

}
