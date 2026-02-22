// api/update.js — POST endpoint for Lua scripts
// Stores boss data in Vercel KV with 5-minute TTL
import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "POST only" });

  try {
    const data = req.body;
    if (!data || !data.JobId) {
      return res.status(400).json({ error: "Missing JobId" });
    }

    const now = Math.floor(Date.now() / 1000);

    // Calculate precise TTL
    let ttl = 300; // 5 minutes default

    if (data.Time && data.Time !== "00:00:00") {
      const parts = data.Time.split(":");
      if (parts.length === 3) {
        // Convert hh:mm:ss to pure seconds
        const h = parseInt(parts[0], 10) || 0;
        const m = parseInt(parts[1], 10) || 0;
        const s = parseInt(parts[2], 10) || 0;
        const totalSeconds = h * 3600 + m * 60 + s;

        // TTL = Time to spawn + 5 minutes
        if (totalSeconds > 0) {
          ttl = totalSeconds + 300;
        }
      }
    }

    const entry = {
      data: {
        ...data,
        SpawnTime: now + (ttl - 300), // Original spawn ETA in timestamp
      },
      timestamp: now,
    };

    // Store with JobId as key, auto-expire precisely
    const key = `boss:${data.JobId}`;
    await kv.set(key, JSON.stringify(entry), { ex: ttl });

    // Also add to the list of active keys
    await kv.sadd("boss:active_keys", key);

    return res.status(200).json({ ok: true, key: key, ttl: ttl });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
