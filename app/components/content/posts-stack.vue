<script lang="ts" setup>
const { data: posts } = await useAsyncData("posts-stack", () => queryCollection("posts").where("draft", "=", false).order("createdAt", "DESC").all());
</script>

<template>
  <div class="posts-stack">
    <div class="post" v-for="post in posts" :key="post.id">
      <h2>{{ post.title }}</h2>
      <div class="prose">
        <ContentRenderer :value="post.meta.body as Record<string, unknown>" />
      </div>
    </div>
  </div>
</template>