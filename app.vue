<script setup lang="ts">
useHead({
  titleTemplate: title => title ? `${title} - Sispli! Studio` : 'Sispli! Studio',
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
