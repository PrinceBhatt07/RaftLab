export const calculateTotal = (items: any[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);