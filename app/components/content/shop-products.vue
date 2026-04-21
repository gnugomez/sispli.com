<script setup lang="ts">
import type { Product } from '~~/server/api/shop/products.get'

const { paginable, perPage = 20 } = defineProps<{
  paginable?: boolean
  perPage?: number
}>()

const page = ref(1)

const key = computed(() => `shop-products-page-${page.value}`)

const { data, pending } = await useAsyncData(
  key,
  () => $fetch('/api/shop/products', {
    params: {
      page: page.value,
      limit: perPage,
    },
  }),
  {
    watch: [page],
  },
)

const isLastPage = computed(() => {
  if (!data.value)
    return false
  const total = data.value.pagination.totalPages
  return data.value.pagination.currentPage >= total
})

const products = computed<Product[]>(prev => [...(prev || []), ...(data.value?.products || [])])

function getProductImage(product: NonNullable<typeof data.value>['products'][number]): string {
  const photo = product.photos[0]
  if (!photo)
    return ''
  const thumb = photo.thumbnails.find(t => t.type === 'thumb310x430')
  return thumb?.url || photo.url
}
</script>

<template>
  <div class="shop-products">
    <template v-if="products.length">
      <ShopProductCard
        v-for="product in products" :id="product.id" :key="product.id" :title="product.title"
        :price="product.price" :currency="product.currency" :size="product.size"
        :image-url="getProductImage(product)"
      />
    </template>
  </div>
  <div class="mt-6 mb-6 w-full text-center">
    <div v-if="pending" class="text-center text-primary">
      Loading products...
    </div>
    <a v-if="paginable && !pending && !isLastPage" href="#" class="cursor-default" @click.prevent="page++">
      Load more
    </a>
  </div>
</template>

<style lang="scss" scoped>
.shop-products {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3;
}
</style>
