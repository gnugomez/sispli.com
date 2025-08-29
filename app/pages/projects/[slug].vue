<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(`project-${route.params.slug}`, queryCollection('projects').path(route.path).first)

useSeoMeta(data.value?.seo || {
  title: 'Project not found',
})
</script>

<template>
  <ScrollingSlides v-if="data" :slides="data.slides">
    <ContentRenderer :value="data" />
  </ScrollingSlides>
  <div v-else class="prose">
    <h1>Project not found</h1>
    <p>Sorry, the project you are looking for does not exist.</p>
  </div>
</template>
