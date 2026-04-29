import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/AppRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
     <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff"
          }
        }}
      />
    <AppRoutes />
  </QueryClientProvider>
);