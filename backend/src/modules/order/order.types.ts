export enum OrderStatus {
  RECEIVED = "RECEIVED",
  PREPARING = "PREPARING",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED"
}

export interface CreateOrderInput {
  userId: string;
  items: {
    menuItemId: string;
    quantity: number;
  }[];
  deliveryName: string;
  deliveryAddress: string;
  deliveryPhone: string;
}