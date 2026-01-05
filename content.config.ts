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
        slides: z.array(z.object({
          image: z.object({
            src: z.string().editor({ input: 'media' }),
            alt: z.string(),
          }),
          height: z.number().optional(),
          width: z.number().optional(),
        })),
      }),
    }),
    pages: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        exclude: ['projects/**/*.md', 'posts/**/*.md'],
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
