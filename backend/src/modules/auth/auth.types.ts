export interface GuestLoginInput {
  name: string;
  phone: string;
}

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
}

export interface AuthResponse {
  user: AuthUser;
  token?: string;
}

/**
 * Extend Express Request to include user
 */
export interface AuthenticatedRequest extends Request {
  user?: AuthUser;
}