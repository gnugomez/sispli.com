<script setup lang="ts">
const { columnStart, columnEnd, rowStart, rowEnd } = defineProps<{
  columnStart?: number | string
  columnEnd?: number | string
  rowStart?: number | string
  rowEnd?: number | string
}>()
</script>
<template>
  <div :style="{
    gridColumnStart: columnStart,
    gridColumnEnd: columnEnd,
    gridRowStart: rowStart,
    gridRowEnd: rowEnd,
  }">
    <slot />
  </div>
</template>