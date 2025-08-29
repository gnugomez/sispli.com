<script setup lang="ts">
useSeoMeta({
  title: 'Portfolio',
  description: 'Sispli studio portfolio',
})

const { data } = await useAsyncData(`projects`, queryCollection('projects').all)
</script>

<template>
  <div v-for="project in data" :key="project.path" class="project">
    <NuxtLink :to="project.path">
      {{ project.title }}
    </NuxtLink>
  </div>
</template>
