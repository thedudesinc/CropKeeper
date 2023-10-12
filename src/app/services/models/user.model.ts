export interface UserInput {
  id: string | null;
  displayName: string;
  email: string;
  password?: string;
  zip: string;
  displayImageUrl: string;
  allowEmailNotifications: boolean;
  allowSiteNotifications: boolean;
}

export interface UserOutput {
  id: string;
  displayName: string;
  email: string;
  zip: string;
  displayImageUrl: string;
  password: string;
  allowEmailNotifications: boolean;
  allowSiteNotifications: boolean;
  dateCreated: string;
  dateModified: string;
  dateDeleted: string | null;
}

export interface LoginResponse {
  id: string;
  displayName: string;
  email: string;
  displayImageUrl: string;
  stringToken: string;
  allowEmailNotifications: boolean;
  allowSiteNotifications: boolean;
}
