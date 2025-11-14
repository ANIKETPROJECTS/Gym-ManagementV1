import { ClientHeader } from "@/components/client-header";
import { LiveSessionCard } from "@/components/live-session-card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

export default function ClientSessions() {
  const [, setLocation] = useLocation();

  const upcomingSessions = [
    { id: 1, title: "Power Yoga Session", trainer: "Sarah Johnson", date: "Nov 12, 2025", time: "6:00 PM", duration: "60 min", participants: 8, maxParticipants: 15, status: "upcoming" as const },
    { id: 2, title: "Cardio Bootcamp", trainer: "Sarah Johnson", date: "Nov 13, 2025", time: "7:30 AM", duration: "40 min", participants: 5, maxParticipants: 20, status: "upcoming" as const },
    { id: 3, title: "Flexibility Training", trainer: "Mike Chen", date: "Nov 14, 2025", time: "8:00 PM", duration: "30 min", participants: 10, maxParticipants: 12, status: "upcoming" as const },
  ];

  const liveSessions = [
    { id: 4, title: "HIIT Training", trainer: "Mike Chen", date: "Nov 11, 2025", time: "7:00 PM", duration: "45 min", participants: 12, maxParticipants: 15, status: "live" as const },
  ];

  const completedSessions = [
    { id: 5, title: "Strength Building", trainer: "Alex Rivera", date: "Nov 10, 2025", time: "5:30 PM", duration: "50 min", participants: 14, maxParticipants: 15, status: "completed" as const },
    { id: 6, title: "Core Workout", trainer: "Alex Rivera", date: "Nov 9, 2025", time: "6:00 PM", duration: "35 min", participants: 15, maxParticipants: 15, status: "completed" as const },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader currentPage="sessions" />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-6 space-y-8">
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight">Live Training Sessions</h1>
            <div className="text-muted-foreground mt-1 flex items-center gap-2">
              <span>Join live sessions with certified trainers -</span>
              <Badge className="bg-chart-3">Elite Plan</Badge>
            </div>
          </div>

          {liveSessions.length > 0 && (
            <div>
              <h2 className="text-2xl font-display font-bold tracking-tight mb-6">Live Now</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveSessions.map((session) => (
                  <LiveSessionCard
                    key={session.id}
                    {...session}
                    onJoin={() => console.log(`Joining live session: ${session.title}`)}
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-display font-bold tracking-tight mb-6">Upcoming Sessions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingSessions.map((session) => (
                <LiveSessionCard
                  key={session.id}
                  {...session}
                  onJoin={() => console.log(`Reserving spot for: ${session.title}`)}
                />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold tracking-tight mb-6">Completed Sessions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedSessions.map((session) => (
                <LiveSessionCard key={session.id} {...session} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
