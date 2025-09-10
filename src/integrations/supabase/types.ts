export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      bar_branches: {
        Row: {
          address: string
          created_at: string
          id: string
          manager: string | null
          name: string
          taps: number
          updated_at: string
          user_id: string
        }
        Insert: {
          address: string
          created_at?: string
          id?: string
          manager?: string | null
          name: string
          taps?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string
          created_at?: string
          id?: string
          manager?: string | null
          name?: string
          taps?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      bar_registrations: {
        Row: {
          cnpj: string
          created_at: string
          demanda_media_mensal: string
          email: string
          endereco_completo: string
          id: string
          link_instagram: string | null
          logo_url: string | null
          nome_razao_social: string
          telefone_whatsapp: string
          tempo_atuacao: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cnpj: string
          created_at?: string
          demanda_media_mensal: string
          email: string
          endereco_completo: string
          id?: string
          link_instagram?: string | null
          logo_url?: string | null
          nome_razao_social: string
          telefone_whatsapp: string
          tempo_atuacao: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cnpj?: string
          created_at?: string
          demanda_media_mensal?: string
          email?: string
          endereco_completo?: string
          id?: string
          link_instagram?: string | null
          logo_url?: string | null
          nome_razao_social?: string
          telefone_whatsapp?: string
          tempo_atuacao?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      beer_reviews: {
        Row: {
          beer_id: string
          comment: string | null
          created_at: string
          id: string
          rating: number
          user_id: string
        }
        Insert: {
          beer_id: string
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          user_id: string
        }
        Update: {
          beer_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "beer_reviews_beer_id_fkey"
            columns: ["beer_id"]
            isOneToOne: false
            referencedRelation: "beers"
            referencedColumns: ["id"]
          },
        ]
      }
      beers: {
        Row: {
          abv: number
          available: boolean | null
          brewery_name: string
          brewery_user_id: string
          created_at: string
          description: string | null
          ibu: number
          id: string
          image_url: string | null
          name: string
          price: number
          rating: number | null
          style: string
          total_ratings: number | null
          updated_at: string
        }
        Insert: {
          abv: number
          available?: boolean | null
          brewery_name: string
          brewery_user_id: string
          created_at?: string
          description?: string | null
          ibu: number
          id?: string
          image_url?: string | null
          name: string
          price: number
          rating?: number | null
          style: string
          total_ratings?: number | null
          updated_at?: string
        }
        Update: {
          abv?: number
          available?: boolean | null
          brewery_name?: string
          brewery_user_id?: string
          created_at?: string
          description?: string | null
          ibu?: number
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          rating?: number | null
          style?: string
          total_ratings?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      cigano_registrations: {
        Row: {
          cnpj_cpf: string
          created_at: string
          email: string
          endereco_completo: string
          estimativa_producao_mensal: string
          id: string
          inscricao_estadual: string | null
          link_instagram: string | null
          link_untappd: string | null
          logo_url: string | null
          nome_razao_social: string
          telefone_whatsapp: string
          tempo_atuacao: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cnpj_cpf: string
          created_at?: string
          email: string
          endereco_completo: string
          estimativa_producao_mensal: string
          id?: string
          inscricao_estadual?: string | null
          link_instagram?: string | null
          link_untappd?: string | null
          logo_url?: string | null
          nome_razao_social: string
          telefone_whatsapp: string
          tempo_atuacao: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cnpj_cpf?: string
          created_at?: string
          email?: string
          endereco_completo?: string
          estimativa_producao_mensal?: string
          id?: string
          inscricao_estadual?: string | null
          link_instagram?: string | null
          link_untappd?: string | null
          logo_url?: string | null
          nome_razao_social?: string
          telefone_whatsapp?: string
          tempo_atuacao?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      equipments: {
        Row: {
          capacity: number
          created_at: string
          id: string
          name: string
          status: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          capacity: number
          created_at?: string
          id?: string
          name: string
          status?: string
          type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          capacity?: number
          created_at?: string
          id?: string
          name?: string
          status?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      fabrica_registrations: {
        Row: {
          capacidade_producao_mensal: string
          cnpj: string
          created_at: string
          email: string
          endereco_completo: string
          id: string
          inscricao_estadual: string | null
          link_instagram: string | null
          logo_url: string | null
          nome_razao_social: string
          registro_mapa: string
          telefone_whatsapp: string
          tempo_atuacao: string
          updated_at: string
          user_id: string
        }
        Insert: {
          capacidade_producao_mensal: string
          cnpj: string
          created_at?: string
          email: string
          endereco_completo: string
          id?: string
          inscricao_estadual?: string | null
          link_instagram?: string | null
          logo_url?: string | null
          nome_razao_social: string
          registro_mapa: string
          telefone_whatsapp: string
          tempo_atuacao: string
          updated_at?: string
          user_id: string
        }
        Update: {
          capacidade_producao_mensal?: string
          cnpj?: string
          created_at?: string
          email?: string
          endereco_completo?: string
          id?: string
          inscricao_estadual?: string | null
          link_instagram?: string | null
          logo_url?: string | null
          nome_razao_social?: string
          registro_mapa?: string
          telefone_whatsapp?: string
          tempo_atuacao?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      fornecedor_registrations: {
        Row: {
          capacidade_producao_mensal: string
          cnpj: string
          created_at: string
          email: string
          endereco_completo: string
          id: string
          link_instagram: string | null
          logo_url: string | null
          nome_razao_social: string
          registro_mapa: string
          telefone_whatsapp: string
          tempo_atuacao: string
          updated_at: string
          user_id: string
        }
        Insert: {
          capacidade_producao_mensal: string
          cnpj: string
          created_at?: string
          email: string
          endereco_completo: string
          id?: string
          link_instagram?: string | null
          logo_url?: string | null
          nome_razao_social: string
          registro_mapa: string
          telefone_whatsapp: string
          tempo_atuacao: string
          updated_at?: string
          user_id: string
        }
        Update: {
          capacidade_producao_mensal?: string
          cnpj?: string
          created_at?: string
          email?: string
          endereco_completo?: string
          id?: string
          link_instagram?: string | null
          logo_url?: string | null
          nome_razao_social?: string
          registro_mapa?: string
          telefone_whatsapp?: string
          tempo_atuacao?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      marketplace_items: {
        Row: {
          available_quantity: number | null
          category: string
          created_at: string | null
          id: string
          item_type: string
          name: string
          seller_name: string
          seller_type: string
          seller_user_id: string
          status: string | null
          unit: string
          unit_price: number
        }
        Insert: {
          available_quantity?: number | null
          category: string
          created_at?: string | null
          id?: string
          item_type: string
          name: string
          seller_name: string
          seller_type: string
          seller_user_id: string
          status?: string | null
          unit: string
          unit_price: number
        }
        Update: {
          available_quantity?: number | null
          category?: string
          created_at?: string | null
          id?: string
          item_type?: string
          name?: string
          seller_name?: string
          seller_type?: string
          seller_user_id?: string
          status?: string | null
          unit?: string
          unit_price?: number
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read: boolean
          receiver_user_id: string
          related_order_id: string | null
          sender_user_id: string
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read?: boolean
          receiver_user_id: string
          related_order_id?: string | null
          sender_user_id: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read?: boolean
          receiver_user_id?: string
          related_order_id?: string | null
          sender_user_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_related_order_id_fkey"
            columns: ["related_order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          related_order_id: string | null
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          related_order_id?: string | null
          title: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          related_order_id?: string | null
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_related_order_id_fkey"
            columns: ["related_order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          buyer_user_id: string
          created_at: string
          delivery_address: string | null
          delivery_date: string | null
          equipment_id: string | null
          id: string
          notes: string | null
          product_id: string | null
          quantity: number
          recipe_id: string | null
          seller_user_id: string
          status: string
          total_amount: number
          unit_price: number
          updated_at: string
        }
        Insert: {
          buyer_user_id: string
          created_at?: string
          delivery_address?: string | null
          delivery_date?: string | null
          equipment_id?: string | null
          id?: string
          notes?: string | null
          product_id?: string | null
          quantity: number
          recipe_id?: string | null
          seller_user_id: string
          status?: string
          total_amount: number
          unit_price: number
          updated_at?: string
        }
        Update: {
          buyer_user_id?: string
          created_at?: string
          delivery_address?: string | null
          delivery_date?: string | null
          equipment_id?: string | null
          id?: string
          notes?: string | null
          product_id?: string | null
          quantity?: number
          recipe_id?: string | null
          seller_user_id?: string
          status?: string
          total_amount?: number
          unit_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_equipment_id_fkey"
            columns: ["equipment_id"]
            isOneToOne: false
            referencedRelation: "equipments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      production_schedule: {
        Row: {
          created_at: string
          factory_user_id: string
          gypsy_name: string
          gypsy_user_id: string | null
          id: string
          production_date: string
          recipe_name: string
          status: string
          updated_at: string
          volume: number
        }
        Insert: {
          created_at?: string
          factory_user_id: string
          gypsy_name: string
          gypsy_user_id?: string | null
          id?: string
          production_date: string
          recipe_name: string
          status?: string
          updated_at?: string
          volume: number
        }
        Update: {
          created_at?: string
          factory_user_id?: string
          gypsy_name?: string
          gypsy_user_id?: string | null
          id?: string
          production_date?: string
          recipe_name?: string
          status?: string
          updated_at?: string
          volume?: number
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string
          id: string
          name: string
          price: number
          status: string
          stock: number
          unit: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          id?: string
          name: string
          price: number
          status?: string
          stock?: number
          unit: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          id?: string
          name?: string
          price?: number
          status?: string
          stock?: number
          unit?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          updated_at: string
          user_id: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
      recipes: {
        Row: {
          abv: number
          created_at: string
          ibu: number
          id: string
          name: string
          price: number
          status: string
          style: string
          updated_at: string
          user_id: string
        }
        Insert: {
          abv: number
          created_at?: string
          ibu: number
          id?: string
          name: string
          price: number
          status?: string
          style: string
          updated_at?: string
          user_id: string
        }
        Update: {
          abv?: number
          created_at?: string
          ibu?: number
          id?: string
          name?: string
          price?: number
          status?: string
          style?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          company: string | null
          created_at: string
          id: string
          name: string
          quote: string
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          id?: string
          name: string
          quote: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          id?: string
          name?: string
          quote?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      bootstrap_admin: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_public_factories: {
        Args: Record<PropertyKey, never>
        Returns: {
          capacidade_producao_mensal: string
          created_at: string
          endereco_completo: string
          id: string
          link_instagram: string
          logo_url: string
          nome_razao_social: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
      user_type: "cigano" | "fabrica" | "fornecedor" | "bar"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
      user_type: ["cigano", "fabrica", "fornecedor", "bar"],
    },
  },
} as const
