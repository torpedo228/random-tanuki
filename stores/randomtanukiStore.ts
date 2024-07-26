export const useRandomTanukiStore = defineStore('randomTanukiStore', () => {
  // Slide menu control
  const totalImages = ref<number | null>(null); // 確保初始值為 null

  return { totalImages }
})
