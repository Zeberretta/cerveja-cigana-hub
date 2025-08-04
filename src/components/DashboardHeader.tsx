import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { MessageCircle, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ChatInterface from "@/components/ChatInterface";

interface DashboardHeaderProps {
  title: string;
  icon: React.ReactNode;
  onChatToggle?: () => void;
  showChat?: boolean;
}

const DashboardHeader = ({ title, icon, onChatToggle, showChat }: DashboardHeaderProps) => {
  const { signOut } = useAuth();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <ChatInterface />
            </DialogContent>
          </Dialog>
          <Button asChild variant="outline">
            <Link to="/">Início</Link>
          </Button>
          <Button onClick={signOut} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;