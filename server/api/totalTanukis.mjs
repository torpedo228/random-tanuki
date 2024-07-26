import fs from 'fs/promises';
import path from 'path';
import { defineEventHandler, sendError } from 'h3';

export default defineEventHandler(async (event) => {
  const imagesDir = path.join(process.cwd(), 'public', 'images');

  try {
    // 異步讀取 images 資料夾中的所有文件
    const files = await fs.readdir(imagesDir);

    // 過濾出圖片文件（可根據需求進行調整）
    const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
    const images = files.filter(file => imageExtensions.test(file));

    // 計算圖片總數
    const totalImages = images.length;

    return { totalImages };
  } catch (error) {
    console.error('錯誤:', error); // 打印錯誤信息以便調試
    return sendError(event, new Error('無法掃描目錄或讀取文件'));
  }
});
