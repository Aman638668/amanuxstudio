export const config = {
  runtime: "nodejs18.x",
};

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message, title, token } = request.body;

    // SECURE: Use environment variable. 
    // Do NOT commit the actual URL to GitHub.
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
        return response.status(500).json({ error: 'Server configuration error: Missing Webhook URL' });
    }

    // Construct Discord Embed
    const embed = {
        title: "New Lead / Contact Request",
        color: 3447003, // Blue-ish
        fields: [
            { name: "Name", value: name || "N/A", inline: true },
            { name: "Email", value: email || "N/A", inline: true },
            { name: "Interest / Post", value: title || "General Inquiry" },
            { name: "Message", value: message || "No message provided" }
        ],
        timestamp: new Date().toISOString(),
        footer: { text: "AmanUX Studio Lead Gen" }
    };

    // Verify ReCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (secretKey && token) {
        const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
        const verifyRes = await fetch(verifyUrl, { method: 'POST' });
        const verifyData = await verifyRes.json();

        if (!verifyData.success) {
            return response.status(400).json({ error: 'ReCAPTCHA verification failed', details: verifyData['error-codes'] });
        }
    }

    try {
        const discordRes = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ embeds: [embed] }),
        });

        if (discordRes.ok) {
            return response.status(200).json({ success: true });
        } else {
            const text = await discordRes.text();
            console.error("Discord Error:", text);
            return response.status(500).json({ error: 'Failed to send to Discord' });
        }
    } catch (error) {
        console.error("Server Error:", error);
        return response.status(500).json({ error: 'Internal Server Error' });
    }
}
