export const config = {
  runtime: "nodejs",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message, title, token } = req.body || {};

    /* -------------------- ENV CHECKS -------------------- */
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;

    if (!webhookUrl) {
      return res.status(500).json({
        error: "Server misconfiguration: DISCORD_WEBHOOK_URL missing",
      });
    }

    if (!recaptchaSecret) {
      return res.status(500).json({
        error: "Server misconfiguration: RECAPTCHA_SECRET_KEY missing",
      });
    }

    if (!token) {
      return res.status(400).json({
        error: "Missing reCAPTCHA token",
      });
    }

    /* -------------------- RECAPTCHA VERIFY -------------------- */
    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: recaptchaSecret,
          response: token,
        }),
      }
    );

    const verifyData = await verifyRes.json();

    if (!verifyData.success || verifyData.score < 0.5) {
      console.warn("reCAPTCHA failed:", verifyData);
      return res.status(403).json({
        error: "reCAPTCHA verification failed",
        score: verifyData.score,
      });
    }

    /* -------------------- DISCORD PAYLOAD -------------------- */
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

    /* -------------------- SEND TO DISCORD -------------------- */
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
