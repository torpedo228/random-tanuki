<script setup lang="ts">
	const randomTanukiStore = useRandomTanukiStore();

	const index = ref<number>();
	const imageSrc = ref<string>("");
	const totalImages = ref<number | null>(null);

	const loadImage = async () => {
		const getRandomtanuki = `https://random-tanuki.vercel.app/api/randomtanuki/?i=${index.value}`;

		try {
			const response = await fetch(getRandomtanuki);
			const data = await response.json();
			console.log("API 返回的數據:", data);
			if (data.imgSrc) {
				imageSrc.value = data.imgSrc;
				totalImages.value = data.totalImages;
			} else {
				imageSrc.value = "";
				alert("圖片加載錯誤");
			}
		} catch (error) {
			console.error("圖片加載錯誤:", error);
			imageSrc.value = "";
			alert("圖片加載錯誤");
		}
	};
	// 在組件加載時檢查網址中的查詢參數
	onMounted(async () => {
		const getTotalTanukis = await fetch(`https://random-tanuki.vercel.app/api/totalTanukis`);

		const data = await getTotalTanukis.json();

		randomTanukiStore.totalImages = data.totalImages;

		const query = new URLSearchParams(window.location.search);
		const i = query.get("i");

		if (i) {
			index.value = Number(i);
		} else {
			index.value = Math.floor(Math.random() * randomTanukiStore.totalImages!);
		}

		await loadImage();
	});
</script>

<template>
	<div class="flex-v-c w-full h-full">
		<div class="flex-h-c w-full">
			<div class="w-[1000px] aspect-[5/3] flex-v-c overflow-hidden">
				<img
					class="w-full h-full object-cover"
					:src="imageSrc"
					alt="二!狸貓"
			/></div>
		</div>
	</div>
</template>

<style scoped></style>
