import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Checkout from "../pages/Checkout";
import Order from "../pages/Order";
import Auth from "../pages/Auth";
import Cart from "../pages/Cart";
import AdminOrders from "../pages/AdminOrders";
import AdminRoute from "./AdminRoute";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order/:id" element={<Order />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/admin" element={<AdminRoute><AdminOrders /></AdminRoute>} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;