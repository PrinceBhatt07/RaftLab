const Loader = ({ text = "Loading..." }: { text?: string }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "60vh",
      gap: "16px",
    }}
  >
    <div className="spinner" />
    <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
      {text}
    </p>
  </div>
);

export default Loader;
