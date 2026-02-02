<script lang="ts" setup>
const { data: posts } = await useAsyncData('posts-stack', () => queryCollection('posts').where('draft', '=', false).order('createdAt', 'DESC').all())

type Content = Record<string, unknown>
</script>

<template>
  <div class="posts-stack">
    <div v-for="post in posts" :key="post.id" class="post">
      <div class="prose max-w-full">
        <h2>{{ post.title }}</h2>
        <span v-if="post.createdAt">{{ new Date(post.createdAt).toLocaleDateString() }}</span>
        <ContentRenderer :value="post.meta.body as Content" />
      </div>
    </div>
  </div>
</template>
