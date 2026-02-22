import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const data = await kv.get('seaking_data') || [];
    const now = Math.floor(Date.now() / 1000);
    
    let validData = [];
    let hasChanges = false;

    if (Array.isArray(data)) {
      for (let item of data) {
        let spawnTime = item?.data?.SpawnTime;
        let expireTime = item?.data?.ExpireTime;

        // Xử lý dữ liệu định dạng cũ (Không có biến thời gian động)
        if (!spawnTime || !expireTime) {
          if (now - item.timestamp < 300) { // Giữ được 5 phút với dữ liệu cũ
            validData.push(item);
          } else {
            hasChanges = true;
          }
          continue;
        }

        // ================= THUẬT TOÁN ĐIỀU CHỈNH THỜI GIAN THỰC TẾ =================
        if (now >= expireTime) {
          // BOSS NỞ ĐƯỢC 5 PHÚT -> ĐÃ CHẾT HOẶC MẤT TÍCH -> XOÁ KHỎI SERVER!
          hasChanges = true;
          continue;
        }

        if (now >= spawnTime) {
          // THỜI GIAN ĐÃ VỀ 0 -> BOSS ĐANG ĐỨNG LÙ LÙ TRÊN BIỂN
          item.data.Time = "00:00:00";
          item.data.Status = "Alive";
          validData.push(item);
          hasChanges = true; // Lưu lại trạng thái mới
        } else {
          // ĐANG ĐẾM NGƯỢC CHỜ LÊN MẶT NƯỚC -> Tính lại số giây và biến thành string
          let remainSecs = spawnTime - now;
          let h = Math.floor(remainSecs / 3600).toString().padStart(2, '0');
          let m = Math.floor((remainSecs % 3600) / 60).toString().padStart(2, '0');
          let s = Math.floor(remainSecs % 60).toString().padStart(2, '0');
          
          item.data.Time = `${h}:${m}:${s}`;
          item.data.Status = "Spawning Soon";
          validData.push(item);
        }
      }
    }

    // Nếu có dọn dẹp data (boss chết, boss hết hạn), UPDATE LẠI VÀO DATABASE MỘT LƯỢT
    if (hasChanges) {
      await kv.set('seaking_data', validData);
    }

    res.status(200).json(validData);
  } catch (error) {
    res.status(500).json({ error: "Lỗi đọc Database KV: " + error.message });
  }
}
