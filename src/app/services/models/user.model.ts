export interface UserInput {
  displayName: string;
  email: string;
  password: string;
  zip: string;
  allowEmailNotifications: boolean;
  allowSiteNotifications: boolean;
}

export interface UserOutput {
  id: string;
  displayName: string;
  email: string;
  password: string;
  allowEmailNotifications: boolean;
  allowSiteNotifications: boolean;
  dateCreated: string;
  dateModified: string;
  dateDeleted: string | null;
}

export interface LoginResponse {
  displayName: string;
  email: string;
  stringToken: string;
  allowEmailNotifications: boolean;
  allowSiteNotifications: boolean;
}
