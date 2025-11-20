import { Users, Video, UtensilsCrossed, Calendar, BarChart3, LogOut, LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { queryClient } from "@/lib/queryClient";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/trainer/dashboard" },
  { title: "My Clients", icon: Users, url: "/trainer/clients" },
  { title: "Live Sessions", icon: Calendar, url: "/trainer/sessions" },
  { title: "Diet, Meals & Workout", icon: UtensilsCrossed, url: "/trainer/diet" },
  { title: "Video Library", icon: Video, url: "/trainer/videos" },
  { title: "My Analytics", icon: BarChart3, url: "/trainer/analytics" },
];

export function TrainerSidebar() {
  const [location, setLocation] = useLocation();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        queryClient.clear();
        setLocation('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-display text-lg">
            FitPro Trainer
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location === item.url}
                    data-testid={`link-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} data-testid="button-logout">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
