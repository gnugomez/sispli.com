<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(`project-${route.params.slug}`, queryCollection('projects').path(route.path).first)

if (!data.value) {
  throw createError({ statusCode: 404, message: `Page ${route.path} not found`, statusMessage: 'Not Found' })
}

useSeoMeta(data.value.seo)
</script>

<template>
  <div :class="{ layout: true, small: data?.size === 'small', full: data?.size === 'full' }">
    <ContentRenderer v-if="data" :value="data" class="flex-1 relative" />
  </div>
</template>

<style scoped lang="scss">
.layout {
  @apply max-w-screen-xl mx-auto flex-1 flex;
}
.small {
  @apply max-w-screen-md mx-auto flex-1 flex;
}
.full {
  @apply max-w-full mx-auto flex-1 flex;
}
</style>

