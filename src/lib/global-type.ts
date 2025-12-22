export interface TopProvidersByRatingResponse {
  status: boolean;
  message: string;
  data: TopProviderByRating[];
}

export interface TopProviderByRating {
  provider_id: number;
  average_rating: string;
  total_reviews: number;
  provider: Provider;
}

export interface ProviderInfo {
  id: number;
  full_name: string;
  avatar: string;
  location: string | null;
}

export interface Provider {
  id: number;
  full_name: string;
  avatar: string;
  location: string | null;
}

export interface ProviderProfileResponse {
  status: boolean;
  message: string;
  provider: SingleProvider;
  reviews: Review[];
}

export interface SingleProvider {
  id: number;
  full_name: string;
  email: string;
  avatar: string;
  role: "PROVIDER" | "USER" | string;
  average_rating: string;
  total_reviews: number;
  complete_rate: string;
  profile: Profile;
  canceled_order?: string;
  completed_services?: string;
}

export interface Profile {
  id: number;
  user_id: number;
  completed_services: number;
  canceled_order: number;
  order_accept: number;
  total_earnings: string;
  total_pay: string;
  display_name: string | null;
  user_name: string | null;
  email: string | null;
  phone_number: string | null;
  state: string | null;
  zip_code: string | null;
  country: string | null;
  created_at: string; // or Date if you plan to parse
  updated_at: string; // or Date
}

export interface Review {
  id: number;
  user_id: number;
  provider_id: number;
  rating: number;
  compliment: string;
  created_at: string;
  updated_at: string;
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
    avatar: string;
    google_id: string | null;
    apple_id: string | null;
    created_at: string;
    updated_at: string;
  };
  onPress: () => void;
}

export interface SingleProviderPaylaode {
  id: number | string;
}

export interface ProviderSearchResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    full_name: string;
    email: string;
    stripe_account_id: string | null;
    email_verified_at: string | null;
    role: string;
    status: string;
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

export interface ProviderSearchPaylode {
  search: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
  stripe_account_id: string | null;
  email_verified_at: string | null;
  role: string;
  status: string;
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
}

export interface Quote {
  id: number;
  user_id: number;
  service: string;
  describe_issue: string;
  property_type: string;
  service_type: string;
  pool_depth: string | null;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm:ss
  zip_code: string;
  address: string;
  expected_budget: string;
  photos: string[];
  video: string | null;
  status: string;
  is_paid: number;
  created_at: string;
  updated_at: string;
  user: User;
}

export interface QuotesPagination {
  current_page: number;
  data: Quote[];
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  //  pagination more fild
}

export interface GetAllQuotesResponse {
  status: boolean;
  message: string;
  quotes: QuotesPagination;
}

