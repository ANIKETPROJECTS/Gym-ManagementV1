import { ClientHeader } from "@/components/client-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, Trophy, Flame, Target, Calendar, Dumbbell, TrendingUp, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const achievementTypes = [
  {
    id: 'first-workout',
    title: 'First Step',
    description: 'Complete your first workout',
    icon: Dumbbell,
    requirement: 1,
    category: 'workouts',
  },
  {
    id: '7-day-streak',
    title: '7 Day Warrior',
    description: 'Maintain a 7-day workout streak',
    icon: Flame,
    requirement: 7,
    category: 'streaks',
  },
  {
    id: '10-workouts',
    title: 'Dedicated Ten',
    description: 'Complete 10 total workouts',
    icon: Target,
    requirement: 10,
    category: 'workouts',
  },
  {
    id: '50-workouts',
    title: 'Half Century',
    description: 'Complete 50 total workouts',
    icon: Star,
    requirement: 50,
    category: 'workouts',
  },
  {
    id: '100-workouts',
    title: 'Century Club',
    description: 'Complete 100 total workouts',
    icon: Trophy,
    requirement: 100,
    category: 'workouts',
  },
  {
    id: '30-day-streak',
    title: 'Monthly Momentum',
    description: 'Maintain a 30-day workout streak',
    icon: Calendar,
    requirement: 30,
    category: 'streaks',
  },
  {
    id: 'weight-goal',
    title: 'Goal Crusher',
    description: 'Reach your weight goal',
    icon: TrendingUp,
    requirement: 1,
    category: 'goals',
  },
];

export default function ClientAchievements() {
  const { data: achievementsData, isLoading } = useQuery({
    queryKey: ['/api/progress/achievements'],
  });

  const stats = achievementsData?.stats || { totalWorkouts: 0, currentStreak: 0, goalReached: false };
  const unlockedIds = achievementsData?.unlocked || [];

  const checkUnlocked = (achievement: typeof achievementTypes[0]) => {
    if (achievement.category === 'workouts') {
      return stats.totalWorkouts >= achievement.requirement;
    }
    if (achievement.category === 'streaks') {
      return stats.currentStreak >= achievement.requirement;
    }
    if (achievement.category === 'goals') {
      return stats.goalReached;
    }
    return false;
  };

  const getProgress = (achievement: typeof achievementTypes[0]) => {
    if (achievement.category === 'workouts') {
      return Math.min(100, (stats.totalWorkouts / achievement.requirement) * 100);
    }
    if (achievement.category === 'streaks') {
      return Math.min(100, (stats.currentStreak / achievement.requirement) * 100);
    }
    if (achievement.category === 'goals') {
      return stats.goalReached ? 100 : 0;
    }
    return 0;
  };

  const getCurrent = (achievement: typeof achievementTypes[0]) => {
    if (achievement.category === 'workouts') {
      return stats.totalWorkouts;
    }
    if (achievement.category === 'streaks') {
      return stats.currentStreak;
    }
    if (achievement.category === 'goals') {
      return stats.goalReached ? 1 : 0;
    }
    return 0;
  };

  const unlockedCount = achievementTypes.filter(checkUnlocked).length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ClientHeader currentPage="achievements" />
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold tracking-tight mb-2">Achievement System</h1>
          <p className="text-muted-foreground">
            Unlock badges and milestones as you progress on your fitness journey
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements Unlocked</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {unlockedCount}/{achievementTypes.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {((unlockedCount / achievementTypes.length) * 100).toFixed(0)}% complete
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalWorkouts}</div>
              <p className="text-xs text-muted-foreground mt-1">Keep going strong!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Flame className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.currentStreak} days</div>
              <p className="text-xs text-muted-foreground mt-1">Don't break it!</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {achievementTypes.map((achievement) => {
            const unlocked = checkUnlocked(achievement);
            const progress = getProgress(achievement);
            const current = getCurrent(achievement);
            const Icon = achievement.icon;

            return (
              <Card
                key={achievement.id}
                className={unlocked ? 'border-primary' : 'opacity-75'}
                data-testid={`achievement-${achievement.id}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-md ${unlocked ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </div>
                    </div>
                    {unlocked && (
                      <Badge variant="default" data-testid={`badge-unlocked-${achievement.id}`}>
                        <Trophy className="h-3 w-3 mr-1" />
                        Unlocked
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">
                        {current} / {achievement.requirement}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
