import { Order, OrderType } from './types';

export const filterOrdersBySearchAndType = (
  orders: Order[],
  searchInputID: string,
  selectedTypes: OrderType[]
): Order[] => {
  let filteredOrders: Order[] = [];

  // a little funky but i think this is better than an if-else statement overall although the 'condition' is not very readable.
  // there are 3 things happening
  //  - we check if we are filtering both type and search bar
  //  - or filtering just searchbar
  //  - or filtering by type
  //  - or not filtering at all
  const condition =
    searchInputID.length > 0 && selectedTypes.length > 0
      ? 'both'
      : searchInputID.length > 0
      ? 'searchInput'
      : selectedTypes.length > 0
      ? 'selectedTypes'
      : 'none';

  switch (condition) {
    case 'both':
      // Scenario: Both search input and order types provided
      // First, filter by search input
      // this scenerio  makes sure if you search by input and the type is not the same, nothing shows up
      const filteredBySearch = orders.filter((order) =>
        order.orderId.includes(searchInputID)
      );

      // Then, filter the result by selected types
      filteredOrders = filteredBySearch.filter((order) =>
        selectedTypes.includes(order.orderType)
      );
      break;
    case 'searchInput':
      // Scenario: Only search input provided
      filteredOrders = orders.filter((order) =>
        order.orderId.includes(searchInputID)
      );
      break;
    case 'selectedTypes':
      // Scenario: Only order types selected
      filteredOrders = orders.filter((order) =>
        selectedTypes.includes(order.orderType)
      );
      break;
    case 'none':
      // Scenario: Neither search input nor order types selected
      filteredOrders = orders;
      break;
    default:
      // Default case
      filteredOrders = orders;
      break;
  }
  return filteredOrders;
};
