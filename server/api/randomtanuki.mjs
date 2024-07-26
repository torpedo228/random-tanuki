import fs from 'fs';
import path from 'path';
import { defineEventHandler, getQuery, sendError } from 'h3';

export default defineEventHandler(async (event) => {
  const imagesDir = path.join(process.cwd(), 'public', 'images');

  try {
    // 同步讀取 images 資料夾中的所有文件
    const files = fs.readdirSync(imagesDir);

    // 過濾出圖片文件（可根據需求進行調整）
    const images = files.filter((file) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(file));

    // 計算圖片總數
    const totalImages = images.length;

    // 讀取查詢參數
    const query = getQuery(event);
    const index = parseInt(query.i, 10);

    // 根據查詢參數選擇圖片
    if (isNaN(index) || index < 0 || index >= totalImages) {
      return sendError(event, new Error('Invalid index'));
    }

    const selectedImage = `/images/${images[index]}`;
    return { url: selectedImage, totalImages };
  } catch (error) {
    return sendError(event, new Error('Unable to scan directory'));
  }
});
