export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message, title } = req.body || {};

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return res.status(500).json({
        error: "Server misconfiguration: DISCORD_WEBHOOK_URL missing",
      });
    }

    // Bullet-proof Discord payload
    const payload = {
      content: "📩 **New Contact / Lead Received**",
      embeds: [
        {
          title: "AmanUX Studio – New Submission",
          color: 3447003,
          description:
            `👤 **Name:** ${name || "N/A"}\n` +
            `📧 **Email:** ${email || "N/A"}\n` +
            `📌 **Interest:** ${title || "General Inquiry"}\n\n` +
            `📝 **Message:**\n${message || "No message provided"}`,
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
      return res.status(500).json({
        error: "Discord rejected the request",
        status: discordRes.status,
      });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
