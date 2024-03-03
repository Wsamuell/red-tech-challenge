export enum OrderType {
  PurchaseOrder = 'PurchaseOrder',
  ReturnOrder = 'ReturnOrder',
  SaleOrder = 'SaleOrder',
  Standard = 'Standard',
  TransferOrder = 'TransferOrder',
}

export const orderTypeList = Object.values(OrderType);

export type Order = {
  createdByUserName: string;
  createdDate: string;
  customerName: string;
  orderId: string;
  orderType: OrderType;
};

export type NewOrder = {
  createdByUserName: string;
  customerName: string;
  orderType: string;
};
