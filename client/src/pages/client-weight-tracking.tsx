import { useState } from "react";
import { ClientHeader } from "@/components/client-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Scale, TrendingDown, TrendingUp, Target, Plus } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function ClientWeightTracking() {
  const { toast } = useToast();
  const [weight, setWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");

  const { data: weightData, isLoading } = useQuery({
    queryKey: ['/api/progress/weight'],
  });

  const addWeightMutation = useMutation({
    mutationFn: async (data: { weight: number; date: string }) =>
      apiRequest('/api/progress/weight', 'POST', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress/weight'] });
      toast({ title: "Weight logged successfully" });
      setWeight("");
    },
    onError: () => {
      toast({ title: "Failed to log weight", variant: "destructive" });
    },
  });

  const updateGoalMutation = useMutation({
    mutationFn: async (data: { goalWeight: number }) =>
      apiRequest('/api/progress/goal', 'POST', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/progress/weight'] });
      toast({ title: "Goal updated successfully" });
      setGoalWeight("");
    },
    onError: () => {
      toast({ title: "Failed to update goal", variant: "destructive" });
    },
  });

  const currentWeight = weightData?.current?.weight || 0;
  const goal = weightData?.goal || 0;
  const startWeight = weightData?.start || currentWeight;
  const progressPercent = goal && startWeight ? Math.min(100, Math.max(0, ((startWeight - currentWeight) / (startWeight - goal)) * 100)) : 0;
  const remaining = currentWeight - goal;

  const handleLogWeight = () => {
    if (!weight || isNaN(parseFloat(weight))) {
      toast({ title: "Please enter a valid weight", variant: "destructive" });
      return;
    }
    addWeightMutation.mutate({
      weight: parseFloat(weight),
      date: new Date().toISOString(),
    });
  };

  const handleSetGoal = () => {
    if (!goalWeight || isNaN(parseFloat(goalWeight))) {
      toast({ title: "Please enter a valid goal weight", variant: "destructive" });
      return;
    }
    updateGoalMutation.mutate({ goalWeight: parseFloat(goalWeight) });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ClientHeader currentPage="weight-tracking" />
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold tracking-tight mb-2">Weight Tracking</h1>
          <p className="text-muted-foreground">Track your weight progress towards your fitness goals</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Current Weight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">{currentWeight} kg</div>
              <p className="text-sm text-muted-foreground">
                Last updated: {weightData?.current?.date ? format(new Date(weightData.current.date), 'PPP') : 'Not recorded'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Goal Weight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-2">{goal || 'Not set'} {goal ? 'kg' : ''}</div>
              {goal && (
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  {remaining > 0 ? (
                    <>
                      <TrendingDown className="h-4 w-4 text-destructive" />
                      {Math.abs(remaining).toFixed(1)} kg to lose
                    </>
                  ) : remaining < 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      {Math.abs(remaining).toFixed(1)} kg to gain
                    </>
                  ) : (
                    'Goal achieved!'
                  )}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {goal && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Progress to Goal</CardTitle>
              <CardDescription>
                {progressPercent.toFixed(0)}% complete
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercent} className="h-3" />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>Start: {startWeight} kg</span>
                <span>Current: {currentWeight} kg</span>
                <span>Goal: {goal} kg</span>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Log Weight
              </CardTitle>
              <CardDescription>Record your current weight</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="Enter weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  data-testid="input-weight"
                />
              </div>
              <Button
                onClick={handleLogWeight}
                disabled={addWeightMutation.isPending}
                className="w-full"
                data-testid="button-log-weight"
              >
                {addWeightMutation.isPending ? "Logging..." : "Log Weight"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Set Goal Weight
              </CardTitle>
              <CardDescription>Define your target weight</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="goalWeight">Goal Weight (kg)</Label>
                <Input
                  id="goalWeight"
                  type="number"
                  step="0.1"
                  placeholder="Enter goal weight"
                  value={goalWeight}
                  onChange={(e) => setGoalWeight(e.target.value)}
                  data-testid="input-goal-weight"
                />
              </div>
              <Button
                onClick={handleSetGoal}
                disabled={updateGoalMutation.isPending}
                className="w-full"
                data-testid="button-set-goal"
              >
                {updateGoalMutation.isPending ? "Setting..." : "Set Goal"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {weightData?.history && weightData.history.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Weight History</CardTitle>
              <CardDescription>Your recent weight measurements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weightData.history.slice(0, 10).map((entry: any, index: number) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b last:border-0" data-testid={`weight-entry-${index}`}>
                    <div>
                      <div className="font-medium">{entry.weight} kg</div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(entry.date), 'PPP')}
                      </div>
                    </div>
                    {index > 0 && weightData.history[index - 1] && (
                      <div className={`flex items-center gap-1 text-sm ${entry.weight < weightData.history[index - 1].weight ? 'text-green-500' : 'text-destructive'}`}>
                        {entry.weight < weightData.history[index - 1].weight ? (
                          <TrendingDown className="h-4 w-4" />
                        ) : (
                          <TrendingUp className="h-4 w-4" />
                        )}
                        {Math.abs(entry.weight - weightData.history[index - 1].weight).toFixed(1)} kg
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
