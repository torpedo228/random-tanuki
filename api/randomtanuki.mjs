import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { query } = req;
  const imagesDir = path.join(process.cwd(), 'public', 'images');

  // 讀取 images 資料夾中的所有文件
  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      res.status(500).json({ error: 'Unable to scan directory' });
      return;
    }

    // 過濾出圖片文件（可根據需求進行調整）
    const images = files.filter(file => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file));

    // 根據查詢參數選擇圖片
    const index = parseInt(query.i, 10);
    if (isNaN(index) || index < 0 || index >= images.length) {
      res.status(400).json({ error: 'Invalid index' });
      return;
    }
    const selectedImage = `https://random-tanuki.vercel.app/images/${images[index]}`;
    // const selectedImage = `/images/${images[index]}`;

    res.status(200).json({ imgSrc: selectedImage });
  });
}
