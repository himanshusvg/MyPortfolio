import type { CollectionConfig } from 'payload'

import { createFolderField, createTagField } from 'payload'
import { createMediaPortfolioHooks } from '@/lib/portfolio-cache'

export const Media: CollectionConfig = {
  slug: 'media',
  hooks: createMediaPortfolioHooks(),
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    createFolderField({ relationTo: 'folders' }),
    createTagField({ relationTo: 'tags' }),
  ],
  upload: true,
}
