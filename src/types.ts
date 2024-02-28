export type Order = {
  createdByUserName: string;
  createdDate: string;
  customerName: string;
  orderId: string;
  orderType: string;
};

export type NewOrder = {
  createdByUserName: string;
  createdDate: string;
  customerName: string;
  orderType: string;
};

export enum OrderType {
  PurchaseOrder = 'Purchase',
  ReturnOrder = ' Return',
  SaleOrder = 'Sale',
  Standard = 'Standard',
  TransferOrder = ' Transfer',
}
