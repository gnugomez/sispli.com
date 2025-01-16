<script setup lang="ts">
useSeoMeta({
  title: 'Portfolio',
  description: 'Sispli studio portfolio',
})

const { data } = await useAsyncData(`projects`, queryContent('project').find)
</script>

<template>
  <div v-for="project in data" :key="project._path" class="project">
    <NuxtLink :to="project._path">
      {{ project.title }}
    </NuxtLink>
  </div>
</template>
