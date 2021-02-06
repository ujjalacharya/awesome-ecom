import { postService, getService } from "../commonServices";

export class SuperadminService {
  getAdmins(page,perPage,status='', keyword='') {
    let url = `/superadmin/admins?page=${page}&perPage=${perPage}&status=${status}&keyword=${keyword}`;
    let data = getService(url);
    return data;
  }

  getAdmin(id) {
    let url = `/admin/${id}`;
    let data = getService(url);
    return data;
  }

  getProducts({ page, perPage, keyword = '', createdAt = '', updatedAt = '', status = '', price = '', outofstock = '' }) {
    let url = `/superadmin/products?page=${page}&perPage=${perPage}&createdAt=${createdAt}&price=${price}&updatedAt=${updatedAt}&status=${status}&keyword=${keyword}&outofstock=${outofstock}`;
    let data = getService(url);
    return data;
  }

  approveProduct(product_slug) {
    let url = `/superadmin/approve-product/${product_slug}`;
    let data = postService(url, undefined, 'PATCH');
    return data;
  }

  disApproveProduct(product_slug, comment='') {
    const body = JSON.stringify({ comment });
    let url = `/superadmin/disapprove-product/${product_slug}`;
    let data = postService(url, body, 'PUT');
    return data;
  }
}
