import { create } from "zustand";

interface AuthState {
  user: any;
  setUser: (user: any) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    if (user?.id) {
      localStorage.setItem("token", user.id);
    } else {
      localStorage.removeItem("token");
    }
    set({ user });
  }
}));