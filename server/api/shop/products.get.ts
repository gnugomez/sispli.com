import type { VintedItem } from '../../utils/vinted-api/client'
import { getWardrobeItems } from '../../utils/vinted-api/client'

export interface Product {
  id: number
  title: string
  price: string
  currency: string
  brand: string
  size: string
  status: string
  url: string
  photos: VintedItem['photos']
  favouriteCount: number
  totalPrice: string
  serviceFee: string
  isReserved: boolean
  isClosed: boolean
}

function mapItem(item: VintedItem): Product {
  return {
    id: item.id,
    title: item.title,
    price: item.price.amount,
    currency: item.price.currency_code,
    brand: item.brand,
    size: item.size,
    status: item.status,
    url: item.url,
    photos: item.photos,
    favouriteCount: item.favourite_count,
    totalPrice: item.total_item_price.amount,
    serviceFee: item.service_fee.amount,
    isReserved: item.is_reserved,
    isClosed: item.is_closed,
  }
}

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const userId = config.vintedUserId

  if (!userId) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Vinted user ID not configured',
    })
  }

  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Math.min(Number(query.limit) || 20, 100)

  const response = await getWardrobeItems(userId, {
    page,
    perPage: limit,
    order: 'relevance',
  })

  const products = response.items
    .filter(item =>
      !item.is_draft
      && !item.is_closed
      && !item.is_reserved
      && !item.is_hidden
      && item.transaction_permitted,
    )
    .map(mapItem)

  return {
    products,
    pagination: {
      currentPage: response.pagination.current_page,
      totalPages: response.pagination.total_pages,
      totalItems: response.pagination.total_entries,
      perPage: response.pagination.per_page,
    },
  }
})
