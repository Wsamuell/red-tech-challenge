export enum OrderType {
  PurchaseOrder = 'Purchase',
  ReturnOrder = ' Return',
  SaleOrder = 'Sale',
  Standard = 'Standard',
  TransferOrder = ' Transfer',
}

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
