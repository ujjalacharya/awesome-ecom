import { postService, getService } from "../commonServices";

export class OrderService {
  getOrders(id,page,perPage,status='', keyword='') {
    let url = `/order/orders/${id}?page=${page}&perPage=${perPage}&status=${status}&keyword=${keyword}`;
    let data = getService(url);;
    return data;
  }

  getOrder(id, order_id) {
    let url = `/order/admin-order/${id}/${order_id}`;
    let data = getService(url);
    return data;
  }

  toggleOrderApproval(id, order_id) {
    let url = `/order/toggle-order-approval/${id}/${order_id}`;
    let data = postService(url,undefined,'PATCH');
    return data;
  }

  toggletobeReturnOrder(id, order_id, remark = '', returnedAmount = '') {
    const body = JSON.stringify({ remark, returnedAmount });//required only if complete to tobereturned
    let url = `/order/toggle-order-to-get-return/${id}/${order_id}`;
    let data = postService(url,body,'PATCH');
    return data;
  }
  
  cancelOrder(id, order_id, remark) {
    const body = JSON.stringify({ remark });
    let url = `/order/cancel-order/${id}/${order_id}`;
    let data = postService(url,body,'PATCH');
    return data;
  }
}
