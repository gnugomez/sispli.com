<script setup lang="ts">
const { data } = await useAsyncData(`projects`, queryCollection('projects').order('createdAt', 'DESC').all)
</script>

<template>
  <div v-for="project in data" :key="project.path" class="project">
    <NuxtLink :to="project.path">
      {{ project.title }}
    </NuxtLink>
  </div>
</template>
