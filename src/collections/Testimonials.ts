import type { CollectionConfig } from 'payload'
import { createPortfolioHooks, portfolioTags } from '@/lib/portfolio-cache'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    group: 'Portfolio',
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'displayOrder', '_status'],
  },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
  },
  hooks: createPortfolioHooks(portfolioTags.testimonials),
  versions: { drafts: true },
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', required: true },
    { name: 'displayOrder', type: 'number', required: true, defaultValue: 0, index: true },
  ],
}
