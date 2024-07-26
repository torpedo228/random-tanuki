<script lang="ts" setup>
	const randomTanukiStore = useRandomTanukiStore();
</script>

<template>
	<div class="w-[300px] h-full test fixed">
		<p>狸貓總數：{{ randomTanukiStore.totalImages }}隻</p>
	</div>
</template>

<style lang="scss" scoped></style>
