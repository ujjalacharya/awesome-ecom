import { getTokenService } from "../../utils/commonService";

export class OrderService {
    getOrders(query) {
    let url = `${process.env.SERVER_BASE_URL}/api/order/orders?${query}&perPage=5`
    let data = getTokenService(url, 'GET');
    return data;
  }
}
