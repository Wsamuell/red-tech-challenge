import { Order, OrderType } from '../types';

const { REACT_APP_API_KEY, REACT_APP_URL } = process.env;

export const fetchAllOrders = async () => {
  try {
    const response = await fetch(`${REACT_APP_URL}/api/Orders`, {
      headers: {
        method: 'GET',
        ApiKey: REACT_APP_API_KEY!,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(' Failed to get all orders');
  }
};

export const addNewOrder = async (order: Order) => {
  try {
    const response = await fetch(`${REACT_APP_URL}/api/Orders`, {
      headers: {
        method: 'POST',
        ApiKey: REACT_APP_API_KEY!,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(' Failed to add order');
  }
};

export const updateOrder = async (order: Order) => {
  try {
    const response = await fetch(`${REACT_APP_URL}/api/Orders`, {
      headers: {
        method: 'PUT',
        ApiKey: REACT_APP_API_KEY!,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(' Failed to update order');
  }
};

export const getOrderByType = async (type: OrderType) => {
  try {
    const response = await fetch(`${REACT_APP_URL}/api/Orders/ByType`, {
      headers: {
        method: 'GET',
        ApiKey: REACT_APP_API_KEY!,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(' Failed to get order by type');
  }
};

export const deleteOrder = async (orderId: string[]) => {
  try {
    const response = await fetch(`${REACT_APP_URL}/api/Orders/Delete`, {
      headers: {
        method: 'POST',
        ApiKey: REACT_APP_API_KEY!,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(' Failed to delete order');
  }
};
