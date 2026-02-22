import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  // Cấp quyền truy cập web (CORS)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const {
        JobId,
        Players,
        MaxPlayers,
        "Name Boss": NameBoss,
        Time,
        Status,
      } = req.body;

      const playersStr = `${Players || 0}/${MaxPlayers || 12}`;
      const now = Math.floor(Date.now() / 1000);

      const newEntry = {
        data: {
          Players: playersStr,
          "Name Boss": NameBoss || "SeaKing",
          Time: Time || "00:00:00",
          JobId: JobId || "",
          Status: Status || "Unknown",
        },
        timestamp: now,
      };

      // Đọc dữ liệu cũ từ Vercel Redis KV
      let currentData = (await kv.get("seaking_data")) || [];
      if (!Array.isArray(currentData)) currentData = [];

      let found = false;
      for (let i = 0; i < currentData.length; i++) {
        if (currentData[i]?.data?.JobId === JobId) {
          currentData[i] = newEntry;
          found = true;
          break;
        }
      }
      if (!found) currentData.push(newEntry);

      // Xóa các Server cũ (quá 2 tiếng = 7200s, hoặc các server rác)
      currentData = currentData.filter((item) => now - item.timestamp < 7200);

      // Lưu ngược lại Database
      await kv.set("seaking_data", currentData);

      return res
        .status(200)
        .json({ success: true, message: "Đã trinh sát Boss thành công!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Lỗi kết nối CSDL Vercel KV" });
    }
  } else {
    return res
      .status(405)
      .json({ error: "Chỉ chấp nhận lệnh POST từ Script Lua" });
  }
}
