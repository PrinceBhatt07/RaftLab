# RaftLabs Order Management App

A modern, responsive, and real-time order Management application featuring a customer-facing menu, guest checkout, real-time order tracking, and a secure admin dashboard for order management.

## Features

* **Modern Customer UI**: Beautiful, fully responsive, and dynamic UI for exploring the menu and adding items to the cart.
* **Guest Checkout**: Customers can place orders without needing to create an account.
* **Real-time Order Tracking**: Customers receive live updates via WebSocket (Socket.IO) when their order status changes (e.g., from `RECEIVED` to `PREPARING` to `DELIVERED`).
* **Secure Admin Dashboard**: Email and password-based authentication for admins to manage all incoming orders.
* **State Management**: Robust frontend state handling using `Zustand` for carts, orders, and authentication.
* **Robust Backend**: Built on Node.js and Express, connected to MongoDB via Prisma ORM, utilizing Zod for strict payload validation.

---

## Tech Stack

**Frontend:**
* React 19 + TypeScript + Vite
* Zustand (State Management)
* React Router v7
* Socket.IO Client (Real-time updates)
* React Hot Toast (Notifications)
* Vitest + React Testing Library

**Backend:**
* Node.js + Express + TypeScript
* Prisma ORM
* MongoDB
* Socket.IO (Real-time events)
* Zod (Schema validation)
* Jest + Supertest (Testing)

---

## Project Structure

The repository is structured as a monorepo containing two main directories: `frontend` and `backend`.

### Backend Directory (`/backend`)
The backend is structured using a modular architecture for scalability and separation of concerns.

```text
backend/
├── prisma/                 # Prisma ORM schema and MongoDB configuration
├── src/
│   ├── common/             # Shared middleware (Auth, Error handling, Validation)
│   ├── config/             # Environment variables and Database connection setup
│   ├── modules/            # Domain-specific modules (Controllers, Services, Routes, Schemas)
│   │   ├── auth/           # Admin authentication logic
│   │   ├── menu/           # Menu item retrieval logic
│   │   └── order/          # Order creation, fetching, and updating logic
│   ├── realtime/           # Socket.IO server setup and event publishers
│   ├── routes/             # Central API router index
│   ├── scripts/            # DB Seeding scripts (seedMenu, createAdmin)
│   ├── app.ts              # Express application configuration
│   └── server.ts           # Application entry point and HTTP Server setup
└── tests/                  # Jest test suites (Unit & Integration)
```

**Key Backend Concepts:**
* **Modules**: Each major feature (Auth, Menu, Order) has its own folder containing a `.routes.ts`, `.controller.ts`, `.service.ts`, and `.schema.ts` file.
* **Validation**: Incoming requests are validated automatically via Zod schemas and a generic validation middleware.
* **Realtime**: The `realtime` folder handles WebSocket connections. When an order status is updated in the `order.service.ts`, it triggers an event via the publisher, broadcasting to connected clients.

### Frontend Directory (`/frontend`)
The frontend is built with React and Vite, using a component-based architecture.

```text
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and global styling
│   ├── components/         # Reusable React components
│   │   ├── cart/           # Cart drawer, cart items, summary
│   │   ├── common/         # Navbar, Loaders, generic UI elements
│   │   ├── menu/           # Menu lists, Menu Item cards
│   │   └── order/          # Order tracking badges and UI
│   ├── hooks/              # Custom React hooks (e.g., useCart, useMenu)
│   ├── pages/              # Primary route views (Home, Checkout, AdminOrders, Auth)
│   ├── realtime/           # Socket.IO client configuration
│   ├── routes/             # React Router configuration and Protected Routes
│   ├── services/           # Axios API wrappers (auth, menu, order api calls)
│   ├── store/              # Zustand state stores (cart.store.ts, auth.store.ts)
│   ├── tests/              # Vitest setup files
│   ├── utils/              # Helper functions (e.g., calculations)
│   ├── App.tsx             # Root component
│   └── main.tsx            # React DOM entry point
└── vite.config.ts          # Vite and Vitest configuration
```

**Key Frontend Concepts:**
* **State Management**: `cart.store.ts` manages the items the user intends to purchase, persisting them to localStorage.
* **API Client**: `apiClient.ts` configures an Axios instance with base URLs and interceptors that automatically attach admin tokens.
* **Routing**: Uses `React-Router-Dom`. The `/auth` and `/admin` routes are strictly reserved for administrators, enforced by the `AdminRoute.tsx` wrapper.

---

## Setup & Installation

### Prerequisites
* Node.js (v18+)
* MongoDB Cluster URI

### 1. Backend Setup
1. Navigate to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Configure Environment Variables: Create a `.env` file in the backend directory based on `.env.example`.
   ```env
   PORT=5000
   DATABASE_URL="your_mongodb_connection_string"
   FRONTEND_URL="http://localhost:5173"
   ```
4. Push Prisma Schema: `npx prisma db push`
5. Start Dev Server: `npm run dev`

*(Note: The server will automatically seed the initial menu data and create a default admin (`admin@raftlabs.com` / `password`) upon first boot).*

### 2. Frontend Setup
1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Configure Environment Variables: Ensure you have an `.env` file (if applicable) pointing to the backend. By default, API calls target `http://localhost:5000/api/v1`.
4. Start Dev Server: `npm run dev`

---

## Testing

Both the frontend and backend possess comprehensive automated tests.

**Backend Integration Tests**
Navigate to `/backend` and run:
```bash
npm run test:integration
```
This tests the full API request lifecycle (CRUD for orders, Input validation via Zod, and Authentication constraints) using Supertest and an isolated Test DB.

**Frontend Unit Tests**
Navigate to `/frontend` and run:
```bash
npm run test
```
This uses Vitest and React Testing Library to verify UI component rendering and interaction logic (like adding items to the cart).
