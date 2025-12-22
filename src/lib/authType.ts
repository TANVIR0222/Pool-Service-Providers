export interface LoginApiResponse {
  expires_in: number;
  token_type: string;
  token: string;
  message: string;
  status: boolean;
  user: {
    id: number;
    full_name: string;
    email: string;
    stripe_account_id: string | null;
    email_verified_at: string | null;
    role: "USER" | "ADMIN" | string;
    status: "Active" | "Inactive" | string;
    otp_verified_at: string | null;
    otp: string | null;
    otp_expires_at: string | null;
    bio: string | null;
    contact_number: string | null;
    location: string | null;
    avatar: string | null;
    google_id: string | null;
    apple_id: string | null;
    created_at: string;
    updated_at: string;
  };
}
export interface RegisterApiResponse {
  message: string;
  status: boolean;
}

export interface LoginApiPayloade {
  email: string;
  password: string;
  checkbox?: boolean;
  role: string | number | undefined;
}
export interface RegisterApiPayloade {
  email: string;
  full_name: string;
  password: string;
  password_confirmation: string;
  checkbox?: boolean;
}

export interface OtpVerifyApiResponse {
  status: boolean;
  message: string;
  access_token: string;
  token_type: string;
  expires_in: string;
}
export interface OtpVerifyApiPayload {
  otp: string;
}
export interface RestOtpApiPayload {
  email: string;
}

export interface ResendOtpApiResponse {
  status: boolean;
  message: string;
}

export interface ChangePasswordApiResponse {
  message: string;
  status: boolean;
}

export interface ChangePasswordApiPayload {
  password: string;
  password_confirmation: string;
}

export interface logoutPasswordApiResponse {
  message: string;
  status: boolean;
}

export interface updatePasswordResponse {
  message: string;
  status: boolean;
}

export interface updatePasswordApiPayload {
  password: string;
  current_password: string;
  password_confirmation: string;
}
