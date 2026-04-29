import { getIO } from "./socket.server";
import { SOCKET_EVENTS } from "./socket.events";

export const publishOrderStatusUpdate = (orderId: string, status: string) => {
  try {
    const io = getIO();
    io.to(`order_${orderId}`).emit(SOCKET_EVENTS.ORDER_STATUS_UPDATED, {
      orderId,
      status
    });
    console.log(`Published status update for order ${orderId}: ${status}`);
  } catch (error) {
    console.error("Failed to publish order status update:", error);
  }
};
