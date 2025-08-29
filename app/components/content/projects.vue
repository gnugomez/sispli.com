<script setup lang="ts">
const { data } = await useAsyncData(`projects`, queryCollection('projects').order('createdAt', 'DESC').all)
</script>

<template>
  <div v-for="project in data" :key="project.path" class="projects">
    <NuxtLink :to="project.path">
      <div class="cover">
        <NuxtImg :src="project.cover" placeholder />
      </div>
      {{ project.title }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.projects {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1;
}

.cover {
  @apply overflow-hidden aspect-[2/3] bg-primary-dimmed/20;

  img {
    @apply object-cover w-full h-full transition-transform duration-300 ease-in-out;

    &:hover {
      @apply scale-105;
    }
  }
}
</style>
