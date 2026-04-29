import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders, updateOrderStatus } from "../services/order.service";
import Navbar from "../components/common/Navbar";
import Loader from "../components/common/Loader";
import toast from "react-hot-toast";

const STATUS_OPTIONS = ["RECEIVED", "PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"];

const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  if (loading) return (
    <div className="hero-bg" style={{ minHeight: "100vh" }}>
      <Navbar />
      <Loader text="Loading dashboard…" />
    </div>
  );

  return (
    <div className="hero-bg" style={{ minHeight: "100vh" }}>
      <Navbar />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px", borderBottom: "1px solid var(--color-surface-2)", paddingBottom: "20px" }}>
          <div>
            <h1 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", color: "var(--color-text)", fontWeight: 800 }}>
              Admin Dashboard
            </h1>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", marginTop: "4px" }}>Manage incoming orders and delivery status</p>
          </div>
          <button onClick={handleLogout} className="btn btn-ghost" style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)" }}>
            Log Out
          </button>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }}>
          {orders.map((order) => (
            <div key={order.id} className="glass-card animate-fade-in-up" style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "16px", borderTop: `4px solid ${order.status === 'DELIVERED' ? 'var(--color-success)' : 'var(--color-primary)'}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-text-muted)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>Order ID</p>
                  <p style={{ fontWeight: 700, color: "var(--color-text)", fontSize: "1.1rem" }}>#{order.id.slice(-8).toUpperCase()}</p>
                </div>
                <div style={{ background: "rgba(255,107,53,0.1)", color: "var(--color-primary)", padding: "4px 10px", borderRadius: "100px", fontSize: "0.75rem", fontWeight: 700 }}>
                  ₹{order.totalAmount}
                </div>
              </div>
              
              <div style={{ background: "var(--color-surface-2)", padding: "12px", borderRadius: "8px", border: "1px solid var(--color-border)" }}>
                <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "4px" }}>Customer Details</p>
                <p style={{ color: "var(--color-text)", fontSize: "0.9rem", fontWeight: 500 }}>{order.deliveryName}</p>
                <p style={{ color: "var(--color-text)", fontSize: "0.9rem", marginTop: "2px" }}>{order.deliveryPhone}</p>
              </div>

              <div style={{ marginTop: "auto", paddingTop: "8px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "8px", fontWeight: 600 }}>Update Status:</label>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "8px",
                    background: "var(--color-bg)",
                    color: "var(--color-text)",
                    border: "1px solid var(--color-primary)",
                    cursor: "pointer",
                    fontWeight: 600,
                    outline: "none",
                    boxShadow: "0 2px 8px rgba(255,107,53,0.15)",
                    transition: "all 0.2s"
                  }}
                >
                  {STATUS_OPTIONS.map(status => (
                    <option key={status} value={status}>{status.replace(/_/g, ' ')}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
        
        {orders.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 20px", background: "var(--color-surface-2)", borderRadius: "var(--radius-lg)", border: "1px dashed var(--color-border)" }}>
            <span style={{ fontSize: "3rem" }}>📭</span>
            <p style={{ color: "var(--color-text)", fontSize: "1.2rem", fontWeight: 600, marginTop: "16px" }}>
              No orders found
            </p>
            <p style={{ color: "var(--color-text-muted)", marginTop: "8px" }}>Waiting for new customers to place orders...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
