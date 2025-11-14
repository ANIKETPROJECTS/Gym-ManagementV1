import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { NotificationCenter } from "@/components/notification-center";
import { CalculatorDialog } from "@/components/calculator-dialog";
import { Dumbbell, Calendar, Video, UtensilsCrossed, User, History, Home } from "lucide-react";
import { useLocation } from "wouter";

interface ClientHeaderProps {
  currentPage?: 'dashboard' | 'workouts' | 'diet' | 'sessions' | 'history' | 'profile';
}

export function ClientHeader({ currentPage }: ClientHeaderProps) {
  const [, setLocation] = useLocation();

  return (
    <header className="border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-8 w-8 text-primary" />
              <span className="text-2xl font-display font-bold tracking-tight">FitPro</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" onClick={() => setLocation("/")} data-testid="link-home">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button 
                variant="ghost" 
                className={currentPage === 'dashboard' ? 'bg-accent' : ''} 
                onClick={() => setLocation("/client")}
                data-testid="link-dashboard"
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className={currentPage === 'workouts' ? 'bg-accent' : ''} 
                onClick={() => setLocation("/client/workouts")} 
                data-testid="link-workouts"
              >
                <Video className="h-4 w-4 mr-2" />
                Workouts
              </Button>
              <Button 
                variant="ghost" 
                className={currentPage === 'diet' ? 'bg-accent' : ''} 
                onClick={() => setLocation("/client/diet")} 
                data-testid="link-diet"
              >
                <UtensilsCrossed className="h-4 w-4 mr-2" />
                Diet Plan
              </Button>
              <Button 
                variant="ghost" 
                className={currentPage === 'sessions' ? 'bg-accent' : ''} 
                onClick={() => setLocation("/client/sessions")} 
                data-testid="link-sessions"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Live Sessions
              </Button>
              <Button 
                variant="ghost" 
                className={currentPage === 'history' ? 'bg-accent' : ''} 
                onClick={() => setLocation("/client/history")} 
                data-testid="link-history"
              >
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <CalculatorDialog />
            <NotificationCenter />
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setLocation("/client/profile")} 
              data-testid="button-profile"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
