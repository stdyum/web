export interface User {
  id: string;
  email: string;
  login: string;
  picture: string;
}

export interface Tokens {
  access: string;
  refresh: string;
}

export interface UserLoginResponse {
  user: User;
  tokens: Tokens;
}

export interface UserStudyPlaceInfo {
  id: string;
  name: string;
  role: string;
  roleName: string;
  permissions: string[];
  accepted: boolean;
}
