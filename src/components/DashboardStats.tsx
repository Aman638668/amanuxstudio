
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { subDays, format, isSameDay } from "date-fns";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, ArrowUpRight } from "lucide-react";

const DashboardStats = () => {
    const [data, setData] = useState<{ date: string; count: number }[]>([]);
    const [totalVisits, setTotalVisits] = useState(0);
    const [postsCount, setPostsCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();

        // Subscribe to real-time changes
        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'website_visits',
                },
                (payload) => {
                    console.log('Real-time update:', payload);
                    setTotalVisits((prev) => prev + 1);
                    fetchStats(); // Refetch to update chart immediately
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchStats = async () => {
        try {
            const startDate = subDays(new Date(), 7).toISOString();
            const { data: visits, error: visitsError } = await supabase
                .from("website_visits")
                .select("created_at")
                .gte("created_at", startDate);

            if (visitsError) throw visitsError;

            const { count: postsTotal, error: postsError } = await supabase
                .from("posts")
                .select("*", { count: 'exact', head: true });

            if (postsError) throw postsError;
            setPostsCount(postsTotal || 0);

            const chartData = [];
            let total = 0;
            const now = new Date();
            for (let i = 6; i >= 0; i--) {
                const date = subDays(now, i);
                const count = visits?.filter(v => isSameDay(new Date(v.created_at), date)).length || 0;
                total += count;
                chartData.push({
                    date: format(date, "MMM dd"),
                    count,
                });
            }

            setData(chartData);
            setTotalVisits(total);
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-slate-500 dark:text-slate-400">Loading stats...</div>;

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Total Visits (7d)
                        </CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-800 dark:text-white">{totalVisits}</div>
                        <p className="text-xs text-green-500 flex items-center mt-1">
                            <ArrowUpRight className="h-3 w-3 mr-1" /> +12% from last week
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Total Posts
                        </CardTitle>
                        <FileText className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-800 dark:text-white">{postsCount}</div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Content is growing!
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-slate-800 dark:text-white">Traffic Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-0">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="date"
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#94a3b8"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        borderColor: '#e2e8f0',
                                        borderRadius: '0.5rem',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                    itemStyle={{ color: '#1e293b' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorVisits)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardStats;
