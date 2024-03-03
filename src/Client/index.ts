import { NewOrder, Order, OrderType } from '../Helper/types';

const { REACT_APP_API_KEY, REACT_APP_URL } = process.env;

// I tried a more DRY approach but it turns out i needs to pass response to some data and not others so, scratching a few things.
// This should help improve readability with sacrifice of a few lines of code

const fetchData = async (
  url: string,
  method: string,
  body?: NewOrder | Order | string[]
) => {
  const requestOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ApiKey: REACT_APP_API_KEY!,
    },
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${REACT_APP_URL}${url}`, requestOptions);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data. Status: ${response.status}: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
};

export const fetchAllOrders = async () => {
  return fetchData('/api/Orders', 'GET');
};

export const addNewOrder = async (order: NewOrder) => {
  return fetchData('/api/Orders/', 'POST', order);
};

export const updateOrder = async (order: Order) => {
  return fetchData('/api/Orders', 'PUT', order);
};

// Ran into a dilema
//  - we wont be able to search for multiple types if i use this type
//  - we wont have access to all the orders to search by order id
// ultimately decided not to use this values and just use what we have in state to create search
// this decision led to creating a second order type called filteredOrder to keep a list of orders that are filtered to display so we dont have to re run fetch multiple times

// although i know this decision wont be right in a large application, i am willing to talk more about it during a follow up interview

export const getOrderByType = async (type: OrderType) => {
  return fetchData(`/api/Orders/ByType?orderType=${type}`, 'GET');
};

// delete doesnt return anything so it makes sense to tear out this functionality
export const deleteOrder = async (orderId: string[]) => {
  try {
    const response = await fetch(`${REACT_APP_URL}/api/Orders/Delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ApiKey: REACT_APP_API_KEY!,
      },
      body: JSON.stringify(orderId),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data. Status: ${response.status}: ${response.statusText}`
      );
    }
  } catch (error: any) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
};
