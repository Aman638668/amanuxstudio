import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Trash2, RefreshCw, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface Lead {
  id: string;
  name: string;
  email: string;
  message: string;
  title: string;
  status?: string;
  created_at: string;
}

export default function LeadsManager() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        // If table doesn't exist yet, show friendly notice
        console.warn("Could not query leads table:", error.message);
      } else {
        setLeads(data || []);
      }
    } catch (err: any) {
      console.error("Leads fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry record?")) return;
    try {
      const { error } = await supabase.from("leads").delete().eq("id", id);
      if (error) throw error;
      setLeads(leads.filter((l) => l.id !== id));
      toast.success("Lead removed successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete lead");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Client Inquiries & Contact Submissions
          </h3>
          <p className="text-sm text-slate-500">
            All leads submitted through your website forms and newsletter. Also mirrored to your Discord channel.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchLeads}
          disabled={loading}
          className="border-slate-300 dark:border-slate-700"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh Leads
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading inquiry records...</div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 mx-auto flex items-center justify-center">
              <MessageSquare className="h-6 w-6" />
            </div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-200">No Inquiries Found in Database</h4>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Inquiries are also sent to your Discord channel in real-time. Once incoming inquiries are recorded in Supabase, they will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 dark:border-slate-700">
                  <TableHead className="font-semibold text-slate-600 dark:text-slate-300">Name & Email</TableHead>
                  <TableHead className="font-semibold text-slate-600 dark:text-slate-300">Inquiry Type</TableHead>
                  <TableHead className="font-semibold text-slate-600 dark:text-slate-300">Message</TableHead>
                  <TableHead className="font-semibold text-slate-600 dark:text-slate-300">Received Date</TableHead>
                  <TableHead className="text-right font-semibold text-slate-600 dark:text-slate-300">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id} className="border-slate-200 dark:border-slate-700">
                    <TableCell>
                      <div className="font-medium text-slate-900 dark:text-white">{lead.name || "Anonymous"}</div>
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-slate-50 dark:bg-slate-700 font-normal">
                        {lead.title || "Contact Form"}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                        {lead.message}
                      </p>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500 whitespace-nowrap">
                      {format(new Date(lead.created_at), "MMM d, yyyy h:mm a")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a href={`mailto:${lead.email}?subject=Re: ${encodeURIComponent(lead.title || "Your Inquiry on Aman UX Studio")}`}>
                          <Button variant="outline" size="sm" className="h-8 text-xs text-blue-600">
                            Reply
                          </Button>
                        </a>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(lead.id)}
                          className="h-8 w-8 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
