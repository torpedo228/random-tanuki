<script setup lang="ts">
	const randomTanukiStore = useRandomTanukiStore();

	const index = ref<number>();
	const imageUrl = ref<string>("");
	const totalImages = ref<number | null>(null);

	const fetchData = async (url: string): Promise<any> => {
		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error("Network response was not ok");
			return response.json();
		} catch (error) {
			console.error("Fetch error:", error);
			throw error;
		}
	};

	const loadImage = async () => {
		try {
			const data = await fetchData(
				`https://random-tanuki.vercel.app/api/randomTanuki/?i=${index.value}`,
			);
			if (data.url) {
				imageUrl.value = data.url;
				totalImages.value = data.totalImages;
			} else {
				imageUrl.value = "";
				alert("圖片加載錯誤");
			}
		} catch (error) {
			imageUrl.value = "";
			alert("圖片加載錯誤");
		}
	};

	onMounted(async () => {
		try {
			const data = await fetchData("https://random-tanuki.vercel.app/api/totalTanukis");
			randomTanukiStore.totalImages = data.totalImages;

			const query = new URLSearchParams(window.location.search);
			const i = query.get("i");

			if (i) {
				index.value = Number(i);
			} else {
				index.value = Math.floor(Math.random() * randomTanukiStore.totalImages!);
			}

			await loadImage();
		} catch (error) {
			console.error("初始數據加載錯誤:", error);
		}
	});
</script>

<template>
	<div class="flex-v-c w-full h-full">
		<div class="flex-h-c w-full">
			<div class="w-[1000px] aspect-[5/3] flex-v-c overflow-hidden">
				<img
					class="w-full h-full object-cover"
					:src="imageUrl"
					alt="二!狸貓" />
			</div>
		</div>
	</div>
</template>

<style scoped></style>
