export interface LoginInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginOutput {
  statusCode: number;
  value?: string;
  contentType?: string | null;
}
