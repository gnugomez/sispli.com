import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
      schema: z.object({
        categories: z.array(z.string()),
        createdAt: z.date(),
        slides: z.array(z.object({
          image: z.object({
            src: z.string().editor({ input: "media" }),
            alt: z.string()
          }),
          height: z.number().optional(),
          width: z.number().optional(),
        }))
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: '**/*.md',
    })
  }
})