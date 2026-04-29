const STEPS = [
  { key: "RECEIVED", label: "Order\nReceived", icon: "📋" },
  { key: "PREPARING", label: "Preparing\nFood", icon: "👨‍🍳" },
  { key: "OUT_FOR_DELIVERY", label: "Out for\nDelivery", icon: "🛵" },
  { key: "DELIVERED", label: "Delivered", icon: "✅" },
];

const statusIndex = (status: string) =>
  STEPS.findIndex((s) => s.key === status);

const OrderTracker = ({ status }: { status: string }) => {
  const current = statusIndex(status);

  return (
    <div
      style={{
        padding: "32px 24px",
        background: "var(--color-surface-2)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius)",
      }}
    >
      <h3
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          color: "var(--color-text)",
          marginBottom: "28px",
          textAlign: "center",
        }}
      >
        Order Progress
      </h3>

      {/* Track row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {STEPS.map((step, i) => {
          const isCompleted = i < current;
          const isActive = i === current;

          return (
            <div
              key={step.key}
              style={{
                display: "flex",
                alignItems: "center",
                flex: i < STEPS.length - 1 ? 1 : undefined,
              }}
            >
              {/* Step dot + label */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  minWidth: "68px",
                }}
              >
                {/* Icon circle */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.4rem",
                    background: isCompleted
                      ? "var(--color-success)"
                      : isActive
                      ? "var(--color-primary)"
                      : "var(--color-surface-3)",
                    boxShadow: isActive
                      ? "0 0 0 4px rgba(255,107,53,0.2), 0 0 20px rgba(255,107,53,0.3)"
                      : isCompleted
                      ? "0 0 10px rgba(6,214,160,0.3)"
                      : "none",
                    transition: "all 0.4s ease",
                    animation: isActive ? "pulse-glow 1.8s infinite" : "none",
                  }}
                >
                  {step.icon}
                </div>

                {/* Label */}
                <p
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: isActive || isCompleted ? 600 : 400,
                    color:
                      isActive
                        ? "var(--color-primary)"
                        : isCompleted
                        ? "var(--color-success)"
                        : "var(--color-text-muted)",
                    textAlign: "center",
                    whiteSpace: "pre-line",
                    lineHeight: 1.3,
                  }}
                >
                  {step.label}
                </p>
              </div>

              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: "3px",
                    margin: "-20px 6px 0",
                    borderRadius: "2px",
                    background: isCompleted
                      ? "var(--color-success)"
                      : "var(--color-surface-3)",
                    transition: "background 0.5s ease",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Current status pill */}
      <div style={{ textAlign: "center", marginTop: "28px" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 20px",
            borderRadius: "20px",
            background:
              status === "DELIVERED"
                ? "rgba(6,214,160,0.15)"
                : "rgba(255,107,53,0.15)",
            border: `1px solid ${
              status === "DELIVERED"
                ? "rgba(6,214,160,0.3)"
                : "rgba(255,107,53,0.3)"
            }`,
            color:
              status === "DELIVERED"
                ? "var(--color-success)"
                : "var(--color-primary)",
            fontSize: "0.85rem",
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background:
                status === "DELIVERED"
                  ? "var(--color-success)"
                  : "var(--color-primary)",
              animation:
                status !== "DELIVERED" ? "pulse-glow 1.5s infinite" : "none",
              display: "inline-block",
            }}
          />
          {STEPS.find((s) => s.key === status)?.label.replace("\n", " ") ??
            status}
        </span>
      </div>
    </div>
  );
};

export default OrderTracker;