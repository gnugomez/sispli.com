<script setup lang="ts">
import IconArrow from '~icons/ic/twotone-arrow-outward'

const props = defineProps<{
  id: number
  title: string
  price: string
  currency: string
  size?: string
  imageUrl?: string
}>()

function formatPrice(amount: string, currency: string): string {
  const num = Number.parseFloat(amount)
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
  }).format(num)
}
</script>

<template>
  <NuxtLink :to="`/shop/${props.id}`" class="product-card group">
    <div class="cover">
      <IconArrow class="arrow" />
      <img v-if="props.imageUrl" :src="props.imageUrl" :alt="props.title">
    </div>
    <div class="info">
      <span class="title">{{ props.title }}</span>
      <span class="price">{{ formatPrice(props.price, props.currency) }}</span>
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.product-card {
  &:hover .cover {
    .arrow {
      @apply scale-100 opacity-100;
    }
  }

  .cover {
    @apply overflow-hidden bg-primary-dimmed/20 relative rounded-xl;
    aspect-ratio: 1 / 1;

    @screen sm {
      aspect-ratio: 2 / 3;
    }

    .arrow {
      @apply absolute top-2 right-2 text-3xl text-white mix-blend-difference;
      @apply transition-all duration-300 ease-in-out;
      @apply origin-top-right sm:scale-75 sm:opacity-0;
    }

    img {
      @apply object-cover w-full h-full;
    }
  }

  .info {
    @apply mt-1 px-0.5;
  }

  .title {
    @apply block font-inconsolata text-primary text-xs sm:text-sm line-clamp-1;
  }

  .price {
    @apply block font-inconsolata text-primary font-bold text-sm sm:text-base;
  }
}
</style>
