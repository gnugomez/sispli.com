<template>
  <div class="layout">
    <div class="slides">
      <slot name="slides" />
    </div>
    <div class="content">
      <div class="prose">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  @apply max-w-screen-xl mx-auto;
  @apply grid grid-cols-12 gap-5;

  .slides {
    @apply col-span-12 sm:col-span-8 flex flex-col gap-2;

    $gap: 20px;

    @media (min-width: calc(theme('screens.xl') + $gap * 2)) {
      margin-left: calc((theme('screens.xl') - 100vw) / 2 + $gap);
    }
  }

  .content {
    @apply col-span-12 sm:col-span-4;

    .prose {
      @apply sticky top-8;

      @apply prose-p:text-primary-dimmed prose-headings:text-primary-dimmed prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-h4:text-base;
    }
  }
}
</style>
