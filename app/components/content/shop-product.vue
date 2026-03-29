<script setup lang="ts">
const props = defineProps<{
  id: number
}>()

const { data } = await useAsyncData(
  'shop-products',
  () => $fetch('/api/shop/products'),
)

function getProductImage(product: NonNullable<typeof data.value>['products'][number]): string {
  const photo = product.photos[0]
  if (!photo)
    return ''
  const thumb = photo.thumbnails.find(t => t.type === 'thumb310x430')
  return thumb?.url || photo.url
}

const product = computed(() =>
  data.value?.products.find(p => p.id === props.id) ?? null,
)
</script>

<template>
  <ShopProductCard
    v-if="product"
    :id="product.id"
    :title="product.title"
    :price="product.price"
    :currency="product.currency"
    :size="product.size"
    :image-url="getProductImage(product)"
  />
</template>
