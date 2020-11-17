import { getTokenService, postTokenService } from "../../utils/commonService";

export class OrderService {
  getOrders(query) {
    let url = `${process.env.SERVER_BASE_URL}/api/order/orders?${query}&perPage=10`;
    let data = getTokenService(url, "GET");
    return data;
  }

  getOrdersStatuses() {
    let url = `${process.env.SERVER_BASE_URL}/api/order/get-order-status`;
    let data = getTokenService(url, "GET");
    return data;
  }

  placeOrder(body) {
    let url = `${process.env.SERVER_BASE_URL}/api/order/create-order`;
    let data = postTokenService(url, "POST", body);
    return data;
  }

  getShippingCharge(body) {
    let url = `${process.env.SERVER_BASE_URL}/api/order/shipping-charge`;
    let data = postTokenService(url, "POST", body);
    return data;
  }
}
