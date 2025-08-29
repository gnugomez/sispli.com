import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/**/*.md',
      schema: z.object({
        slides: z.array(z.object({
          image: z.object({
            src: z.string(),
            alt: z.string()
          }),
          height: z.number(),
          width: z.number(),
        }))
      })
    })
  }
})