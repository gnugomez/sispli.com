<script setup lang="ts">
const route = useRoute()

const { data } = await useAsyncData(`project-${route.params.slug}`, queryContent(`/project/${route.params.slug}`).findOne)

if (data.value) {
  useContentHead(data.value)
}
</script>

<template>
  <ContentRenderer :value="data || {}">
    <template #empty>
      <p>No content found.</p>
    </template>
  </ContentRenderer>
</template>
