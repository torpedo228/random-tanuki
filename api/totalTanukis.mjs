import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  try {
    const imagesDir = path.join(process.cwd(), 'public', 'images');

    // 異步讀取 images 資料夾中的所有文件
    const files = await fs.readdir(imagesDir);

    // 過濾出圖片文件
    const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
    const images = files.filter(file => imageExtensions.test(file));

    // 計算圖片總數
    const totalImages = images.length;

    res.status(200).json({ totalImages });
  } catch (error) {
    console.error('Error reading images directory:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
