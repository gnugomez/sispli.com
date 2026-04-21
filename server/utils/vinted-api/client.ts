/**
 * Public Vinted API client
 * Uses the public wardrobe endpoint to fetch user items
 */
import { vintedFetch } from './fetcher'

export interface VintedThumbnail {
  type: string
  url: string
  width: number
  height: number
  original_size: boolean | null
}

export interface VintedPhoto {
  id: number
  width: number
  height: number
  url: string
  dominant_color: string
  dominant_color_opaque: string
  thumbnails: VintedThumbnail[]
  is_main?: boolean
  full_size_url: string
}

export interface VintedPrice {
  amount: string
  currency_code: string
}

export interface VintedItem {
  id: number
  title: string
  price: VintedPrice
  currency: string
  brand: string
  size: string
  status: string
  url: string
  photo?: VintedPhoto
  photos: VintedPhoto[]
  favourite_count: number
  is_draft: boolean
  is_closed: boolean
  is_reserved: boolean
  is_hidden: boolean
  transaction_permitted: boolean
  service_fee: VintedPrice
  total_item_price: VintedPrice
}

export interface VintedWardrobeResponse {
  items: VintedItem[]
  pagination: {
    current_page: number
    total_pages: number
    total_entries: number
    per_page: number
  }
}

/**
 * Get items from a user's wardrobe
 */
export async function getWardrobeItems(
  userId: string,
  options: {
    page?: number
    perPage?: number
    order?: 'relevance' | 'newest_first' | 'price_low_to_high' | 'price_high_to_low'
  } = {},
): Promise<VintedWardrobeResponse> {
  const { page = 1, perPage = 20, order = 'relevance' } = options

  const params = new URLSearchParams({
    page: page.toString(),
    per_page: perPage.toString(),
    order,
  })

  return vintedFetch<VintedWardrobeResponse>(
    `/api/v2/wardrobe/${userId}/items?${params.toString()}`,
  )
}
