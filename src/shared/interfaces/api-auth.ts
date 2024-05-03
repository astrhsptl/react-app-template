export interface AccessToken {
  access: string;
}

export interface RefreshToken {
  refresh: string;
}

export interface SignInResult extends RefreshToken, AccessToken {}

export interface SignInData {
  email: string;
  password: string;
}
