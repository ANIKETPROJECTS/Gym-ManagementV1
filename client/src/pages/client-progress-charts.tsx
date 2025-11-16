import { ClientHeader } from "@/components/client-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Scale, Ruler, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

export default function ClientProgressCharts() {
  const { data: weightData } = useQuery({
    queryKey: ['/api/progress/weight'],
  });

  const { data: measurementsData } = useQuery({
    queryKey: ['/api/progress/measurements'],
  });

  const weightChartData = weightData?.history?.map((entry: any) => ({
    date: format(new Date(entry.date), 'MMM dd'),
    weight: entry.weight,
    goal: weightData.goal,
  })) || [];

  const measurementChartData = measurementsData?.history?.map((entry: any) => ({
    date: format(new Date(entry.date), 'MMM dd'),
    chest: entry.chest || null,
    waist: entry.waist || null,
    hips: entry.hips || null,
  })) || [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ClientHeader currentPage="progress-charts" />
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold tracking-tight mb-2">Progress Charts</h1>
          <p className="text-muted-foreground">
            Visual representation of your fitness journey over time
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Weight Progress
              </CardTitle>
              <CardDescription>Track your weight changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              {weightChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={weightChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Current Weight (kg)"
                    />
                    {weightData?.goal && (
                      <Line
                        type="monotone"
                        dataKey="goal"
                        stroke="hsl(var(--destructive))"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Goal Weight (kg)"
                      />
                    )}
                  </RechartsLineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <LineChart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No weight data available yet</p>
                    <p className="text-sm">Start tracking your weight to see progress charts</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ruler className="h-5 w-5" />
                Body Measurements Progress
              </CardTitle>
              <CardDescription>Track your body measurement changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              {measurementChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={measurementChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '0.5rem',
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="chest"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Chest (cm)"
                    />
                    <Line
                      type="monotone"
                      dataKey="waist"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={2}
                      name="Waist (cm)"
                    />
                    <Line
                      type="monotone"
                      dataKey="hips"
                      stroke="hsl(var(--accent-foreground))"
                      strokeWidth={2}
                      name="Hips (cm)"
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Ruler className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No measurement data available yet</p>
                    <p className="text-sm">Start logging your measurements to see progress charts</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Weight Change</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {weightData?.start && weightData?.current ? (
                  <>
                    <div className="text-3xl font-bold">
                      {Math.abs(weightData.current.weight - weightData.start).toFixed(1)} kg
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {weightData.current.weight < weightData.start ? 'Lost' : 'Gained'}
                    </p>
                  </>
                ) : (
                  <div className="text-muted-foreground">No data</div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tracking Days</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{weightChartData.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Weight entries logged</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-1 space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Measurement Entries</CardTitle>
                <Ruler className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{measurementChartData.length}</div>
                <p className="text-xs text-muted-foreground mt-1">Body measurements logged</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
