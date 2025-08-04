import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, MessageCircle, Users, ArrowLeft } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/hooks/useAuth';

const ChatInterface = () => {
  const { user } = useAuth();
  const { contacts, messages, loading, fetchMessages, sendMessage } = useChat();
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [view, setView] = useState<'contacts' | 'chat'>('contacts');

  const selectedContactData = contacts.find(c => c.id === selectedContact);

  const handleSelectContact = async (contactId: string) => {
    setSelectedContact(contactId);
    setView('chat');
    await fetchMessages(contactId);
  };

  const handleSendMessage = async () => {
    if (!selectedContact || !newMessage.trim()) return;
    
    const contact = contacts.find(c => c.id === selectedContact);
    await sendMessage(selectedContact, newMessage, contact?.related_order_id);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const getUserTypeLabel = (userType: string) => {
    const labels: Record<string, string> = {
      'cigano': 'Cigano',
      'fabrica': 'Fábrica',
      'fornecedor': 'Fornecedor',
      'bar': 'Bar',
      'admin': 'Administrador'
    };
    return labels[userType] || userType;
  };

  const getUserTypeColor = (userType: string) => {
    const colors: Record<string, string> = {
      'cigano': 'bg-blue-100 text-blue-800',
      'fabrica': 'bg-green-100 text-green-800',
      'fornecedor': 'bg-yellow-100 text-yellow-800',
      'bar': 'bg-purple-100 text-purple-800',
      'admin': 'bg-red-100 text-red-800'
    };
    return colors[userType] || 'bg-gray-100 text-gray-800';
  };

  if (view === 'contacts') {
    return (
      <Card className="h-[600px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Conversas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            {loading ? (
              <div className="p-4 text-center text-muted-foreground">
                Carregando contatos...
              </div>
            ) : contacts.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                Nenhum contato disponível. Você só pode conversar com usuários com quem já fechou negócios.
              </div>
            ) : (
              <div className="space-y-2 p-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => handleSelectContact(contact.id)}
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>
                        {contact.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">
                          {contact.name}
                        </p>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getUserTypeColor(contact.user_type)}`}
                        >
                          {getUserTypeLabel(contact.user_type)}
                        </Badge>
                      </div>
                      {contact.last_message && (
                        <p className="text-xs text-muted-foreground truncate">
                          {contact.last_message}
                        </p>
                      )}
                    </div>
                    {contact.unread_count && contact.unread_count > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {contact.unread_count}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setView('contacts')}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2 flex-1">
            <MessageCircle className="w-5 h-5" />
            <div>
              <p className="font-semibold">{selectedContactData?.name}</p>
              <p className="text-xs text-muted-foreground">
                {selectedContactData && getUserTypeLabel(selectedContactData.user_type)}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => {
              const isOwnMessage = message.sender_user_id === user?.id;
              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    isOwnMessage ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!isOwnMessage && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>
                        {selectedContactData?.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      isOwnMessage
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        isOwnMessage
                          ? 'text-primary-foreground/70'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {new Date(message.created_at).toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  {isOwnMessage && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>Eu</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatInterface;