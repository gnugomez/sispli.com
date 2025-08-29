<script lang="ts" setup>
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => queryCollection('pages').path(route.path).first());

if (!page.value) {
  throw createError({ statusCode: 404, message: `Page ${route.path} not found`, statusMessage: 'Not Found' });
}
</script>

<template>
  <div class="layout">
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>

<style scoped lang="scss">
.layout {
  @apply max-w-screen-xl mx-auto;
}
</style>