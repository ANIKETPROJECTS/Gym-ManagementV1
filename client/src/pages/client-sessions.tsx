import { ClientHeader } from "@/components/client-header";
import { LiveSessionCard } from "@/components/live-session-card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export default function ClientSessions() {
  const [, setLocation] = useLocation();

  // Fetch real sessions from backend
  const { data: sessionsData, isLoading, isError } = useQuery<any[]>({
    queryKey: ['/api/sessions'],
  });

  // Filter and format sessions by status
  const { upcomingSessions, liveSessions, completedSessions } = useMemo(() => {
    if (!sessionsData) return { upcomingSessions: [], liveSessions: [], completedSessions: [] };

    const formatSession = (session: any) => {
      const sessionDate = new Date(session.scheduledAt);
      return {
        id: session._id,
        title: session.title,
        trainer: "HOC Trainer",
        date: sessionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: sessionDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        duration: `${session.duration} min`,
        participants: session.participants || 0,
        maxParticipants: session.maxParticipants || 15,
        status: session.status,
        meetingLink: session.meetingLink,
      };
    };

    return {
      upcomingSessions: sessionsData
        .filter(s => s.status === 'upcoming')
        .map(formatSession),
      liveSessions: sessionsData
        .filter(s => s.status === 'live')
        .map(formatSession),
      completedSessions: sessionsData
        .filter(s => s.status === 'completed')
        .map(formatSession),
    };
  }, [sessionsData]);

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

          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading sessions...
            </div>
          ) : isError ? (
            <div className="text-center py-12 text-destructive">
              Failed to load sessions. Please refresh the page.
            </div>
          ) : (
            <>
              {liveSessions.length > 0 && (
                <div>
                  <h2 className="text-2xl font-display font-bold tracking-tight mb-6">Live Now</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {liveSessions.map((session: any) => (
                      <LiveSessionCard
                        key={session.id}
                        {...session}
                        onJoin={() => window.open(session.meetingLink, '_blank')}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-2xl font-display font-bold tracking-tight mb-6">Upcoming Sessions</h2>
                {upcomingSessions.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {upcomingSessions.map((session: any) => (
                      <LiveSessionCard
                        key={session.id}
                        {...session}
                        onJoin={() => window.open(session.meetingLink, '_blank')}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No upcoming sessions scheduled
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-display font-bold tracking-tight mb-6">Completed Sessions</h2>
                {completedSessions.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedSessions.map((session: any) => (
                      <LiveSessionCard key={session.id} {...session} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No completed sessions yet
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
