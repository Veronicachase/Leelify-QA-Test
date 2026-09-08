export interface User {
  userId: number;
  name: string;
  email: string;
  role: string;
  grade: number;
}

export interface AuthResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: User;
}
