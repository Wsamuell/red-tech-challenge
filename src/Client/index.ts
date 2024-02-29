import { NewOrder, Order, OrderType } from '../types';

const { REACT_APP_API_KEY, REACT_APP_URL } = process.env;

// I tried a more DRY approach but it turns out i needs to pass response to some data and not others so, cratching a few things.
// This should help improve readability with sacrifice of 30 lines of code

const fetchData = async (
  url: string,
  method: string,
  body?: NewOrder | Order | string[]
) => {
  try {
    const response = await fetch(`${REACT_APP_URL}${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ApiKey: REACT_APP_API_KEY!,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

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
  try {
    const response = await fetch(`${REACT_APP_URL}/api/Orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ApiKey: REACT_APP_API_KEY!,
      },
    });

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

export const addNewOrder = async (order: NewOrder) => {
  return fetchData('/api/Orders', 'POST', order);
};

export const updateOrder = async (order: Order) => {
  return fetchData('/api/Orders', 'PUT', order);
};

export const getOrderByType = async (type: OrderType) => {
  try {
    const response = await fetch(
      `${REACT_APP_URL}/api/Orders/ByType?orderType=${type}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ApiKey: REACT_APP_API_KEY!,
        },
      }
    );

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
