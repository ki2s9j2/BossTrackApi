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
    const entry = {
      data: data,
      timestamp: now,
    };

    // Store with JobId as key, auto-expire in 5 minutes
    const key = `boss:${data.JobId}`;
    await kv.set(key, JSON.stringify(entry), { ex: 300 });

    // Also add to the list of active keys
    await kv.sadd("boss:active_keys", key);

    return res.status(200).json({ ok: true, key: key });
  } catch (err) {
    console.error("Update error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
