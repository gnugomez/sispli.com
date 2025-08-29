<script setup lang="ts">
const route = useRoute()
const { data } = await useAsyncData(`project-${route.params.slug}`, queryCollection('projects').path(route.path).first)

useSeoMeta(data.value?.seo || {
  title: 'Project not found',
})
</script>

<template>
  <ContentRenderer :value="data || {}">
    <template #empty>
      <p>The project you are looking for does not exist.</p>
    </template>
  </ContentRenderer>
</template>
