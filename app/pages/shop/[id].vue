<script setup lang="ts">
import IconArrow from '~icons/ic/twotone-arrow-outward'

const route = useRoute()
const productId = Number(route.params.id)

const { data, status, error } = await useAsyncData(
  'shop-products:full',
  () => $fetch('/api/shop/products', {
    params: {
      limit: 999,
    },
  }),
)

const product = computed(() =>
  data.value?.products.find(p => p.id === productId) ?? null,
)

const { data: productContent } = await useAsyncData(`product-content-${route.params.id}`, queryCollection('products').path(route.path).first)

useSeoMeta({
  title: product.value ? `${product.value.title}` : 'Product page',
  description: product.value ? `Check out ${product.value.title} in my shop!` : 'Browse products in my shop.',
})

if (!error.value && status.value === 'success' && !product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found',
  })
}

function getImageUrl(photo: NonNullable<typeof product.value>['photos'][number]): string {
  const thumb = photo.thumbnails.find(t => t.type === 'thumb428x624')
  return thumb?.url || photo.url
}

function formatPrice(amount: string, currency: string): string {
  const num = Number.parseFloat(amount)
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
  }).format(num)
}
</script>

<template>
  <div v-if="status === 'pending'" class="text-center text-primary">
    Loading product...
  </div>

  <div v-else-if="error" class="text-center text-red-500">
    Failed to load product.
  </div>

  <div v-else-if="product" class="layout">
    <div class="photos">
      <div v-for="photo in product.photos" :key="photo.url" class="slide">
        <img :src="getImageUrl(photo)" :alt="product.title">
      </div>
    </div>

    <div class="info">
      <div class="info-inner">
        <NuxtLink to="/shop" class="back">
          ← Back to shop
        </NuxtLink>

        <h1>{{ product.title }}</h1>

        <div class="tags">
          <span>{{ product.status }}</span>
          <span v-if="product.size">{{ product.size }}</span>
          <span v-if="product.isReserved" class="reserved">Reserved</span>
        </div>

        <div v-if="productContent" class="product-description prose my-10">
          <ContentRenderer :value="productContent" />
        </div>

        <div class="price-block">
          <span class="price">{{ formatPrice(product.price, product.currency) }}</span>
          <span class="total">incl. protection: {{ formatPrice(product.totalPrice, product.currency) }}</span>
        </div>

        <div class="stats">
          <span>{{ product.favouriteCount }} likes</span>
        </div>

        <a :href="product.url" target="_blank" rel="noopener noreferrer" class="buy-link">
          Vinted
          <IconArrow class="inline text-lg" />
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  @apply relative sm:grid sm:grid-cols-12 gap-5 min-w-0 w-full;
  @apply max-w-screen-xl mx-auto flex-1;

  .photos {
    @apply sm:col-span-8 px-3 -mx-3 sm:px-0 sm:mx-0;

    // Mobile: horizontal scroll with snap
    @apply flex flex-row overflow-x-auto snap-x snap-mandatory gap-2;
    @apply sm:flex-col sm:overflow-x-visible;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .slide {
      @apply flex-shrink-0 w-[85vw] sm:w-auto;
      scroll-snap-align: center;

      img {
        @apply rounded-md w-full;
      }
    }
  }

  .info {
    @apply sm:col-span-4;
    @apply px-3 pt-4 sm:px-0 sm:pt-0;

    .info-inner {
      @apply sm:sticky sm:top-8;
    }
  }
}

.back {
  @apply inline-flex items-center gap-1 text-primary-dimmed hover:text-primary font-inconsolata text-sm mb-4 transition-colors;
}

h1 {
  @apply font-ppmondwest text-primary text-lg sm:text-2xl mix-blend-hard-light sm:mb-3;
}

.tags {
  @apply flex flex-wrap items-center gap-2 mb-4;

  span {
    @apply inline-block px-2 py-0.5 rounded-full text-xs font-inconsolata bg-primary/10 text-primary;

    &.reserved {
      @apply bg-yellow-100 text-yellow-800;
    }
  }
}

.price-block {
  @apply sm:mb-4;

  .price {
    @apply font-inconsolata text-primary text-xl sm:text-2xl font-bold;
  }

  .total {
    @apply block font-inconsolata text-primary/50 text-xs;
  }
}

.stats {
  @apply flex items-center gap-3 mb-4 text-xs text-primary/50 font-inconsolata;
}

.buy-link {
  @apply inline-flex items-center gap-1 text-primary-dimmed hover:text-primary font-inconsolata text-sm transition-colors underline underline-offset-2;
}
</style>
