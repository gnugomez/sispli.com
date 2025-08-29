<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(`project-${route.params.slug}`, queryCollection('projects').path(route.path).first)

useSeoMeta(data.value?.seo || {
  title: 'Project not found',
})
</script>

<template>
  <ScrollingSlides v-if="data">
    <template #slides>
      <Slide v-for="(slide, index) in data.slides" :key="index" :image="slide.image" :width="slide.width"
        :height="slide.height" />
    </template>

    <template #default>
      <ContentRenderer :value="data" />
    </template>
  </ScrollingSlides>
  <div v-else class="prose">
    <h1>Project not found</h1>
    <p>Sorry, the project you are looking for does not exist.</p>
  </div>
</template>
