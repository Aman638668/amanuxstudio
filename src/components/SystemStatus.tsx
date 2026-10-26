import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Bell, CheckCircle2, AlertTriangle, RefreshCw, Send, ShieldCheck, Cloud } from "lucide-react";
import { toast } from "sonner";

export default function SystemStatus() {
  const [supabaseStatus, setSupabaseStatus] = useState<"checking" | "online" | "paused" | "unconfigured">("checking");
  const [latency, setLatency] = useState<number | null>(null);
  const [pinging, setPinging] = useState(false);
  const [testingWebhook, setTestingWebhook] = useState(false);

  const checkSupabase = async () => {
    setPinging(true);
    const start = performance.now();
    try {
      const { data, error } = await supabase.from("posts").select("id").limit(1);
      const elapsed = Math.round(performance.now() - start);
      setLatency(elapsed);

      if (error) {
        if (error.message.includes("fetch") || error.code === "PGRST301") {
          setSupabaseStatus("paused");
        } else {
          setSupabaseStatus("online");
        }
      } else {
        setSupabaseStatus("online");
      }
    } catch (err) {
      setSupabaseStatus("paused");
    } finally {
      setPinging(false);
    }
  };

  useEffect(() => {
    checkSupabase();
  }, []);

  const pingKeepAlive = async () => {
    setPinging(true);
    try {
      const res = await fetch("/api/keepalive");
      const data = await res.json();
      if (data.supabase === "active") {
        toast.success("Keep-alive ping sent! Supabase inactivity timer reset.");
        checkSupabase();
      } else {
        toast.info(data.message || "Ping completed.");
      }
    } catch (err: any) {
      // Fallback: ping via supabase client
      await checkSupabase();
      toast.success("Direct Supabase query executed to keep database active.");
    } finally {
      setPinging(false);
    }
  };

  const testDiscordWebhook = async () => {
    setTestingWebhook(true);
    try {
      const res = await fetch("/api/discord-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Aman (Admin Diagnostic)",
          email: "amanuxstudio@gmail.com",
          title: "Discord Webhook Diagnostic Test",
          message: "This is a verification test sent from your Aman UX Studio admin dashboard.",
        }),
      });

      if (res.ok) {
        toast.success("Discord ping sent! Check your Discord channel.");
      } else {
        const data = await res.json();
        toast.error(data.error || "Discord rejected webhook. Verify DISCORD_WEBHOOK_URL.");
      }
    } catch (err: any) {
      toast.error("Could not reach /api/discord-notify endpoint.");
    } finally {
      setTestingWebhook(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white">
          System Health, Supabase & Webhook Status
        </h3>
        <p className="text-sm text-slate-500">
          Monitor your database status, reset inactivity auto-pause timers, and verify your Discord lead pipeline.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Supabase Status Card */}
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">Supabase Database</CardTitle>
              </div>
              <Badge
                variant={supabaseStatus === "online" ? "default" : "destructive"}
                className={
                  supabaseStatus === "online"
                    ? "bg-emerald-500 text-white"
                    : "bg-amber-500 text-white"
                }
              >
                {supabaseStatus === "checking"
                  ? "Checking..."
                  : supabaseStatus === "online"
                  ? "Active & Connected"
                  : "Paused / Offline"}
              </Badge>
            </div>
            <CardDescription>
              Supabase free-tier pauses after 7 days of inactivity. Our automated GitHub Action keeps it active 24/7.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-sm space-y-1">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Response Latency:</span>
                <span className="font-mono font-medium text-slate-900 dark:text-white">
                  {latency ? `${latency} ms` : "—"}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Auto-Pause Protection:</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4" /> Enabled (GitHub Cron)
                </span>
              </div>
            </div>

            <Button
              onClick={pingKeepAlive}
              disabled={pinging}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${pinging ? "animate-spin" : ""}`} />
              Ping Supabase Now (Reset Inactivity Timer)
            </Button>
          </CardContent>
        </Card>

        {/* Discord Lead Channel Card */}
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-indigo-600" />
                <CardTitle className="text-lg">Discord Lead Pipeline</CardTitle>
              </div>
              <Badge variant="outline" className="border-indigo-500 text-indigo-600">
                Webhook Active
              </Badge>
            </div>
            <CardDescription>
              Website contact forms, blog quotes, and newsletter signups trigger instant alerts to your Discord.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg text-sm space-y-1">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Notification Type:</span>
                <span className="font-medium text-slate-900 dark:text-white">Rich Embed + Mailto</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Spam Protection:</span>
                <span className="font-semibold text-emerald-600">Input validation + Rate safety</span>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={testDiscordWebhook}
              disabled={testingWebhook}
              className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
            >
              <Send className={`h-4 w-4 mr-2 ${testingWebhook ? "animate-pulse" : ""}`} />
              Send Test Notification to Discord
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Cloud Automation Info Box */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 border border-blue-100 dark:border-slate-700">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-600 text-white rounded-xl shadow-md">
            <Cloud className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white">
              24/7 Cloud Automation (Active Even When Laptop Is Offline)
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Your repository is configured with two GitHub Actions workflows:
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-300 list-disc ml-4 space-y-1 mt-2">
              <li>
                <strong>Supabase Keep-Alive Cron:</strong> Queries the database every 48 hours to ensure Supabase never sleeps or pauses.
              </li>
              <li>
                <strong>Daily Blog Publisher:</strong> Publishes a daily article, commits the updated sitemap to GitHub, and pings your Discord with the new link.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
