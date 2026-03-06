export type Plan = "free" | "starter" | "pro" | "business";
export type ProductType = "sellerboost" | "virallab";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  plan: Plan;
  credits_used: number;
  credits_limit: number;
  stripe_customer_id: string | null;
  created_at: string;
}

export interface Generation {
  id: string;
  user_id: string;
  product_type: ProductType;
  input_data: Record<string, unknown>;
  output_data: Record<string, unknown>;
  tokens_used: number | null;
  share_token: string | null;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: Plan;
  status: "active" | "cancelled" | "past_due";
  toss_billing_key: string | null;
  next_billing_date: string | null;
  created_at: string;
}

// Sellerboost
export interface SellerboostInput {
  productName: string;
  category: string;
  features: string[];
  targetAudience?: string;
  platform: "naver" | "coupang" | "11st";
}

export interface SellerboostOutput {
  title: string;
  subtitle: string;
  painPoints: string[];
  solution: string;
  features: string[];
  specs: { label: string; value: string }[];
  scenario: string;
  testimonial: string;
  faq: { q: string; a: string }[];
  trustBadges: string[];
  cta: string;
  urgency: string;
  seoKeywords: string[];
  conversionScore: number;
  improvements: string[];
}

// Virallab
export interface VirallabInput {
  topic: string;
  targetAudience: string;
  platform: "youtube" | "shorts" | "reels";
  duration: "30s" | "60s" | "3min" | "10min";
  tone?: string;
}

export interface VirallabOutput {
  title: string;
  hook: string;
  script: string;
  hookScore: number;
  thumbnailSuggestions: string[];
  titleVariants: string[];
  improvements: string[];
}

// Supabase Database type
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          plan: string;
          credits_used: number;
          credits_limit: number;
          stripe_customer_id: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          plan?: string;
          credits_used?: number;
          credits_limit?: number;
          stripe_customer_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          plan?: string;
          credits_used?: number;
          credits_limit?: number;
          stripe_customer_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      generations: {
        Row: {
          id: string;
          user_id: string;
          product_type: string;
          input_data: Record<string, unknown>;
          output_data: Record<string, unknown>;
          tokens_used: number | null;
          share_token: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          product_type: string;
          input_data: Record<string, unknown>;
          output_data: Record<string, unknown>;
          tokens_used?: number | null;
          share_token?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          product_type?: string;
          input_data?: Record<string, unknown>;
          output_data?: Record<string, unknown>;
          tokens_used?: number | null;
          share_token?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          plan: string;
          status: string;
          toss_billing_key: string | null;
          next_billing_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          plan: string;
          status?: string;
          toss_billing_key?: string | null;
          next_billing_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          plan?: string;
          status?: string;
          toss_billing_key?: string | null;
          next_billing_date?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// SSE streaming event types
export interface StreamTextEvent {
  text: string;
}

export interface StreamDoneEvent {
  done: true;
  usage: { input_tokens: number; output_tokens: number };
}

export interface StreamErrorEvent {
  error: string;
}

export type StreamEvent = StreamTextEvent | StreamDoneEvent | StreamErrorEvent;
