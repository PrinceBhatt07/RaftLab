import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";
import OrderTracker from "../components/order/OrderTracker";
import OrderStatus from "../components/order/OrderStatus";
import Navbar from "../components/common/Navbar";
import Loader from "../components/common/Loader";

const STATUS_SEQUENCE = ["RECEIVED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"];

const ETA: Record<string, string> = {
  RECEIVED: "Estimated 30–40 min",
  PREPARING: "Estimated 20–30 min",
  OUT_FOR_DELIVERY: "Estimated 10–15 min",
  DELIVERED: "Your order has arrived!",
};

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useOrder(id!);

  // Real-time status state
  const [realtimeStatus, setRealtimeStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    // Join room for this specific order
    import("../realtime/socket.client").then(({ getSocket, joinOrderRoom }) => {
      joinOrderRoom(id);
      const socket = getSocket();

      const handleStatusUpdate = (payload: { orderId: string; status: string }) => {
        if (payload.orderId === id) {
          setRealtimeStatus(payload.status);
          refetch(); // optionally refetch to get updated data from backend
        }
      };

      socket.on("orderStatusUpdated", handleStatusUpdate);

      return () => {
        socket.off("orderStatusUpdated", handleStatusUpdate);
      };
    });
  }, [id, refetch]);


  if (isLoading) return (
    <div className="hero-bg" style={{ minHeight: "100vh" }}>
      <Navbar />
      <Loader text="Loading your order…" />
    </div>
  );

  if (isError || !data) return (
    <div className="hero-bg" style={{ minHeight: "100vh" }}>
      <Navbar />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "70vh", gap: "12px", padding: "40px 24px" }}>
        <span style={{ fontSize: "3rem" }}>⚠️</span>
        <p style={{ color: "var(--color-text-muted)" }}>Could not load order details.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>Go Home</button>
      </div>
    </div>
  );

  const activeStatus = realtimeStatus ?? data.status ?? "RECEIVED";

  return (
    <div className="hero-bg" style={{ minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 24px 60px" }}>

        {/* Header */}
        <div className="animate-fade-in-up" style={{ marginBottom: "32px" }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate("/")}
            style={{ marginBottom: "16px" }}
          >
            ← Back to Menu
          </button>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <h1
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.6rem, 4vw, 2rem)",
                  color: "var(--color-text)",
                  letterSpacing: "-0.02em",
                }}
              >
                Order Status
              </h1>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", marginTop: "4px" }}>
                Order ID: <code style={{ color: "var(--color-primary)", fontSize: "0.82rem" }}>#{id?.slice(-8).toUpperCase()}</code>
              </p>
            </div>
            <OrderStatus status={activeStatus} />
          </div>
        </div>

        {/* Tracker */}
        <div className="animate-fade-in-up" style={{ animationDelay: "100ms", marginBottom: "24px" }}>
          <OrderTracker status={activeStatus} />
        </div>

        {/* ETA card */}
        <div
          className="glass-card animate-fade-in-up"
          style={{
            animationDelay: "200ms",
            padding: "20px 24px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <span style={{ fontSize: "2rem" }}>⏱️</span>
          <div>
            <p style={{ fontWeight: 600, color: "var(--color-text)", fontSize: "0.9rem" }}>
              Estimated Time
            </p>
            <p style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "1rem" }}>
              {ETA[activeStatus] ?? "—"}
            </p>
          </div>
        </div>

        {/* Delivery info */}
        {(data.deliveryName || data.deliveryAddress) && (
          <div
            className="glass-card animate-fade-in-up"
            style={{ animationDelay: "300ms", padding: "20px 24px", marginBottom: "24px" }}
          >
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "var(--color-text)",
                marginBottom: "12px",
              }}
            >
              📍 Delivery Details
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {data.deliveryName && (
                <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)" }}>
                  <strong style={{ color: "var(--color-text)" }}>Name:</strong> {data.deliveryName}
                </p>
              )}
              {data.deliveryAddress && (
                <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)" }}>
                  <strong style={{ color: "var(--color-text)" }}>Address:</strong> {data.deliveryAddress}
                </p>
              )}
              {data.deliveryPhone && (
                <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)" }}>
                  <strong style={{ color: "var(--color-text)" }}>Phone:</strong> {data.deliveryPhone}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Order items */}
        {data.items?.length > 0 && (
          <div
            className="glass-card animate-fade-in-up"
            style={{ animationDelay: "400ms", padding: "20px 24px" }}
          >
            <h3
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "0.9rem",
                color: "var(--color-text)",
                marginBottom: "12px",
              }}
            >
              🍽️ Items Ordered
            </h3>
            {data.items.map((item: any, i: number) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: i < data.items.length - 1 ? "1px solid var(--color-border)" : "none",
                  fontSize: "0.88rem",
                }}
              >
                <span style={{ color: "var(--color-text)" }}>
                  {item.menuItem?.name ?? item.menuItemId}
                  <span style={{ color: "var(--color-text-muted)" }}> × {item.quantity}</span>
                </span>
                {item.menuItem?.price && (
                  <span style={{ color: "var(--color-primary)", fontWeight: 600 }}>
                    ₹{(item.menuItem.price * item.quantity).toFixed(2)}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        {activeStatus === "DELIVERED" && (
          <div className="animate-fade-in-up" style={{ animationDelay: "500ms", marginTop: "24px", textAlign: "center" }}>
            <p style={{ color: "var(--color-success)", fontWeight: 600, marginBottom: "16px", fontSize: "1.05rem" }}>
              🎉 Enjoy your meal!
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Order Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;