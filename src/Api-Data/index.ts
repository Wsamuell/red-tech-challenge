import { NewOrder, Order, OrderType } from '../types';

const { REACT_APP_API_KEY, REACT_APP_URL } = process.env;

const fetchData = async (url: string, method: string, body?: any) => {
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
      throw new Error('Failed to fetch data');
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
  return fetchData('/api/Orders', 'POST', order);
};

export const updateOrder = async (order: Order) => {
  return fetchData('/api/Orders', 'PUT', order);
};

export const getOrderByType = async (type: OrderType) => {
  return fetchData(`/api/Orders/ByType?type=${type}`, 'GET');
};

export const deleteOrder = async (orderId: string[]) => {
  return fetchData('/api/Orders/Delete', 'POST', orderId);
};
