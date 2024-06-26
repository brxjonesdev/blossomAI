export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Repos: {
        Row: {
          created_at: string
          id: number
          owner: string
          repo_name: string
        }
        Insert: {
          created_at?: string
          id?: number
          owner: string
          repo_name: string
        }
        Update: {
          created_at?: string
          id?: number
          owner?: string
          repo_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_Repos_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["username"]
          },
        ]
      }
      Updates: {
        Row: {
          action: string | null
          body: string | null
          created_at: string
          id: number
          message: string | null
          number: string | null
          parent_repo: number | null
          sender: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          action?: string | null
          body?: string | null
          created_at?: string
          id?: number
          message?: string | null
          number?: string | null
          parent_repo?: number | null
          sender?: string | null
          title?: string | null
          type?: string | null
        }
        Update: {
          action?: string | null
          body?: string | null
          created_at?: string
          id?: number
          message?: string | null
          number?: string | null
          parent_repo?: number | null
          sender?: string | null
          title?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Updates_parent_repo_fkey"
            columns: ["parent_repo"]
            isOneToOne: false
            referencedRelation: "Repos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_Updates_sender_fkey"
            columns: ["sender"]
            isOneToOne: false
            referencedRelation: "Users"
            referencedColumns: ["username"]
          },
        ]
      }
      Users: {
        Row: {
          created_at: string
          id: number
          username: string
        }
        Insert: {
          created_at?: string
          id?: number
          username: string
        }
        Update: {
          created_at?: string
          id?: number
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
