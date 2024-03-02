export enum OrderType {
  PurchaseOrder = 'PurchaseOrder',
  ReturnOrder = 'ReturnOrder',
  SaleOrder = 'SaleOrder',
  Standard = 'Standard',
  TransferOrder = 'TransferOrder',
}

// BKMRK: Might decide to use this on the UI instead
export const orderTypetoString = (orderType: OrderType): String => {
  switch (orderType) {
    case OrderType.PurchaseOrder:
      return 'Purchase';
    case OrderType.TransferOrder:
      return 'Transfer';
    case OrderType.ReturnOrder:
      return 'ReturnOrder';
    case OrderType.SaleOrder:
      return 'Sale';
    case OrderType.Standard:
      return 'Standard';
  }
};

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
