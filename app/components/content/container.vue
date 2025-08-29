<script setup lang="ts">
const { columns, gap = 1 } = defineProps<{
  columns: number | string
  gap?: string | number
}>()

</script>

<template>
  <div class="columns"
    :style="{ gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: typeof gap === 'number' ? `${gap}rem` : gap }">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.columns {
  display: grid;
}
</style>
