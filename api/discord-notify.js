export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message, title, phone, token } = req.body || {};

    // Basic validation
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ error: "A valid email address is required" });
    }

    // Server-side ReCAPTCHA verification (if secret key configured)
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret && token) {
      try {
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${token}`;
        const captchaRes = await fetch(verifyUrl, { method: "POST" });
        const captchaData = await captchaRes.json();
        if (!captchaData.success) {
          console.warn("ReCAPTCHA verification failed:", captchaData["error-codes"]);
          return res.status(400).json({ error: "reCAPTCHA verification failed. Please try again." });
        }
      } catch (captchaErr) {
        console.error("ReCAPTCHA network error:", captchaErr);
        // Continue gracefully if Google verification times out
      }
    }

    const cleanName = (name || "").trim().slice(0, 100);
    const cleanEmail = email.trim().slice(0, 150);
    const cleanPhone = (phone || "").trim().slice(0, 30);
    const cleanTitle = (title || "Website Contact Form").trim().slice(0, 100);
    const cleanMessage = (message || "No message body provided").trim().slice(0, 2000);

    // 1. Dual Storage: Attempt to save lead to Supabase as backup if credentials exist
    const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      try {
        await fetch(`${supabaseUrl}/rest/v1/leads`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "apikey": supabaseKey,
            "Authorization": `Bearer ${supabaseKey}`,
            "Prefer": "return=minimal"
          },
          body: JSON.stringify({
            name: cleanName || "N/A",
            email: cleanEmail,
            message: cleanPhone ? `Phone: ${cleanPhone}\n\n${cleanMessage}` : cleanMessage,
            title: cleanTitle,
            status: "new"
          })
        });
      } catch (dbErr) {
        console.warn("Could not save lead to Supabase:", dbErr.message);
      }
    }

    // 2. Dispatch to Discord Webhook
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("DISCORD_WEBHOOK_URL is not set");
      return res.status(500).json({
        error: "Server configuration issue: Webhook destination not configured.",
      });
    }

    const fields = [
      { name: "👤 Name", value: cleanName || "Anonymous", inline: true },
      { name: "📧 Email", value: `[${cleanEmail}](mailto:${cleanEmail})`, inline: true },
    ];

    if (cleanPhone) {
      fields.push({ name: "📞 Phone", value: cleanPhone, inline: true });
    }

    fields.push({ name: "📌 Subject / Source", value: cleanTitle, inline: false });
    fields.push({ name: "💬 Message", value: cleanMessage.length > 1024 ? cleanMessage.slice(0, 1020) + "..." : cleanMessage, inline: false });

    const payload = {
      content: `🔔 **New Inquiry received on Aman UX Studio!**`,
      allowed_mentions: { parse: [] }, // Prevents accidental or malicious @everyone pings
      embeds: [
        {
          title: `Inquiry: ${cleanTitle}`,
          color: 0x2563EB, // Brand Blue
          fields: fields,
          footer: { text: "Aman UX Studio Lead Notification" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!discordRes.ok) {
      const text = await discordRes.text();
      console.error("Discord rejected request:", discordRes.status, text);
      return res.status(502).json({
        error: "Failed to forward notification to Discord",
        status: discordRes.status,
      });
    }

    return res.status(200).json({ success: true, message: "Inquiry received and notification sent" });

  } catch (err) {
    console.error("Server error handling notification:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
