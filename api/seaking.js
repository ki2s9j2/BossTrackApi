// api/seaking.js — GET endpoint for dashboard
// Returns all active boss entries from Vercel KV
import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    // Get all active keys
    const keys = await kv.smembers("boss:active_keys");
    if (!keys || keys.length === 0) {
      return res.status(200).json([]);
    }

    const results = [];
    const expiredKeys = [];
    const now = Math.floor(Date.now() / 1000);

    for (const key of keys) {
      const raw = await kv.get(key);
      if (!raw) {
        expiredKeys.push(key);
        continue;
      }

      let entry;
      try {
        entry = typeof raw === "string" ? JSON.parse(raw) : raw;
      } catch {
        expiredKeys.push(key);
        continue;
      }

      // Filter out entries older than 5 minutes
      if (entry.data && entry.data.ExpireTime && entry.data.ExpireTime < now) {
        expiredKeys.push(key);
        continue;
      }

      results.push(entry);
    }

    // Clean up expired keys
    if (expiredKeys.length > 0) {
      for (const k of expiredKeys) {
        await kv.srem("boss:active_keys", k);
      }
    }

    // Sort by timestamp descending (newest first)
    results.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    return res.status(200).json(results);
  } catch (err) {
    console.error("Seaking error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
}