export interface GetMyQuotesProcessResponse {
  status: boolean;
  isStatus: string;
  message: string;
  quotes: {
    current_page: number;
    data: QuoteItem[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export interface QuoteItem {
  id: number;
  user_id: number;
  service: string;
  describe_issue: string;
  property_type: string;
  service_type: string;
  pool_depth: string | null;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm:ss
  zip_code: string;
  address: string;
  expected_budget: string;
  photos: string[];
  video: string | null;
  status: string;
  is_paid: number;
  created_at: string; // ISO DateTime
  updated_at: string; // ISO DateTime
  scheduled_date: string; // formatted date
  avatar?: string;
  quote_outline?: string;
  quote_id?: string;
  price_offered?: string;
  provider_id?: string;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface GetMyQuotesProcessPaloade {
  status: string;
  page: string;
  per_page: string;
}
export interface DeletedQuoteProcessPaloade {
  user_id: number;
  isLoading: boolean;
}

export interface DeletedQuotesResponse {
  status: boolean;
  message: string;
  quotes: QuotesPagination;
}

export interface MyQuotesResponse {
  status: boolean;
  isStatus: string;
  message: string;
  quotes: Quotes;
  isLoading: boolean;
}

export interface Quotes {
  current_page: number;
  data: QuoteItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// -----------------
export interface ViewQuoteResponse {
  status: boolean;
  message: string;
  data: QuoteDetails;
}

export interface QuoteDetails {
  id: number;
  user_id: number;
  service: string;
  describe_issue: string;
  property_type: string;
  service_type: string;
  pool_depth: string | null;
  date: string; // "YYYY-MM-DD"
  time: string; // "HH:mm:ss"
  zip_code: string;
  address: string;
  expected_budget: string; // "0.00" etc.
  photos: string[];
  video: string | null;
  status: string;
  is_paid: number; // 0 or 1
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  user: UserDetails;
}

export interface UserDetails {
  id: number;
  full_name: string;
  email: string;
  stripe_account_id: string | null;
  email_verified_at: string | null;
  role: string;
  status: string;
  otp_verified_at: string | null;
  otp: string | null;
  otp_expires_at: string | null;
  bio: string | null;
  contact_number: string | null;
  location: string | null;
  avatar: string | null;
  google_id: string | null;
  apple_id: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  profile: UserProfile;
}

export interface UserProfile {
  id: number;
  user_id: number;
  completed_services: number;
  canceled_order: number;
  order_accept: number;
  total_earnings: string; // "0.00"
  total_pay: string; // "0.00"
  display_name: string | null;
  user_name: string | null;
  email: string | null;
  phone_number: string | null;
  state: string | null;
  zip_code: string | null;
  country: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
  job_accept_rate: string; // "0%" etc.
  total_job_posted: number;
}

export interface ViewQuotePayloade {
  post_id?: number[] | string[] | undefined;
  id?: number[] | string[];
}

// ----
// types/review.ts
export interface CreateReviewRequest {
  provider_id: string; // comes as string in API
  rating: string; // also string in API
  compliment: string;
}

export interface ReviewData {
  user_id: number;
  provider_id: string | number;
  rating: string;
  compliment: string;
  updated_at: string;
  created_at: string;
  id: number | string;
}

export interface CreateReviewResponse {
  status: boolean;
  message: string;
  data: ReviewData;
}

// types/category.ts

export interface Category {
  id: number;
  icon: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryResponse {
  status: boolean;
  message: string;
  data: Category[];
}

// types/quote.ts

export interface QuoteUser {
  id: number;
  full_name: string;
  avatar: string;
}

export interface QuoteRequest {
  id: number;
  user_id: number;
  service: string;
  describe_issue: string;
  property_type: string;
  service_type: string;
  pool_depth: string | null;
  date: string;
  zip_code: string;
  address: string;
  expected_budget: string;
  photos: string[];
  video: string | null;
  status: string;
  is_paid: number;
  created_at: string;
  updated_at: string;
  user: {
    id: number;
    full_name: string;
    avatar: string;
  };
}

export interface QuotePagination {
  current_page: number;
  data: QuoteRequest[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface QuoteRequestResponse {
  status: boolean;
  message: string;
  data: QuotePagination;
}

// User info
export interface QuoteUserCategory {
  id: number;
  full_name: string;
  avatar: string;
}

// Single quote item
export interface QuoteItemCategory {
  id: number;
  user_id: number;
  service: string;
  describe_issue: string;
  property_type: string;
  service_type: string;
  pool_depth: string | null;
  date: string;
  zip_code: string;
  address: string;
  expected_budget: string;
  photos: string[];
  video: string | null;
  status: string;
  is_paid: number;
  created_at: string;
  updated_at: string;
  user: QuoteUserCategory;
}

// Pagination meta & data
export interface QuoteDataCategory {
  current_page: number;
  data: QuoteItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Full API response
export interface NameCategoryResponse {
  status: boolean;
  message: string;
  data: QuoteDataCategory;
}

// ---------- -------------------
// List response
export interface MYViewQuoteResponse {
  status: boolean;
  message: string;
  data: ViewMYPaginationData;
}

export interface ViewMYPaginationData {
  current_page: number;
  data: ViewMyQuoteItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: ViewMyPaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ViewMyPaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface ViewMyQuoteItem {
  id: number;
  quote_id: number;
  provider_id: number;
  price_offered: string;
  quote_outline: string;
  status: string;
  bid_status: string;
  created_at: string;
  updated_at: string;
  quote: ViewMyQuoteDetails;
}

export interface ViewMyQuoteDetails {
  id: number;
  user_id: number;
  service: string;
  describe_issue: string;
  property_type: string;
  service_type: string;
  pool_depth: string | null;
  date: string;
  zip_code: string;
  address: string;
  expected_budget: string;
  photos: string[];
  video: string | null;
  status: string;
  is_paid: number;
  created_at: string;
  updated_at: string;
  avatar: string;
}

// View single quote response
export interface ViewMyQuoteResponse {
  status: boolean;
  message: string;
  data: ViewMYViewQuoteData;
}

export interface ViewMYViewQuoteData {
  id: number;
  quote_id: number;
  provider_id: number;
  price_offered: string;
  quote_outline: string;
  status: string;
  bid_status: string;
  created_at: string;
  updated_at: string;
  quote: QuoteDetails;
}
