import type { CollectionConfig } from 'payload'
import { createPortfolioHooks, portfolioTags } from '@/lib/portfolio-cache'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    group: 'Portfolio',
    useAsTitle: 'name',
    defaultColumns: ['name', 'displayOrder', '_status'],
  },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
  },
  hooks: createPortfolioHooks(portfolioTags.clients),
  versions: { drafts: true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    { name: 'websiteURL', type: 'text' },
    { name: 'displayOrder', type: 'number', required: true, defaultValue: 0, index: true },
  ],
}
