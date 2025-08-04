import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  sender_user_id: string;
  receiver_user_id: string;
  created_at: string;
  read: boolean;
  related_order_id?: string;
}

interface ChatContact {
  id: string;
  name: string;
  user_type: string;
  last_message?: string;
  unread_count?: number;
  related_order_id?: string;
}

export const useChat = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch allowed contacts based on business rules
  const fetchContacts = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Get user profile to determine user type
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('user_id', user.id)
        .single();

      if (!profile) return;

      let contactsQuery;
      
      // Check if user is admin using the database function
      const { data: isAdmin } = await supabase.rpc('is_admin');
      
      if (isAdmin) {
        contactsQuery = supabase
          .from('profiles')
          .select(`
            user_id,
            user_type,
            cigano_registrations(nome_razao_social),
            fabrica_registrations(nome_razao_social),
            fornecedor_registrations(nome_razao_social),
            bar_registrations(nome_razao_social)
          `)
          .neq('user_id', user.id);
      } else {
        // For other users, get contacts based on orders
        const { data: userOrders } = await supabase
          .from('orders')
          .select('buyer_user_id, seller_user_id, id')
          .or(`buyer_user_id.eq.${user.id},seller_user_id.eq.${user.id}`);

        if (!userOrders || userOrders.length === 0) {
          setContacts([]);
          setLoading(false);
          return;
        }

        // Get unique contact user IDs
        const contactUserIds = Array.from(new Set(
          userOrders.map(order => 
            order.buyer_user_id === user.id ? order.seller_user_id : order.buyer_user_id
          )
        ));

        // Fetch contact details
        const contactsList: ChatContact[] = [];
        
        for (const contactId of contactUserIds) {
          // Get profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('user_id, user_type')
            .eq('user_id', contactId)
            .single();

          if (!profile) continue;

          // Get name based on user type
          let name = 'Usuário';
          try {
            if (profile.user_type === 'cigano') {
              const { data } = await supabase
                .from('cigano_registrations')
                .select('nome_razao_social')
                .eq('user_id', contactId)
                .single();
              name = data?.nome_razao_social || 'Cigano';
            } else if (profile.user_type === 'fabrica') {
              const { data } = await supabase
                .from('fabrica_registrations')
                .select('nome_razao_social')
                .eq('user_id', contactId)
                .single();
              name = data?.nome_razao_social || 'Fábrica';
            } else if (profile.user_type === 'fornecedor') {
              const { data } = await supabase
                .from('fornecedor_registrations')
                .select('nome_razao_social')
                .eq('user_id', contactId)
                .single();
              name = data?.nome_razao_social || 'Fornecedor';
            } else if (profile.user_type === 'bar') {
              const { data } = await supabase
                .from('bar_registrations')
                .select('nome_razao_social')
                .eq('user_id', contactId)
                .single();
              name = data?.nome_razao_social || 'Bar';
            }
          } catch (error) {
            console.error('Error fetching name for user:', contactId, error);
          }

          contactsList.push({
            id: contactId,
            name,
            user_type: profile.user_type
          });
        }
        
        // Add admin contact for non-admin users
        const { data: adminUsers } = await supabase
          .from('user_roles')
          .select(`
            user_id,
            profiles!inner(user_id, user_type)
          `)
          .eq('role', 'admin')
          .limit(1);

        if (adminUsers && adminUsers.length > 0) {
          contactsList.unshift({
            id: adminUsers[0].user_id,
            name: 'Administrador',
            user_type: 'admin'
          });
        }

        setContacts(contactsList);
        setLoading(false);
        return;
      }

      if (contactsQuery) {
        const { data: allUsers } = await contactsQuery;
        
        const contactsList: ChatContact[] = allUsers?.map((userProfile: any) => {
          const getName = () => {
            if (userProfile.cigano_registrations?.[0]) return userProfile.cigano_registrations[0].nome_razao_social;
            if (userProfile.fabrica_registrations?.[0]) return userProfile.fabrica_registrations[0].nome_razao_social;
            if (userProfile.fornecedor_registrations?.[0]) return userProfile.fornecedor_registrations[0].nome_razao_social;
            if (userProfile.bar_registrations?.[0]) return userProfile.bar_registrations[0].nome_razao_social;
            return 'Usuário';
          };
          
          return {
            id: userProfile.user_id,
            name: getName(),
            user_type: userProfile.user_type
          };
        }) || [];
        
        setContacts(contactsList);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar contatos",
        variant: "destructive"
      });
    }
    setLoading(false);
  };

  // Fetch messages for a specific conversation
  const fetchMessages = async (contactId: string) => {
    if (!user) return;
    
    try {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .or(`and(sender_user_id.eq.${user.id},receiver_user_id.eq.${contactId}),and(sender_user_id.eq.${contactId},receiver_user_id.eq.${user.id})`)
        .order('created_at', { ascending: true });
        
      setMessages(data || []);
      
      // Mark messages as read
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('sender_user_id', contactId)
        .eq('receiver_user_id', user.id)
        .eq('read', false);
        
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Send a new message
  const sendMessage = async (receiverId: string, content: string, relatedOrderId?: string) => {
    if (!user || !content.trim()) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_user_id: user.id,
          receiver_user_id: receiverId,
          content: content.trim(),
          related_order_id: relatedOrderId
        });

      if (error) throw error;
      
      // Refresh messages
      await fetchMessages(receiverId);
      
      toast({
        title: "Mensagem enviada",
        description: "Sua mensagem foi enviada com sucesso"
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Erro",
        description: "Erro ao enviar mensagem",
        variant: "destructive"
      });
    }
  };

  // Set up real-time updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `receiver_user_id=eq.${user.id}`
      }, (payload) => {
        const newMessage = payload.new as Message;
        setMessages(prev => [...prev, newMessage]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  useEffect(() => {
    fetchContacts();
  }, [user]);

  return {
    contacts,
    messages,
    loading,
    fetchMessages,
    sendMessage,
    refetch: fetchContacts
  };
};