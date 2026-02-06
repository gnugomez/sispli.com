import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
      schema: z.object({
        categories: z.array(z.string()),
        createdAt: z.date(),
        cover: z.string().editor({ input: 'media' }),
        size: z.enum(['small', 'default', 'full']).default('full'),
        weight: z.number().default(0),
      }),
    }),
    pages: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        exclude: ['projects/**/*.md', 'posts/**/*.md'],
        prefix: '/',
      },
      schema: z.object({
        size: z.enum(['small', 'default', 'full']).default('default'),
      }),
    }),
    posts: defineCollection({
      type: 'data',
      source: 'posts/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        draft: z.boolean().default(false),
        createdAt: z.date(),
      }),
    }),
  },
})
