<script lang="ts" setup>
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => queryCollection('pages').path(route.path).first());

if (!page.value) {
  throw createError({ statusCode: 404, message: `Page ${route.path} not found`, statusMessage: 'Not Found' });
}
</script>

<template>
  <ContentRenderer v-if="page" :value="page" />
</template>