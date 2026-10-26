export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  let supabaseStatus = "not_configured";
  let message = "Keep-alive ping triggered";

  if (supabaseUrl && supabaseKey) {
    try {
      const start = Date.now();
      const testRes = await fetch(`${supabaseUrl}/rest/v1/posts?select=id&limit=1`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      });

      const responseTime = Date.now() - start;

      if (testRes.ok) {
        supabaseStatus = "active";
        message = `Supabase is online and active (${responseTime}ms). Inactivity timer successfully reset.`;
      } else {
        supabaseStatus = "error";
        message = `Supabase responded with status ${testRes.status}`;
      }
    } catch (err) {
      supabaseStatus = "unreachable";
      message = `Supabase connection error: ${err.message}`;
    }
  }

  return res.status(200).json({
    status: "ok",
    supabase: supabaseStatus,
    message,
    timestamp: new Date().toISOString(),
  });
}
