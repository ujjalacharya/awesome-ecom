import { getTokenService, postTokenService } from "../../utils/commonService";
import { ORDER_BASE_URL } from "../../utils/constants";

export class OrderService {
  getOrders(query) {
    let url = `${ORDER_BASE_URL}/orders?${query}&perPage=10`;
    let data = getTokenService(url, "GET");
    return data;
  }

  getOrderById(id) {
    let url = `${ORDER_BASE_URL}/user-order/${id}`;
    let data = getTokenService(url, "GET");
    return data;
  }

  getOrdersStatuses() {
    let url = `${ORDER_BASE_URL}/get-order-status`;
    let data = getTokenService(url, "GET");
    return data;
  }

  placeOrder(body) {
    let url = `${ORDER_BASE_URL}/create-order`;
    let data = postTokenService(url, "POST", body);
    return data;
  }

  cancelOrder(id, body) {
    let url = `${ORDER_BASE_URL}/cancel-order/${id}`;
    let data = postTokenService(url, "PATCH", body);
    return data;
  }


  getShippingCharge(body) {
    let url = `${ORDER_BASE_URL}/shipping-charge`;
    let data = postTokenService(url, "POST", body);
    return data;
  }
}
