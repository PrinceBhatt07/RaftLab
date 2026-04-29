const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: string }> = {
  RECEIVED: {
    label: "Order Received",
    color: "var(--color-accent)",
    bg: "rgba(255,209,102,0.15)",
    icon: "📋",
  },
  PREPARING: {
    label: "Preparing Food",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.15)",
    icon: "👨‍🍳",
  },
  OUT_FOR_DELIVERY: {
    label: "Out for Delivery",
    color: "var(--color-primary)",
    bg: "rgba(255,107,53,0.15)",
    icon: "🛵",
  },
  DELIVERED: {
    label: "Delivered",
    color: "var(--color-success)",
    bg: "rgba(6,214,160,0.15)",
    icon: "✅",
  },
};

const OrderStatus = ({ status }: { status: string }) => {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    color: "var(--color-text-muted)",
    bg: "var(--color-surface-2)",
    icon: "📦",
  };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 20px",
        borderRadius: "30px",
        background: config.bg,
        border: `1px solid ${config.color}40`,
      }}
    >
      <span style={{ fontSize: "1.2rem" }}>{config.icon}</span>
      <span
        style={{
          fontWeight: 700,
          fontSize: "0.9rem",
          color: config.color,
          letterSpacing: "0.02em",
        }}
      >
        {config.label}
      </span>
    </div>
  );
};

export default OrderStatus;