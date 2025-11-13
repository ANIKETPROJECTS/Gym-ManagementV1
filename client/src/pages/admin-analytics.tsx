import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, Video, Calendar, TrendingUp, Activity } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function AdminAnalytics() {
  const style = { "--sidebar-width": "16rem" };

  const { data: clients = [] } = useQuery<any[]>({
    queryKey: ['/api/clients'],
  });

  const { data: packages = [] } = useQuery<any[]>({
    queryKey: ['/api/packages'],
  });

  const { data: videos = [] } = useQuery<any[]>({
    queryKey: ['/api/videos'],
  });

  const packageById = packages.reduce((map, pkg) => {
    map[pkg._id] = pkg;
    return map;
  }, {} as Record<string, any>);

  const clientsWithPackages = clients.map(client => {
    const packageId = typeof client.packageId === 'object' ? client.packageId._id : client.packageId;
    const pkg = packageById[packageId];
    return {
      ...client,
      packageData: pkg || null
    };
  });

  const totalClients = clients.length;
  const activeClients = clientsWithPackages.filter(c => c.packageData).length;
  const monthlyRevenue = clientsWithPackages.reduce((sum, client) => {
    return sum + (client.packageData?.price || 0);
  }, 0);

  const packageDistribution = packages.map(pkg => {
    const count = clientsWithPackages.filter(c => c.packageData?._id === pkg._id).length;
    const percentage = totalClients > 0 ? Math.round((count / totalClients) * 100) : 0;
    const color = pkg.name === "Basic" ? "bg-chart-1" : pkg.name === "Premium" ? "bg-chart-2" : "bg-chart-3";
    return { name: pkg.name, count, percentage, color };
  });

  const recentActivities = [...clientsWithPackages]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AdminSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4">
              <SidebarTrigger data-testid="button-sidebar-toggle" />
              <h1 className="text-2xl font-display font-bold tracking-tight">Analytics</h1>
            </div>
            <ThemeToggle />
          </header>

          <main className="flex-1 overflow-auto p-8">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Clients" value={totalClients} icon={Users} trend={`${activeClients} active`} trendUp={true} />
                <StatCard title="Active Users" value={activeClients} icon={Activity} trend={`${totalClients - activeClients} inactive`} trendUp={true} />
                <StatCard title="Monthly Revenue" value={`$${monthlyRevenue.toLocaleString()}`} icon={DollarSign} trend={`From ${totalClients} clients`} trendUp={true} />
                <StatCard title="Total Videos" value={videos.length} icon={Video} trend="In library" trendUp={true} />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display">Package Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {packageDistribution.length > 0 ? (
                      packageDistribution.map((pkg) => (
                        <div key={pkg.name} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{pkg.name}</span>
                            <span className="text-muted-foreground">{pkg.count} clients ({pkg.percentage}%)</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className={`${pkg.color} h-2 rounded-full transition-all`}
                              style={{ width: `${pkg.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No packages available</p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-display">Recent Client Signups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.length > 0 ? (
                        recentActivities.map((client) => (
                          <div key={client._id} className="flex items-center gap-4">
                            <div className="flex-1">
                              <p className="font-medium">{client.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Joined {new Date(client.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </p>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {client.packageData?.name || 'No Package'}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No recent signups</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="font-display">System Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 pb-3 border-b">
                      <Calendar className="h-5 w-5 text-chart-1 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">Total Clients</p>
                        <p className="text-sm text-muted-foreground">{totalClients} members registered</p>
                        <p className="text-xs text-muted-foreground mt-1">{activeClients} currently active</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 pb-3 border-b">
                      <Video className="h-5 w-5 text-chart-2 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">Video Library</p>
                        <p className="text-sm text-muted-foreground">{videos.length} workout videos available</p>
                        <p className="text-xs text-muted-foreground mt-1">Accessible to all clients</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-chart-3 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-medium">Package Plans</p>
                        <p className="text-sm text-muted-foreground">{packages.length} membership packages offered</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {packages.map(p => p.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
