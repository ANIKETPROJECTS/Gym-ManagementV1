import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TrainerSidebar } from "@/components/trainer-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Apple, UtensilsCrossed, Users, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { DietPlan } from "@shared/schema";

export default function TrainerDiet() {
  const style = {
    "--sidebar-width": "16rem",
  };

  const { data: user } = useQuery<any>({
    queryKey: ['/api/me']
  });

  const trainerId = user?.userId;

  const { data: dietPlans = [], isLoading } = useQuery<DietPlan[]>({
    queryKey: ['/api/trainers', trainerId, 'diet-plans'],
    enabled: !!trainerId
  });

  const activePlans = dietPlans.filter((p: DietPlan) => p.status === 'active');

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <TrainerSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <h1 className="text-2xl font-display font-bold tracking-tight">
                Diet, Meals & Workout
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button data-testid="button-create-plan">
                <Plus className="h-4 w-4 mr-2" />
                Create Plan
              </Button>
              <ThemeToggle />
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Diet Plans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">{dietPlans.length}</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Active Plans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{activePlans.length}</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Clients on Plans</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {new Set(dietPlans.map((p: DietPlan) => p.clientId)).size}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Diet Plans</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <p className="text-center text-muted-foreground py-8">Loading diet plans...</p>
                  ) : dietPlans.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">No diet plans created yet</p>
                  ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                      {dietPlans.map((plan: DietPlan) => (
                        <Card key={plan._id} className="hover-elevate">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="h-12 w-12 rounded-md bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white shrink-0">
                                <UtensilsCrossed className="h-6 w-6" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                  <h3 className="font-semibold">{plan.name}</h3>
                                  <Badge variant={plan.status === 'active' ? 'default' : 'secondary'}>
                                    {plan.status}
                                  </Badge>
                                </div>

                                <p className="text-sm text-muted-foreground mb-3">
                                  {plan.description || 'No description'}
                                </p>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <Apple className="h-3.5 w-3.5" />
                                    <span>{plan.caloriesTarget || 0} cal/day</span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <Users className="h-3.5 w-3.5" />
                                    <span>{plan.goalType || 'General'}</span>
                                  </div>
                                </div>

                                <div className="flex gap-2 mt-3">
                                  <Button size="sm" variant="outline" className="flex-1" data-testid={`button-edit-${plan._id}`}>
                                    Edit Plan
                                  </Button>
                                  <Button size="sm" variant="outline" className="flex-1" data-testid={`button-view-${plan._id}`}>
                                    View Details
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
