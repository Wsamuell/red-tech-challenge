import { Order } from './types';

export const filterSearchOrders = (
  orders: Order[],
  searchInputID: string
): Order[] => {
  let filteredOrders: Order[] = [];

  switch (searchInputID.length > 1) {
    case true:
      filteredOrders = orders.filter((order) =>
        order.orderId.includes(searchInputID)
      );
      break;
    case false:
      filteredOrders = orders;
      break;
    default:
      filteredOrders = orders;
      break;
  }
  return filteredOrders;
};
