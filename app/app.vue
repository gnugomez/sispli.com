<script setup lang="ts">
useHead({
  titleTemplate: title => title ? `${title} - Sispli! Studio` : 'Sispli! Studio',
})

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <NuxtLoadingIndicator color="#2E396A" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Menu :relaxed="isHome" />
</template>
