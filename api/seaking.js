import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const data = await kv.get('seaking_data') || [];
    
    // Cleanup cũ
    const now = Math.floor(Date.now() / 1000);
    const validData = Array.isArray(data) ? data.filter(item => (now - item.timestamp) < 7200) : [];
    
    // Nếu có dọn dẹp data, lưu lại để tối ưu
    if (validData.length !== data.length) {
      await kv.set('seaking_data', validData);
    }

    res.status(200).json(validData);
  } catch (error) {
    res.status(500).json({ error: "Lỗi đọc Database KV: " + error.message });
  }
}
