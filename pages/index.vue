<script setup lang="ts">
	const randomTanukiStore = useRandomTanukiStore();

	const index = ref<number>();
	const imageUrl = ref<string>("");
	const totalImages = ref<number | null>(null);
	4;
	const config = useRuntimeConfig();

	const loadImage = async () => {
		const getRandomtanuki = `${config.public.apiBaseUrl}/randomtanuki/?i=${index.value}`;
		// const getRandomtanuki = `https://random-tanuki.vercel.app/api/randomtanuki/?i=${index.value}`;

		try {
			const response = await fetch(getRandomtanuki);
			const data = await response.json();
			console.log("API 返回的數據:", data);
			if (data.url) {
				imageUrl.value = data.url;
				totalImages.value = data.totalImages;
			} else {
				imageUrl.value = "";
				alert("圖片加載錯誤");
			}
		} catch (error) {
			console.error("圖片加載錯誤:", error);
			imageUrl.value = "";
			alert("圖片加載錯誤");
		}
	};
	// 在組件加載時檢查網址中的查詢參數
	onMounted(async () => {
		const getTotalTanukis = await fetch(`${config.public.apiBaseUrl}/totalTanukis`);
		console.log(`${config.public.apiBaseUrl}/totalTanukis`);
		// const getTotalTanukis = await fetch(`https://random-tanuki.vercel.app/api/totalTanukis`);

		const data = await getTotalTanukis.json();

		randomTanukiStore.totalImages = data.totalImages;

		const query = new URLSearchParams(window.location.search);
		const i = query.get("i");

		if (i) {
			index.value = Number(i);
		} else {
			// 如果沒有查詢參數，生成一個隨機索引
			index.value = Math.floor(Math.random() * randomTanukiStore.totalImages!); // 確保 totalImages 有值
		}

		await loadImage();
	});
</script>

<template>
	<div class="flex-v-c w-full h-full">
		<div
			class="flex-h-c w-full"
			v-if="imageUrl">
			<div class="w-[1000px] aspect-[5/3] flex-v-c overflow-hidden">
				<img
					class="w-full h-full object-cover"
					:src="imageUrl"
					alt="二!狸貓"
			/></div>
		</div>
	</div>
</template>

<style scoped></style>
