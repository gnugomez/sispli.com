<script setup lang="ts">
import IconArrow from '~icons/ic/twotone-arrow-outward'

const { data } = await useAsyncData(`projects`, queryCollection('projects').order('weight', 'DESC').all)
</script>

<template>
  <div class="projects">
    <NuxtLink v-for="project in data" :key="project.path" :to="project.path" class="project">
      <div class="cover">
        <IconArrow class="arrow" />
        <NuxtImg :src="project.cover" placeholder />
      </div>
      {{ project.title }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.projects {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3;
}

.project {
  &:hover .cover {
    .arrow {
      @apply scale-100 opacity-100;
    }
  }

  .cover {
    @apply overflow-hidden aspect-[2/3] bg-primary-dimmed/20 relative rounded-xl;

    .arrow {
      @apply absolute top-2 right-2 text-3xl text-white mix-blend-difference;
      @apply transition-all duration-300 ease-in-out;
      @apply origin-top-right sm:scale-75 sm:opacity-0;
    }

    img {
      @apply object-cover w-full h-full;
    }
  }
}
</style>
