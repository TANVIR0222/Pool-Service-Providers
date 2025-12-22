export interface UserProfileResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    full_name: string;
    email: string;
    stripe_account_id: string | null;
    email_verified_at: string | null;
    role: "PROVIDER" | "USER" | string;
    status: "Active" | "Inactive" | string;
    otp_verified_at: string | null;
    otp: string | null;
    otp_expires_at: string | null;
    bio: string | null;
    contact_number: string | null;
    location: string | null;
    avatar: string;
    google_id: string | null;
    apple_id: string | null;
    created_at: string;
    updated_at: string;
  };
}
