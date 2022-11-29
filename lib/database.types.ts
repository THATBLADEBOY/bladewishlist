export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
        }
      }
      wish_list_item: {
        Row: {
          id: number
          user_id: string
          created_at: string | null
          url: string | null
          title: string | null
          image: string | null
        }
        Insert: {
          id?: number
          user_id: string
          created_at?: string | null
          url?: string | null
          title?: string | null
          image?: string | null
        }
        Update: {
          id?: number
          user_id?: string
          created_at?: string | null
          url?: string | null
          title?: string | null
          image?: string | null
        }
      }
      wish_list_item_purchase: {
        Row: {
          id: number
          created_at: string | null
          purchased_by: string
        }
        Insert: {
          id?: number
          created_at?: string | null
          purchased_by: string
        }
        Update: {
          id?: number
          created_at?: string | null
          purchased_by?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
