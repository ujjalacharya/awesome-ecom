import { SERVER_BASE_URL } from "../../utils/common";
import { getTokenService, postTokenService } from "../../utils/commonService";

export class OrderService {
  getOrders(query, token) {
    let url = `${SERVER_BASE_URL}/api/order/orders?${query}&perPage=10`;
    let data = getTokenService(url, "GET", token);
    return data;
  }

  getOrdersStatuses() {
    let url = `${SERVER_BASE_URL}/api/order/get-order-status`;
    let data = getTokenService(url, "GET");
    return data;
  }

  placeOrder(body) {
    let url = `${SERVER_BASE_URL}/api/order/create-order`;
    let data = postTokenService(url, "POST", body);
    return data;
  }

  getShippingCharge(body) {
    let url = `${SERVER_BASE_URL}/api/order/shipping-charge`;
    let data = postTokenService(url, "POST", body);
    return data;
  }
}
